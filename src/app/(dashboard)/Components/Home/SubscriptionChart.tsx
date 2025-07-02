"use client";
import React from "react";

const SubscriptionChart = ({ active = 1000, inactive = 200 }) => {
  // Calculate radius based on square root of value (since area ∝ radius²)
  const maxRadius = 80; // max px radius for the larger circle
  const activeRadius = maxRadius;
  const inactiveRadius = Math.sqrt(inactive / active) * maxRadius;

  return (
    <div className="w-full   bg-[#F9F9F9] rounded-[12px] p-5  h-full border border-[#AFAFAF]">
      <h3 className="text-[#794A3A] font-semibold text-lg mb-4">Subscription</h3>

      <div className="relative flex justify-center items-center h-52">
        {/* Outer circle - Active */}
        <div
          className="rounded-full bg-[#FA7149] flex items-end justify-center"
          style={{
            width: `${activeRadius * 2}px`,
            height: `${activeRadius * 2}px`,
          }}
        >
          {/* Inner circle - Inactive */}
          <div
            className="rounded-full bg-[#FACD4D]"
            style={{
              width: `${inactiveRadius * 2}px`,
              height: `${inactiveRadius * 2}px`,
            }}
          ></div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-5 gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-[#FA7149] rounded"></span>
          <span className="text-[#794A3A]">{active} Active</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-[#FACD4D] rounded"></span>
          <span className="text-[#794A3A]">{inactive} Inactive</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionChart;
