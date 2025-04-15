"use client";
import React, { useEffect, useState } from "react";
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
      redirect("/login");
    },
  });

  const [referralData, setReferralData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        const referral_code = session.data?.referral_code;
        if (!referral_code) return;

        const response = await fetch(
          `/api/crud/dashboard/getReferralData?referral_code=${referral_code}`
        );
        const result = await response.json();
        setReferralData(result.referredPersons || []);
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session.status === "authenticated") {
      fetchReferralData();
    }
  }, [session]);

  if (session.status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 grid gap-3 grid-cols-12 load">
      <StatCards
        totalReferred={referralData.length}
        totalEarnings={referralData.length * 1.2} // $1.2 per referred person
      />
      <ActivityGraph referralData={referralData} />
      <UsageRadar />
      <ReferralDetail referralData={referralData} />
    </div>
  );
};
