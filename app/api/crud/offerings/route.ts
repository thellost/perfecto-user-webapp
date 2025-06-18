import {NextRequest, NextResponse} from "next/server";
import {v4 as uuidv4} from 'uuid';
import {
    addOffering,
    getUserDataByEmail,
    getOfferingsByUserEmail,
    getOfferingsByPropertyIds,
    getPropertiesByEmail,
    updateOfferingById,
    getOfferingById
} from "../db"; // Adjust the import path as necessary
import {getToken} from "next-auth/jwt";

// Update the helper function to include headers
async function createNotification(data: {
  email: string;
  title: string;
  message: string;
  type: string;
  related_id?: string;
  triggered_by?: string;
}, headers: Headers) {
  const forwardedCookies = headers.get('cookie');
  
  await fetch(new URL('/api/crud/notifications', process.env.NEXTAUTH_URL as string).href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: forwardedCookies || '',
    },
    body: JSON.stringify(data),
  });
}

export async function POST(req : NextRequest) {
    try {
        // Verify user authentication
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
        if (!token) {
            return NextResponse.json({
                error: 'Unauthorized'
            }, {status: 401});
        }

        // Get request body
        const data = await req.json();
        // Check for missing property ID
        if (!data.propertyId) {
            return NextResponse.json({
                error: 'Property ID is required'
            }, {status: 400});
        }

        // Check if token has sub and email
        if (!token.email) {
            return NextResponse.json({
                error: 'Invalid token: missing user information'
            }, {status: 400});
        }
        // Get user role and verify permissions
        const userData = await getUserDataByEmail(token.email);
        if (!userData || (userData.userRole !== 'agent' && userData.userRole !== 'admin')) {
            data.user_email = token.email; // Set user_email from token if not provided
        }

        // Create offering item with required fields
        const offeringItem = {
            offering_id: uuidv4(), // Generate unique offering ID
            user_email: data.user_email || token.email, // Use provided user_email or token email
            property_id: data.propertyId,
            status: 'pending',
            updatedAt: new Date().toISOString(),
            offerPrice: data.offerPrice,
            downPayment: data.downPayment,
            loanTerm: data.loanTerm,
            monthlyPayment: data.monthlyPayment,
            preApproved: data.preApproved,
            message: data.message || '',
            interestRate: 6.5, // Store the latest interest rate
            type: data.type || 'offer' // Default to 'offer' if not provided
        };

        await addOffering(offeringItem);

        // Create notification for new offer
        if (data.type === 'counteroffer') {
            await createNotification({
                email: data.user_email,
                title: 'New Counter Offer Received',
                message: `${token.email} has sent you a counter offer of $${data.offerPrice.toLocaleString()} for property ${data.propertyId}`,
                type: 'counteroffer',
                related_id: offeringItem.offering_id,
                triggered_by: token.email
            }, req.headers);
        } else {
            // Notify property owner about new offer
            await createNotification({
                email: userData.email, // property owner's email
                title: 'New Offer Received',
                message: `${token.email} has sent you an offer of $${data.offerPrice.toLocaleString()} for property ${data.propertyId}`,
                type: 'offer',
                related_id: offeringItem.offering_id,
                triggered_by: token.email
            }, req.headers);
        }

        return NextResponse.json({
            message: 'Offering created successfully',
            offeringId: offeringItem.property_id
        }, {status: 201});

    } catch (error) {
        console.error('Error creating offering:', error);
        return NextResponse.json({
            error: 'Failed to create offering',
            details: error instanceof Error
                ? error.message
                : 'Unknown error'
        }, {status: 500});
    }
}
export async function GET(req : NextRequest) {
    try {
        // Verify user authentication
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
        if (!token) {
            return NextResponse.json({
                error: 'Unauthorized'
            }, {status: 401});
        }

        // Check if token has email
        if (!token.email) {
            return NextResponse.json({
                error: 'Invalid token: missing user information'
            }, {status: 400});
        }

        const userData = await getUserDataByEmail(token.email);
        let offerings : any[] = [];
        if (userData.userRole !== 'agent' && userData.userRole !== 'admin') {

            offerings = (await getOfferingsByUserEmail(token.email)) || [];
        } else {
         
            const propertyIds = await getPropertiesByEmail(token.email);
            if (!propertyIds || propertyIds.length === 0 || propertyIds === undefined) {
                return NextResponse.json({
                    message: 'No properties found for the user',
                    offerings: []
                }, {status: 200});
            }
            // Extract property IDs from the propertyIds array
            const propertyIdList = propertyIds.map(property => property.id);
            // Fetch offerings based on user email
            offerings = await getOfferingsByPropertyIds(propertyIdList);
        }
        return NextResponse.json({
            message: 'Offerings retrieved successfully',
            offerings
        }, {status: 200});

    } catch (error) {
        console.error('Error retrieving offerings:', error);
        return NextResponse.json({
            error: 'Failed to retrieve offerings',
            details: error instanceof Error
                ? error.message
                : 'Unknown error'
        }, {status: 500});
    }
}
export async function DELETE(req : NextRequest) {
    try {
        // Verify user authentication
        const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
        if (!token) {
            return NextResponse.json({
                error: 'Unauthorized'
            }, {status: 401});
        }

        // Get the offering ID from the URL parameters
        const {searchParams} = new URL(req.url);
        const offeringId = searchParams.get('offeringId');
        const propertyId = searchParams.get('propertyId');
        // Check if token has email
        if (!token.email) {
            return NextResponse.json({
                error: 'Invalid token: missing user information'
            }, {status: 400});
        }
        if (!offeringId && !propertyId) {
            return NextResponse.json({
                error: 'Offering ID or Property ID is required'
            }, {status: 400});
        }
        if (!offeringId || !propertyId) {
            return NextResponse.json({
                error: 'Offering ID and Property ID must not be null'
            }, {status: 400});
        }
        
        const offerings = await getOfferingById(offeringId, propertyId);
        // Get user role and verify permissions
        const userData = await getUserDataByEmail(token.email);
        
        if (!offerings) {
            return NextResponse.json({
                error: 'Offering not found'
            }, { status: 404 });
        }
        if (offerings.user_email === token.email && userData.userRole === 'buyer' && offerings.type === 'counteroffer') {
        } 
        else if ((!userData || (userData.userRole === 'agent' && userData.userRole === 'admin'))) {
            return NextResponse.json({
                error: 'Unauthorized: Only agents and admins can accept offerings'
            }, { status: 403 });
        }
        if (!offerings) {
            return NextResponse.json({
                error: 'Offering not found'
            }, { status: 404 });
        }

        // Update the offering status to rejected
        const updatedOffering = await updateOfferingById(offeringId, propertyId, {
            status: 'rejected',
            updatedAt: new Date().toISOString()
        });

        // Create notification for rejected offer
        await createNotification({
            email: offerings.user_email,
            title: offerings.type === 'counteroffer' ? 'Counter Offer Declined' : 'Offer Declined',
            message: `${token.email} has declined your ${offerings.type === 'counteroffer' ? 'counter offer' : 'offer'} of $${offerings.offerPrice.toLocaleString()} for property ${propertyId}`,
            type: 'error',
            related_id: offeringId,
            triggered_by: token.email
        }, req.headers);

        return NextResponse.json({
            message: 'Offering rejected successfully',
            offering: updatedOffering
        }, {status: 200});

    } catch (error) {
        console.error('Error rejecting offering:', error);
        return NextResponse.json({
            error: 'Failed to reject offering',
            details: error instanceof Error
                ? error.message
                : 'Unknown error'
        }, {status: 500});
    }
}
// Add this PUT function after the existing functions
export async function PUT(req: NextRequest) {
    try {
        // Verify user authentication
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if token has email
        if (!token.email) {
            return NextResponse.json({
                error: 'Invalid token: missing user information'
            }, { status: 400 });
        }
        //get offering data from dynamoDB
        

        // Get request body
        const data = await req.json();
        const { offering_id, property_id } = data;
        
        if (!offering_id || !property_id) {
            return NextResponse.json({
                error: 'Offering ID and Property ID are required'
            }, { status: 400 });
        }
        const offerings = await getOfferingById(offering_id, property_id);
        // Get user role and verify permissions
        const userData = await getUserDataByEmail(token.email);

        if (!offerings) {
            return NextResponse.json({
                error: 'Offering not found'
            }, { status: 404 });
        }

        if (offerings.user_email === token.email && userData.userRole === 'buyer' && offerings.type === 'counteroffer') {
        } 
        else if ((!userData || (userData.userRole === 'agent' && userData.userRole === 'admin'))) {
            return NextResponse.json({
                error: 'Unauthorized: Only agents and admins can accept offerings'
            }, { status: 403 });
        }


        // Update the offering status to approved
        const updatedOffering = await updateOfferingById(offering_id, property_id, {
            status: 'approved',
            updatedAt: new Date().toISOString()
        });

        // Create notification for accepted offer
        await createNotification({
            email: offerings.user_email,
            title: offerings.type === 'counteroffer' ? 'Counter Offer Accepted' : 'Offer Accepted',
            message: `${token.email} has accepted your ${offerings.type === 'counteroffer' ? 'counter offer' : 'offer'} of $${offerings.offerPrice.toLocaleString()} for property ${property_id}`,
            type: 'success',
            related_id: offering_id,
            triggered_by: token.email
        }, req.headers);

        return NextResponse.json({
            message: 'Offering accepted successfully',
            offering: updatedOffering
        }, { status: 200 });

    } catch (error) {
        console.error('Error accepting offering:', error);
        return NextResponse.json({
            error: 'Failed to accept offering',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}


