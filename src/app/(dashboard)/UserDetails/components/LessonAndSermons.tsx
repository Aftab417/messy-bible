"use client";
import React, { useState } from "react";

const LessonAndSermons = () => {
  const [formData] = useState({
    TotalLesson: "12",
    Compeltelesson: "12",
    Inprogres: "3",
    Saved: "2",
    Totalsermon: "12",
    downloadsermon: "2"
  });
  return (
    <div className="">
      <h1 className="pb-[20px] text-[#794A3A] font-dm-sans text-[18px] font-semibold leading-normal">
        Users Detail
      </h1>

      <div className="w-full p-6 bg-[#F9F9F9] max-w-7xl dark:bg-gray-900 rounded-xl">
        <div className="mt-4">
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Total Lesson Generated
          </label>
          <input
            type="text"
            readOnly
            value={formData.TotalLesson}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 sm:gap-4">
          <div className="mt-4">
            <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
              Completed Lessons:
            </label>
            <input
              type="text"
              readOnly
              value={formData.Compeltelesson}
              className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
            />
          </div>

          <div className="mt-4">
            <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
              In Progress:
            </label>
            <input
              type="text"
              readOnly
              value={formData.Inprogres}
              className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Saved:
          </label>
          <input
            type="text"
            readOnly
            value={formData.Saved}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>
      </div>
      <h1 className="py-[20px] text-[#794A3A] font-dm-sans text-[18px] font-semibold leading-normal">
        Sermons
      </h1>

      <div className="w-full p-6 bg-[#F9F9F9] max-w-7xl dark:bg-gray-900 rounded-xl">
        <div className="mt-4">
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Total Sermons Generated
          </label>
          <input
            type="text"
            readOnly
            value={formData.Totalsermon}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Downloaded Sermons
          </label>
          <input
            type="text"
            readOnly
            value={formData.downloadsermon}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>
      </div>
    </div>
  );
};

export default LessonAndSermons;
