import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { addProperty , logErrorToDatabase, logToDatabase} from "../db";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    /*
    // Get and verify token using NextAuth
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log("Token:", token);
    console.log("Should remove only for testing :" , process.env.NEXTAUTH_SECRET ) // Debugging line to check the token
    if (!token) {
      logToDatabase({ message: "Unauthorized access attempt Token " + token, token: null }); // Log unauthorized access
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
      */
    // Extract userId from query parameters
    
    // Get request body
    const listingData = await req.json();

    const { searchParams } = new URL(req.url);
    const userEmail = listingData.userEmail || searchParams.get("userEmail") || null; // Get user email from request body or query parameters
    if (!userEmail) {
      return NextResponse.json({ error: 'User Email is required' }, { status: 400 });
    }

    // Create listing item
    const listingItem = {
      
      id: uuidv4(),
      userEmail: userEmail, // NextAuth uses 'sub' for user ID
      //userEmail: token.email, // Add user email from token
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...listingData
    };

    // Save to DynamoDB
    await addProperty(listingItem);
    
    return NextResponse.json({
      message: 'Listing created successfully',
      listingId: listingItem.id
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating listing:', error);
    logErrorToDatabase(error as Error, "Create Listing"); // Log error to database for debugging
    return NextResponse.json({ 
      error: 'Failed to create listing',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}