import { User } from "@/app/types/DefaultType"
import {DynamoDB, DynamoDBClientConfig} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocument, GetCommand, ScanCommand, PutCommand, QueryCommand, QueryCommandOutput, UpdateCommand} from "@aws-sdk/lib-dynamodb"
import bcrypt from "bcrypt"

const adaptor_config : DynamoDBClientConfig = {
    credentials: {
        accessKeyId: (process.env.NEXT_PUBLIC_AUTH_DYNAMODB_ID as string),
        secretAccessKey: (process.env.NEXT_PUBLIC_AUTH_DYNAMODB_SECRET as string)
    },
    region: process.env.NEXT_PUBLIC_AUTH_DYNAMODB_REGION
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
    const userRole = user.userRole ?? ""
    const referral_code = user?.referral_code ?? ""
    const referred_by = referral ?? ""

    const user_check = await client.send(new QueryCommand({
        TableName: "users",
        KeyConditionExpression:
          "email = :inputEmail",
        ExpressionAttributeValues: {
          ":inputEmail": email
        },
      }));
    console.log("after get")
    if (user_check.Items?.[0] != undefined ) {
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
            userRole: userRole,
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


export async function validate_user(email? : string, role?: string) {

    console.log(role)
    if (email == undefined ){
        return Error("Wrong Credentials")
    }
    try {
        console.log("verification...")
        let response: QueryCommandOutput;
        if (role == undefined){
            response = await client.send(new QueryCommand({
                TableName: "users",
                KeyConditionExpression:
                  "email = :inputEmail",
                ExpressionAttributeValues: {
                  ":inputEmail": email
                },
              }));
        }
        else {
            response = await client.send(new QueryCommand({
            TableName: "users",
            KeyConditionExpression:
              "email = :inputEmail and userRole = :inputRole",
            ExpressionAttributeValues: {
              ":inputEmail": email,
              ":inputRole": role
            },
          }));
        }
          
          console.log(response)
        
        const item = response.Items?.[0]
        if (item === undefined || item === null) {
            throw new Error("Wrong Credentials")
        } else {
                return item
        }
    } catch (err : any) {

        console.log(err)
        return err
    }

}

export async function getProperties(){
    const command = new ScanCommand({
        TableName: "properties"
      });
    
      const response = await client.send(command);
      return response.Items
}

export async function getPropertiesById(id: string) {
    const command = new GetCommand({
        TableName: "properties",
        Key: {
          id: id,
        },
      });
    
      const response = await client.send(command);
      return response.Item
}