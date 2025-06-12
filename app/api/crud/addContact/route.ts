import { NextRequest, NextResponse } from "next/server";
import { client } from "../db";
import {addContactFormEntry} from "../db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Create contact form item
    const contactItem = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...data,
    };

    // Validate required fields
    if (!contactItem.phone) {
        return NextResponse.json({
            error: 'Phone field is required'
        }, { status: 400 });
    }

    // Save to DynamoDB
    

   addContactFormEntry(contactItem)

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      id: contactItem.id
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding contact:', error);
    return NextResponse.json({ 
      error: 'Failed to submit contact form',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}