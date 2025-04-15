"use client"
import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import { ReferralDetail } from "./ReferralDetail";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const Grid = () => {
  const session = useSession({
    required: true, 
    onUnauthenticated() {
      // Handle unauthenticated state here, e.g., redirect to login page
      redirect("/login")
    }
  });
  
  if (session.status === "loading") {
    // Show a loading spinner or placeholder while session data is being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (

    <div className="px-4 grid gap-3 grid-cols-12 load">
      <StatCards referral_code={session.data?.referral_code ? session.data?.referral_code : undefined} />
      <ActivityGraph referral_code={session.data?.referral_code ? session.data?.referral_code : undefined} />
      <UsageRadar />
      <ReferralDetail referral_code={session.data?.referral_code ? session.data?.referral_code : undefined} />
    </div>
  );
};
