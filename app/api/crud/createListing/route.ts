import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { addProperty , logErrorToDatabase} from "../db";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    // Get and verify token using NextAuth
    const token = await getToken({ req});
    console.log("Token:", token); // Debugging line to check the token
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const listingData = await req.json();

    // Create listing item
    const listingItem = {
      
      id: uuidv4(),
      userId: token.sub, // NextAuth uses 'sub' for user ID
      userEmail: token.email, // Add user email from token
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