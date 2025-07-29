"use client";
import React, { useState } from "react";
import ProfileAndSecurity from "./components/ProfileAndSecurity";
import Notifications from "./components/Notifications";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("ProfileAndSecurity");

  const renderTab = () => {
    switch (activeTab) {
      case "ProfileAndSecurity":
        return <ProfileAndSecurity />;
      case "Notifications":
        return <Notifications />;
      default:
        return null;
    }
  };

  return (
    <main>
      <h1 className="font-dm-sans font-semibold text-lg pb-5 align-middle text-[#794A3A] ">
        Setting
      </h1>
      {/* Sidebar */}
      <div className="flex flex-col w-full gap-2 lg:flex-row">
        <div className="lg:w-1/5 w-full p-4 max-h-fit bg-[#f9f9f9]  shadow  rounded-xl">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("ProfileAndSecurity")}
                className={`w-full px-4 py-3 text-left rounded-lg cursor-pointer ${
                  activeTab === "ProfileAndSecurity"
                    ? "bg-[#F6805C] text-white"
                    : "hover:bg-gray-200 "
                }`}
              >
                Profile & Security
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("Notifications")}
                className={`w-full px-4 py-3 cursor-pointer text-left rounded-lg ${
                  activeTab === "Notifications"
                    ? "bg-[#F6805C] text-white"
                    : "hover:bg-gray-200 "
                }`}
              >
                Notifications
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-0">{renderTab()}</div>
      </div>
    </main>
  );
};

export default Settings;
