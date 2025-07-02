"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const Barchart1 = () => {
  // Bar Chart Data Start
  const [filter, setFilter] = useState("2025"); // Default filter

  // Sample data for different years
  const dataByYear: Record<string, { name: string; active: number; max: number }[]> = {
    "2025": [
      { name: "Jan", active: 50, max: 250 },
      { name: "Feb", active: 80, max: 250 },
      { name: "Mar", active: 120, max: 250 },
      { name: "Apr", active: 90, max: 250 },
      { name: "May", active: 150, max: 250 },
      { name: "Jun", active: 180, max: 250 },
      { name: "Jul", active: 200, max: 250 },
      { name: "Aug", active: 170, max: 250 },
      { name: "Sep", active: 140, max: 250 },
      { name: "Oct", active: 110, max: 250 },
      { name: "Nov", active: 80, max: 250 },
      { name: "Dec", active: 50, max: 250 },
    ],
    "2024": [
      { name: "Jan", active: 30, max: 250 },
      { name: "Feb", active: 60, max: 250 },
      { name: "Mar", active: 90, max: 250 },
      { name: "Apr", active: 70, max: 250 },
      { name: "May", active: 120, max: 250 },
      { name: "Jun", active: 150, max: 250 },
      { name: "Jul", active: 180, max: 250 },
      { name: "Aug", active: 140, max: 250 },
      { name: "Sep", active: 240, max: 250 },
      { name: "Oct", active: 80, max: 250 },
      { name: "Nov", active: 60, max: 250 },
      { name: "Dec", active: 40, max: 250 },
    ],
    "2023": [
      { name: "Jan", active: 20, max: 250 },
      { name: "Feb", active: 40, max: 250 },
      { name: "Mar", active: 70, max: 250 },
      { name: "Apr", active: 50, max: 250 },
      { name: "May", active: 90, max: 250 },
      { name: "Jun", active: 120, max: 250 },
      { name: "Jul", active: 150, max: 250 },
      { name: "Aug", active: 110, max: 250 },
      { name: "Sep", active: 80, max: 250 },
      { name: "Oct", active: 60, max: 250 },
      { name: "Nov", active: 40, max: 250 },
      { name: "Dec", active: 30, max: 250 },
    ],
  };

  // ✅ Safely calculate totals
  const currentData = dataByYear[filter] ?? [];
  const activeTotal = currentData.reduce((sum, month) => sum + (month.active ?? 0), 0);
  const inactiveTotal = (250 * 12) - activeTotal;

  // Bar Chart Data End
  return (
    <div className="w-full p-6 bg-[#F9F9F9] rounded-[16px]">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-[#794A3A] font-urbanist text-[18px] font-bold">
          User Activity
        </h2>

        {/* Year Filter Dropdown */}
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 text-[18px] font-[600] rounded-[6px] text-sm text-[#5B5B5B] w-[100px] appearance-none border-2 border-[#F6805C] focus:outline-none focus:ring-2 focus:ring-[#229EDA]"
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <FaChevronDown className="ml-auto text-small text-[#F6805C] absolute top-3 right-2 pointer-events-none" />
        </div>
      </div>

      {/* Scrollable Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] md:min-w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              barGap={0}
              barSize={12}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F0F0F0"
              />
              <XAxis
                dataKey="name"
                interval={0}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#5B5B5B",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#5B5B5B",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                ticks={[0, 50, 100, 150, 200, 250]}
                domain={[0, 250]}
              />
              <Tooltip />
              <Bar
                dataKey="active"
                fill="#F6805C"
                radius={16}
                stackId="stack"
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Totals (Optional UI Display) */}
      <div className="mt-4 text-sm text-[#5B5B5B] flex justify-between">
        <span>Active Users: <strong>{activeTotal}</strong></span>
        <span>Inactive Users: <strong>{inactiveTotal}</strong></span>
      </div>
    </div>
  );
};

export default Barchart1;
