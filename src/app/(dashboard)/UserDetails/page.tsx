"use client";
import React, { useState } from "react";

import OverView from "./components/OverView";
import LessonAndSermons from "./components/LessonAndSermons";
import GameActivity from "./components/GameActivity";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("overview1");

  const renderTab = () => {
    switch (activeTab) {
      case "overview1":
        return <OverView />;
      case "lesson":
        return <LessonAndSermons />;
      case "GameAct":
        return <GameActivity />;
      default:
        return null;
    }
  };

  return (
    <main>
      <div className="mb-4">
        {/* <h1 className="text-2xl font-bold">Smile</h1> */}
        <h1  className="py-[30px] text-[#794A3A] font-dm-sans text-[18px] font-semibold leading-normal">
         Users Detail
        </h1>

        
      </div>
      {/* Sidebar */}
      <div className="flex flex-col w-full lg:flex-row gap-3">
        <div className=" lg:w-1/4 w-full p-4  h-fit  dark:bg-gray-900    rounded-[20px] bg-[#F9F9F9]">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("overview1")}
                className={`w-full px-4 py-3 text-left   text-[17px] text-[#794A3A] font-inter text-lg font-semibold leading-normal  rounded-[10px] cursor-pointer ${
                  activeTab === "overview1"
                    ? "bg-[#F6805C] text-white "
                    : "hover:bg-[#F6805C] hover:text-white dark:hover:bg-gray-700"
                }`}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("lesson")}
                className={` w-full px-4 py-3 text-left  text-[17px] text-[#794A3A] font-inter text-lg font-semibold leading-normal  rounded-[10px] cursor-pointer ${
                  activeTab === "lesson"
                    ? "bg-[#F6805C] text-white"
                    : "hover:bg-[#F6805C] hover:text-white dark:hover:bg-gray-700"
                }`}
              >
            Lesson & Sermons
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("GameAct")}
                className={` w-full px-4 py-3 text-left    text-[17px] text-[#794A3A] font-inter text-lg font-semibold leading-normal  rounded-[10px] cursor-pointer ${
                  activeTab === "GameAct"
                    ? "bg-[#F6805C] text-white"
                    : "hover:bg-[#F6805C] hover:text-white dark:hover:bg-gray-700"
                }`}
              >
             Game Activity
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
