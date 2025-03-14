
import { NextResponse } from "next/server"
import { createNewUser } from "../db"
import {generate} from "referral-codes"
export async function POST(
    req: Request,
    
  ) {
    try {
    const raw_json = await req.formData()
    const first_name = raw_json.get("firstName")?.toString() ?? ""
    const Last_name = raw_json.get("lastName")?.toString() ?? ""
    const user_data = {
        name: (first_name + " " + Last_name),
        phone_number: raw_json.get("phone")?.toString() ?? "",
        email: raw_json.get("email")?.toString() ?? "",
        roles: raw_json.get("role")?.toString() ?? "",
        hashed_password: raw_json.get("password")?.toString() ?? "",
        
        referral_code : generate({
            length: 10,
            charset: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          })[0]
    
  }
      await createNewUser(user_data, raw_json.get("referral")?.toString() ?? "")
      return  new Response ("Done", {
        status: 200
      })
    } catch (err) {
        console.log((err as Error).message)
      return NextResponse.json({ error: (err as Error).message }, { status: 400 })
    }
  }

