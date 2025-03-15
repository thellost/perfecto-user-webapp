import { User } from "@/app/types/DefaultType"
import {DynamoDB, DynamoDBClientConfig} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocument, GetCommand, GetCommandOutput, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb"
import bcrypt from "bcrypt"

const adaptor_config : DynamoDBClientConfig = {
    credentials: {
        accessKeyId: (process.env.AUTH_DYNAMODB_ID as string),
        secretAccessKey: (process.env.AUTH_DYNAMODB_SECRET as string)
    },
    region: process.env.AUTH_DYNAMODB_REGION
}
export const client = DynamoDBDocument.from(new DynamoDB(adaptor_config), {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true
    }
})

export async function createNewUser(user : User, referral?: string) {
    
    try {
    const name = user?.name ?? "";
    const email = user.email.toLowerCase();
    const phone_number = user
        ?.phone_number ?? ""
    const hashed_password = await bcrypt.hash(user.hashed_password,12) ?? ""
    const full_address = user
        ?.full_address ?? ""
    const roles = user
        ?.roles ?? "buyer"
    const referral_code = user?.referral_code ?? ""
    const referred_by = referral ?? ""

    const user_check = await client.send(new GetCommand({
        TableName: 'users',
        Key: {
            email: email
        }
    }));
    if (user_check.Item ) {
        throw Error("User Already Exist")
    }
    const command = new PutCommand({
        TableName: "users",
        Item: {
            name:  name,
            email: email,
            phone_number: phone_number,
            hashed_password: hashed_password,
            full_address: full_address,
            roles: roles,
            referral_code:  referral_code,
            referred_by: referred_by,// no books for new user, an empty object
        },
        // ReturnValues: 'ALL_OLD',
    })
        const response = await client.send(command);
        return response
    } catch (error) {
        throw error
    }
}


export async function validate_user(email? : string) {

    if (email == undefined){
        return Error("Wrong Credentials")
    }
    try {
        const response = await client.send(new GetCommand({
                TableName: 'users',
                Key: {
                    email: email.toLowerCase()
                }
            }));
        
        
        const item = response.Item
        if (item === undefined) {
            throw new Error("Wrong Credentials")
        } else {
                return item
        }
    } catch (err : any) {
        return err
    }

}
