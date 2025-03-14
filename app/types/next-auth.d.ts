
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        phone_number: string,
        roles: string,
        referral_code: string
    }
}