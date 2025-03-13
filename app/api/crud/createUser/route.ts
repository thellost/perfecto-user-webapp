import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import { User, client} from "../db"
import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
export async function createNewUser(user : User) {
    
    try {
    const name = user?.name ?? "";
    const email = user.email.toLowerCase();
    const phone = user
        ?.phone ?? ""
    const hashed_password = await bcrypt.hash(user.hashed_password,12) 
    const full_address = user
        ?.full_address ?? ""
    const roles = user
        ?.roles ?? "buyer"
    const referral = user?.referral ?? ""

    const user_check = await client.send(new GetCommand({
        TableName: 'users',
        Key: {
            email: email,
            roles: roles
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
            phone: phone,
            hashed_password: hashed_password,
            full_address: full_address,
            roles: roles,
            referral: referral // no books for new user, an empty object
        },
        // ReturnValues: 'ALL_OLD',
    })
        const response = await client.send(command);
        return response
    } catch (error) {
        throw error
    }
}

export async function POST(
    req: Request,
    
  ) {
    try {
    const raw_json = await req.formData()
    const first_name = raw_json.get("firstName")?.toString() ?? ""
    const Last_name = raw_json.get("lastName")?.toString() ?? ""
    const user_data = {
        name: (first_name + " " + Last_name),
        phone: raw_json.get("phone")?.toString() ?? "",
        email: raw_json.get("email")?.toString() ?? "",
        roles: raw_json.get("role")?.toString() ?? "",
        hashed_password: raw_json.get("password")?.toString() ?? "",
        referral: raw_json.get("referral")?.toString() ?? ""
    
  }
      const user = await createNewUser(user_data)
      return  new Response ("Done", {
        status: 200
      })
    } catch (err) {
        console.log((err as Error).message)
      return NextResponse.json({ error: (err as Error).message }, { status: 400 })
    }
  }

