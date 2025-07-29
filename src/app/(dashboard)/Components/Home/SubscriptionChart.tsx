"use client";
import React from "react";

const SubscriptionChart = ({ active = 1000, inactive = 200 }) => {
  // Calculate radius based on square root of value (since area ∝ radius²)
  const maxRadius = 80; // max px radius for the larger circle
  const activeRadius = maxRadius;
  const inactiveRadius = Math.sqrt(inactive / active) * maxRadius;

  const formatNumber = (num: number) => {
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  };

  return (
    <div className="w-full   bg-[#F9F9F9] rounded-lg p-5 max-h-96  h-full border border-[#AFAFAF]">
      <h3 className="text-[#794A3A] font-semibold text-lg mb-4">
        Subscription
      </h3>

      <div className="relative flex items-center justify-center h-64">
        {/* Outer circle - Active */}
        <div
          className="rounded-full bg-[#F6805C] flex items-end justify-start"
          style={{
            width: `${activeRadius * 3}px`,
            height: `${activeRadius * 3}px`
          }}
        >
          {/* Inner circle - Inactive */}
          <div
            className="rounded-full mb-2.5 ms-7.5 bg-[#FCC978]"
            style={{
              width: `${inactiveRadius * 3}px`,
              height: `${inactiveRadius * 3}px`
            }}
          ></div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-start gap-6 mt-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 bg-[#F6805C] rounded"></span>
          <span className="text-[#794A3A]">{formatNumber(active)} Active</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-6 h-6 bg-[#FCC978] rounded"></span>
          <span className="text-[#794A3A]">
            {formatNumber(inactive)} Inactive
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionChart;
