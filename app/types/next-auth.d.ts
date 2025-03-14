
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        phone_number: string,
        roles: string,
        refferal_code: string
    }
}