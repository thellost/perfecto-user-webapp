
import type {NextAuthOptions}from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { DynamoDBAdapter } from "@auth/dynamodb-adapter"
import { client } from "../../crud/db"

import { validate_user } from "../../crud/db";
import bcrypt from 'bcrypt';
import { userAgent } from "next/server";

export const authOptions : NextAuthOptions = {
    pages:{
        signIn: "/login"
    },
    providers: [

        GoogleProvider({clientId: (process.env.GOOGLE_CLIENT_ID as string), clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string)}),
        CredentialsProvider({
            name: "Credentials.",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Your Email."
                },
                password: {
                    label: "Password",
                    type: "password"
                },
                role: {
                    label: "Roles",
                    type: "text"
                }

            },
            async authorize(credentials, request) {
                // You need to provide your own logic here that takes the credentials submitted
                // and returns either a object representing a user or value that is false/null
                // if the credentials are invalid. e.g. return { id: 1, name: 'J Smith', email:
                // 'jsmith@example.com' } You can also use the `req` object to obtain
                // additional parameters (i.e., the request IP address)
                try {
                    const user = await validate_user(credentials?.email , credentials?.role)
                    const passwordMatches = await bcrypt.compare((credentials?.password as string), user.hashed_password)
                    // If no error and we have user data, return it
                    if (credentials
                        ?.email == user.email && passwordMatches) {
                            console.log(user)
                        return user
                    } else {
                        return null
                    }
                    } catch (e) {
                        return null
                    }

                // Return null if user data could not be retrieved

            },

            
        })
    ],
}

