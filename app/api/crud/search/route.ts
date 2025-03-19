import {serializeError} from 'serialize-error';
import {client, getProperties, getPropertiesById, validate_user} from "../db"
import {NextRequest, NextResponse} from "next/server"
import {AttributeValue} from '@aws-sdk/client-dynamodb';
export async function GET(req : NextRequest) {
    try {

        const address = req
            .nextUrl
            .searchParams
            .get("address")
        return NextResponse.json([{"status":"ok"}], {status: 200})
    } catch (err) {
        console.log((err as Error).message)
        return Response.json(serializeError(err), {status: 400})
    }
}
