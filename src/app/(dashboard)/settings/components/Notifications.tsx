"use client";
import React, { useState } from "react";

const Notifications = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [userActivity, setUserActivity] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => !prev);
  };

  return (
    <div className="p-6 w-full max-w-7xl bg-[#f9f9f9] rounded-xl ">
      <h1></h1>
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 sm:gap-4">
        <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-[#E5E5E5]">
          <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
            Email Notifications
          </span>
          <div
            onClick={() => toggle(setEmailNotifications)}
            className={`min-w-12 min-h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              emailNotifications ? "bg-[#6AC8C4]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                emailNotifications ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-between border border-[#E5E5E5] items-center p-4 bg-white rounded-lg ">
          <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
            System Alerts Notifications
          </span>
          <div
            onClick={() => toggle(setSystemAlerts)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              systemAlerts ? "bg-[#6AC8C4]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                systemAlerts ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 sm:gap-4">
        <div className="flex justify-between border border-[#E5E5E5] items-center p-4 bg-white rounded-lg dark:bg-gray-700">
          <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
            New User Activity Notifications
          </span>
          <div
            onClick={() => toggle(setUserActivity)}
            className={`min-w-12 min-h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              userActivity ? "bg-[#6AC8C4]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                userActivity ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-between border border-[#E5E5E5] items-center p-4 bg-white rounded-lg ">
          <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
            Weekly Summary Email Notification
          </span>
          <div
            onClick={() => toggle(setWeeklySummary)}
            className={`min-w-12 min-h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              weeklySummary ? "bg-[#6AC8C4]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                weeklySummary ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-6 py-3 text-base text-white bg-[#F6805C] rounded-lg hover:opacity-90 cursor-pointer">
          Save
        </button>
      </div>
    </div>
  );
};

export default Notifications;
