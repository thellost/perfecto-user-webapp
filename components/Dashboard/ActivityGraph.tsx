"use client";

import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

export const ActivityGraph = ({ referral_code }: { referral_code: string | undefined}) => {
  const [data, setData] = useState<{ name: string; NewReferral: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        console.log("fetching referral data...");
        const response = await fetch(
          `/api/crud/dashboard/getReferralData?referral_code=${referral_code}`
        );
        console.log("response", response);
        const result = await response.json();

        // Process referral data to group by month
        const monthlyData: { [key: string]: number } = {};
        result.referredPersons.forEach((referral: { created_at: string }) => {
          const month = new Date(referral.created_at).toLocaleString("default", {
            month: "short",
          });
          monthlyData[month] = (monthlyData[month] || 0) + 1;
        });

        // Convert monthly data into chart format
        const chartData = Object.keys(monthlyData).map((month) => ({
          name: month,
          NewReferral: monthlyData[month],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching referral data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (referral_code) {
      fetchReferralData();
    }
  }, [referral_code]);
  console.log("loading data...");
  if (loading) {
    return (
      <div className="flex justify-center col-span-8 items-center h-64">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  console.log("finish loading data");
  console.log(data);
  if (data.length === 0) {  
    return (
      <div className="col-span-8 overflow-hidden rounded border border-stone-300 h-64">
        {/* Title Section */}
        <div className="p-4">
          <h3 className="flex items-center gap-1.5 font-medium text-lg">
            <FiUser /> Activity
          </h3>
        </div>

        {/* Centered No Data Message */}
        <div className="flex justify-center items-center h-1/2">
          <div className="text-center">
            <p className="text-xl text-stone-500">No data available</p>
          </div>
        </div>
      </div>
    );
  }
  // Ensure the data is sorted by month
  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Activity
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="NewReferral"
              stroke="#5b21b6"
              fill="#5b21b6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
