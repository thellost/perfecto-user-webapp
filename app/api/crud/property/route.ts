import {serializeError} from 'serialize-error';
import {deletePropertyById, getProperties, getPropertiesByEmail, getPropertiesById, validate_user} from "../db"
import {NextRequest, NextResponse} from "next/server"
import {AttributeValue} from '@aws-sdk/client-dynamodb';
import { getToken } from "next-auth/jwt";
export async function GET(req : NextRequest) {

    try {

        let data : any | undefined;
        const id = req
            .nextUrl
            .searchParams
            .get("id")
                
        const email = req.nextUrl.searchParams.get("email") 
        if (id != null || id != undefined) {
            data = await getPropertiesById(id)
        } 
        else if (email != null || email != undefined) {
            // Validate user email
            const token = await getToken({ req });
            if (!token || token.email !== email) {
                throw new Error("Unauthorized access");
            }
            data = await getPropertiesByEmail(email)
        }
        else {

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

export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            throw new Error("Property ID is required");
        }


        await deletePropertyById(id); // Implement this function to delete the property from DynamoDB
        return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
    } catch (err) {
        console.log((err as Error).message);
        return Response.json(serializeError(err), { status: 400 });
    }
}