import {DynamoDB, DynamoDBClientConfig} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocument, GetCommand, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb"
export type User = {
    name?: string,
    phone?: string,
    email: string,
    roles: string,
    hashed_password: string,
    full_address?: string,
    referral?: string
}

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

export async function validate_user(email? : string, roles?: string) {

    if (email == undefined || roles == undefined){
        return Error("Wrong Credentials")
    }
    try {
        const response = await client.send(new GetCommand({
            TableName: 'users',
            Key: {
                email: email.toLowerCase(),
                roles: roles.toLowerCase()
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
