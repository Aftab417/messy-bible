"use client";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

interface ChartData {
  name: string;
  value: number;
}

interface DataByYear {
  [key: string]: ChartData[];
}

const AreaChartComponent = () => {
  const [filter, setFilter] = useState<string>("2025");

  const dataByYear: DataByYear = {
    "2025": [
      { name: "Jan", value: 75 },
      { name: "Feb", value: 100 },
      { name: "Mar", value: 20 },
      { name: "Apr", value: 70 },
      { name: "May", value: 75 },
      { name: "Jun", value: 100 },
      { name: "Jul", value: 110 },
      { name: "Aug", value: 140 },
      { name: "Sep", value: 90 },
      { name: "Oct", value: 85 },
      { name: "Nov", value: 95 },
      { name: "Dec", value: 100 }
    ],
    "2024": [
      { name: "Jan", value: 30 },
      { name: "Feb", value: 60 },
      { name: "Mar", value: 50 },
      { name: "Apr", value: 55 },
      { name: "May", value: 65 },
      { name: "Jun", value: 90 },
      { name: "Jul", value: 100 },
      { name: "Aug", value: 130 },
      { name: "Sep", value: 80 },
      { name: "Oct", value: 75 },
      { name: "Nov", value: 85 },
      { name: "Dec", value: 90 }
    ],
    "2023": [
      { name: "Jan", value: 20 },
      { name: "Feb", value: 40 },
      { name: "Mar", value: 35 },
      { name: "Apr", value: 45 },
      { name: "May", value: 50 },
      { name: "Jun", value: 70 },
      { name: "Jul", value: 90 },
      { name: "Aug", value: 120 },
      { name: "Sep", value: 60 },
      { name: "Oct", value: 65 },
      { name: "Nov", value: 75 },
      { name: "Dec", value: 80 }
    ]
  };

  return (
    <div className="w-full  bg-[#F9F9F9] rounded-xl mt-5">
      <div className="flex justify-between items-center px-7 py-6 mb-6">
        <h2 className="text-[#794A3A] text-base font-semibold">Revenue</h2>

        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 cursor-pointer  font-semibold rounded-lg text-base text-[#5B5B5B] w-24 appearance-none border border-[#F6805C] focus:outline-none focus:ring-0"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <FaChevronDown className="text-[#F6805C] absolute top-4 right-4 cursor-pointer text-xs" />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="min-w-full h-[250px] ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataByYear[filter]}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#ECECEC"
              />
              <XAxis
                dataKey="name"
                interval={0}
                tick={{ fill: "#5B5B5B", fontSize: 14, fontWeight: "700" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#5B5B5B", fontSize: 14, fontWeight: "700" }}
                ticks={[0, 50, 75, 100, 150, 200, 250]}
                domain={[0, 250]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#FFD478"
                fill="#F6805C"
                fillOpacity={1}
                strokeWidth={3}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AreaChartComponent;
