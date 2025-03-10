import type {NextAuthOptions}from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options : NextAuthOptions = {
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
                }

            },
            async authorize(credentials, request) {
                // You need to provide your own logic here that takes the credentials submitted
                // and returns either a object representing a user or value that is false/null
                // if the credentials are invalid. e.g. return { id: 1, name: 'J Smith', email:
                // 'jsmith@example.com' } You can also use the `req` object to obtain
                // additional parameters (i.e., the request IP address)
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const user = {
                    id: "42",
                    username: "zidan",
                    password: "123456",
                    email: "aldy10ball@gmail.com"
                }

                // If no error and we have user data, return it
                if (credentials
                    ?.email == user.email && credentials.password == user.password) {
                    return user
                } else {
                    return null
                }
                // Return null if user data could not be retrieved

            }
        })
    ],
}