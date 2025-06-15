import { User } from "@/app/types/DefaultType"
import {DynamoDB, DynamoDBClientConfig} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocument, GetCommand, ScanCommand, PutCommand, QueryCommand, QueryCommandOutput, UpdateCommand, DeleteCommand} from "@aws-sdk/lib-dynamodb"
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
    if (user_check.Items?.[0] != undefined ) {
        throw Error("User Already Exist")
    }
    // Add user to the users table
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
            referred_by: referred_by,
        }
    })
        const response = await client.send(command);
    // Add data to the referral table
    if (referred_by  && referred_by  !== "") {
        console.log("Adding referral data...")
      const referralCommand = new PutCommand({
          TableName: "referral",
          Item: {
              referred_by: referred_by,
              email: email,
              created_at: new Date().toISOString(),
          },
      });
      await client.send(referralCommand);
  }
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

export async function fetchReferredPersonsFromDatabase(referralCode: string) {
  try {
      const command = new QueryCommand({
          TableName: "referral",
          KeyConditionExpression: "referred_by = :referralCode",
          ExpressionAttributeValues: {
              ":referralCode": referralCode
          }
      });

      const response = await client.send(command);
      if (response.Items?.length === 0) {
          return null;
      }
      return response.Items;
  } catch (error) {
      console.error("Error fetching referral by code:", error);
      throw error;
  }
}


export async function addProperty(property: Record<string, any>) {
    try {
        const command = new PutCommand({
            TableName: "properties",
            Item: {
                ...property,
            },
        });

        const response = await client.send(command);
        return response;
    } catch (error) {
        console.error("Error adding property:", error);
        throw error;
    }
}

export async function logErrorToDatabase(error: Error, apiName: string) {
    
    try {
        const command = new PutCommand({
            TableName: "logs",
            Item: {
                logId: crypto.randomUUID(),
                type: "error",
                apiName: apiName,
                source: process.env.NEXT_PUBLIC_REACT_APP_API_URL ? process.env.NEXT_PUBLIC_REACT_APP_API_URL : "Unknown",
                message: error.message ? error.message : "Unknown error",
                stack: error.stack ? error.stack : "No stack trace available",
                error: error.toString(),
                created_at: new Date().toISOString(),
            },
        });

        await client.send(command);
        console.log("Error logged to database successfully.");
    } catch (logError) {
        console.error("Failed to log error to database:", logError);
        
    }
    
}

export async function logToDatabase(data: Record<string, any> | string) {
    try {
        const logItem = typeof data === "string" 
            ? { logId: crypto.randomUUID(), type: "normal", message: data, created_at: new Date().toISOString() }
            : { ...data, logId: crypto.randomUUID(), type: "normal", created_at: new Date().toISOString() };

        const command = new PutCommand({
            TableName: "logs",
            Item: logItem,
        });

        await client.send(command);
        console.log("Data logged to database successfully.");
    } catch (error) {
        console.error("Failed to log data to database:", error);
        throw error;
    }
}

export async function deletePropertyById(id: string) {
    try {
        const command = new DeleteCommand({
            TableName: "properties",
            Key: {
                id: id,
            },
        });

        const response = await client.send(command);
        console.log("Property deleted successfully.");
        return response;
    } catch (error) {
        console.error("Error deleting property:", error);
        throw error;
    }
}


export async function getPropertiesByEmail(email: string) {
    try {
        const command = new QueryCommand({
            TableName: "properties",
            IndexName: "userEmail-index", // Updated with the correct secondary index name
            KeyConditionExpression: "userEmail = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        });

        const response = await client.send(command);
        return response.Items;
    } catch (error) {
        console.error("Error fetching properties by email:", error);
        throw error;
    }
}

export async function addContactFormEntry(data: { phone: string; [key: string]: any }) {
    try {
        const command = new PutCommand({
            TableName: "contact_form",
            Item: {
                ...data,
                created_at: new Date().toISOString(),
            },
        });

        const response = await client.send(command);
        console.log("Contact form entry added successfully.");
        return response;
    } catch (error) {
        console.error("Error adding contact form entry:", error);
        throw error;
    }
}

export async function addOffering(data: { offering_id: string; user_email: string; property_id: string; [key: string]: any }) {
    try {
        const command = new PutCommand({
            TableName: "offerings",
            Item: {
                ...data,
                created_at: new Date().toISOString(),
            },
        });

        const response = await client.send(command);
        console.log("Offering data added successfully.");
        return response;
    } catch (error) {
        console.error("Error adding offering data:", error);
        throw error;
    }
}


export async function getUserDataByEmail(email: string) {
    try {
        const command = new QueryCommand({
            TableName: "users",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email.toLowerCase(),
            },
        });
        const response = await client.send(command);
        if (!response.Items || response.Items.length === 0) {
            console.error("No user found with the provided email:", email);
            throw new Error("User not found");
        }
        const user = response.Items[0];
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error fetching user ID by email:", error);
        throw error;
    }
}


export async function getOfferingsByPropertyIds(propertyIds: string[]) {
    try {
        const offerings = [];
        for (const propertyId of propertyIds) {
            const command = new QueryCommand({
                TableName: "offerings",
                IndexName: "property_id-index", // Ensure the correct secondary index is used
                KeyConditionExpression: "property_id = :propertyId",
                ExpressionAttributeValues: {
                    ":propertyId": propertyId,
                },
            });

            const response = await client.send(command);
            if (response.Items) {
                offerings.push(...response.Items);
            }
        }
        return offerings;
    } catch (error) {
        console.error("Error fetching offerings by property IDs:", error);
        throw error;
    }
}

export async function updateOfferingById(offering_id: string, property_id: string, updateData: Record<string, any>) {
    try {
        const updateExpressions: string[] = [];
        const expressionAttributeNames: Record<string, string> = {};
        const expressionAttributeValues: Record<string, any> = {};

        for (const key in updateData) {
            updateExpressions.push(`#${key} = :${key}`);
            expressionAttributeNames[`#${key}`] = key;
            expressionAttributeValues[`:${key}`] = updateData[key];
        }
        const command = new UpdateCommand({
            TableName: "offerings",
            Key: { 
            offering_id, 
            property_id
            },
            UpdateExpression: `SET ${updateExpressions.join(", ")}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        });

        const response = await client.send(command);
        return response.Attributes;
    } catch (error) {
        console.error("Error updating offering:", error);
        throw error;
    }
}

export async function getOfferingsByUserEmail(user_email: string) {
    try {
        const command = new QueryCommand({
            TableName: "offerings",
            IndexName: "user_email-index", // Ensure this GSI exists in your DynamoDB table
            KeyConditionExpression: "user_email = :user_email",
            ExpressionAttributeValues: {
                ":user_email": user_email,
            },
        });

        const response = await client.send(command);
        return response.Items;
    } catch (error) {
        console.error("Error fetching offerings by user_email:", error);
        throw error;
    }
}