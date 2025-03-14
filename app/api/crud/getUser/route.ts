import {DynamoDB, DynamoDBClientConfig} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocument, GetCommand, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb"
import {error} from "console"
import { NextApiRequest, NextApiResponse } from "next"
import {client, validate_user} from "../db"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    
  ) {
    try {
    const raw_json = await req.formData()
    const email = raw_json.get("email")?.toString() ?? ""
    const roles = raw_json.get("role")?.toString() ?? ""
    
      const user = await validate_user(email, roles)
      console.log("AAAAAAAAAAAAA")
      console.log(user)
      return  NextResponse.json(user,{status:200})
    } catch (err) {
        console.log((err as Error).message)
      return Response.json({ error: (err as Error).message }, { status: 400 })
    }
  }
