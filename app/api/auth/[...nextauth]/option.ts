
import type {NextAuthOptions}from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { DynamoDBAdapter } from "@auth/dynamodb-adapter"
import { client } from "../../crud/db"
import { User } from "@/app/types/DefaultType";
import { validate_user } from "../../crud/db";
import bcrypt from 'bcrypt';
import { userAgent } from "next/server";

export const authOptions : NextAuthOptions = {
    secret: "ABCDEFGHIJKLMN12345",
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
                userRole: {
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
                    console.log(credentials)
                    const user = await validate_user(credentials?.email, credentials?.userRole)
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
    callbacks: {
        //  The extended shape of session is defined in @types/next-auth.d.ts
        async session({ session }) {
            if (session.user === undefined || session.user === null || session.user.email === null || session.user.email === undefined){
                return session
            }
            console.log(session)
            const user: User = await validate_user(session.user?.email);
            console.log(user)
            session.roles = user.userRole ?? "buyer";
            session.phone_number = user?.phone_number ?? "";
            session.referral_code= user?.referral_code ?? "";
            return session
        },
    }
}

