"use client";

import React, { useEffect, useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = ({ referral_code }: { referral_code: string | undefined }) => {
  const [totalReferred, setTotalReferred] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/crud/dashboard/getReferralData?referral_code=${referral_code}`
        );
        const result = await response.json();

        // Calculate total referred persons and earnings
        const referredPersons = result.referredPersons || [];
        setTotalReferred(referredPersons.length);
        setTotalEarnings(referredPersons.length * 1.2); // $1.2 per referred person
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setLoading(false);
      }
    };

      fetchReferralData();
    
  }, [referral_code]);

  if (loading) {
    return (
      <div className="flex justify-center items-center  col-span-12 h-32">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Card
        title="Total Referred Persons"
        value={totalReferred.toString()}
        pillText="0%"
        trend="up"
        period="All time"
      />
      <Card
        title="Total Earnings From Referral"
        value={`$${totalEarnings.toFixed(2)}`}
        pillText="0%"
        trend="up"
        period="All time"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-6 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
