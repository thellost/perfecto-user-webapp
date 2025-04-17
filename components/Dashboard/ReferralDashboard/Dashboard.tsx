import React from "react";
import { TopBar } from "../TopBar";
import { ReferralGrid } from "./Grid";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/option"
export const ReferralDashboard = async () => {
  const session = await getServerSession(authOptions)
  console.log("server !")
  console.log(session?.user?.name) 
  return (
    <div className="bg-white rounded-lg w-fit pb-4  flex-grow shadow">
      <TopBar name={session?.user?.name  ? session?.user?.name :"as"}/>
      <ReferralGrid />
    </div>
  );
};
