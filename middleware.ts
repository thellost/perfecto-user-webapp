import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
export default withAuth({
  secret: process.env.NEXTAUTH_SECRET ?? process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ?? "ABC",
});
export const config = { matcher: ["/dashboard" , "/profile", "/referral-dashboard"] }