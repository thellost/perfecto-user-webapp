import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { addNotification, getNotificationsByEmail } from "../db";

export async function GET(req: NextRequest) {
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

        // Fetch notifications for the authenticated user
        const notifications = await getNotificationsByEmail(token.email);

        return NextResponse.json({
            message: 'Notifications retrieved successfully',
            notifications
        }, { status: 200 });

    } catch (error) {
        console.error('Error retrieving notifications:', error);
        return NextResponse.json({
            error: 'Failed to retrieve notifications',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
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

        // Get request body
        const data = await req.json();

        // Create notification item
        const notificationItem = {
            email: token.email,
            title: data.title,
            message: data.message,
            type: data.type || 'info', // default to 'info' if not provided
            isRead: false,
            ...data // spread any additional fields from the request
        };

        // Add notification to database
        await addNotification(notificationItem);

        return NextResponse.json({
            message: 'Notification created successfully',
            notification: notificationItem
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json({
            error: 'Failed to create notification',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}