import {serializeError} from 'serialize-error';
import {client, getProperties, getPropertiesById, validate_user} from "../db"
import {NextRequest, NextResponse} from "next/server"
import {AttributeValue} from '@aws-sdk/client-dynamodb';
export async function GET(req : NextRequest) {

    try {

        let data : any | undefined;
        const id = req
            .nextUrl
            .searchParams
            .get("id")
        if (id != null || id != undefined) {
            data = await getPropertiesById(id)
        } else {

            data = await getProperties();
        }
        if (data === undefined) {
            throw new Error("no data")
        }
        return NextResponse.json(await data, {status: 200})
    } catch (err) {
        console.log((err as Error).message)
        return Response.json(serializeError(err), {status: 400})
    }
}
