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

export const ActivityGraph = ({
  referralData,
}: {
  referralData: { created_at: string }[];
}) => {
  const [data, setData] = useState<{ name: string; NewReferral: number }[]>([]);

  useEffect(() => {
    const monthlyData: { [key: string]: number } = {};
    referralData.forEach((referral) => {
      const month = new Date(referral.created_at).toLocaleString("default", {
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    const chartData = Object.keys(monthlyData).map((month) => ({
      name: month,
      NewReferral: monthlyData[month],
    }));

    setData(chartData);
  }, [referralData]);

  if (data.length === 0) {
    return (
      <div className="col-span-8 overflow-hidden rounded border border-stone-300 h-64">
        <div className="p-4">
          <h3 className="flex items-center gap-1.5 font-medium text-lg">
            <FiUser /> Activity
          </h3>
        </div>
        <div className="flex justify-center items-center h-1/2">
          <div className="text-center">
            <p className="text-xl text-stone-500">No data available</p>
          </div>
        </div>
      </div>
    );
  }

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
