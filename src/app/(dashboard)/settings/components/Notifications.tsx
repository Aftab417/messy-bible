"use client";
import React, { useState } from "react";

const Notifications = () => {
  const [aiMatching, setAiMatching] = useState(true);
  const [imageUploads, setImageUploads] = useState(true);
  const [verifiedDentists, setVerifiedDentists] = useState(true);

  const toggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter((prev) => !prev);
  };

  return (
    <div className="p-6 w-full max-w-7xl bg-[#f9f9f9] rounded-xl dark:bg-gray-900">
      <h1></h1>
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 sm:gap-4">
        <div className="flex justify-between items-center p-4 bg-white rounded-lg dark:bg-gray-700">
          <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
            Enable AI Matching
          </span>
          <div
            onClick={() => toggle(setAiMatching)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              aiMatching ? "bg-blue-900" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                aiMatching ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-white rounded-lg dark:bg-gray-700">
          <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
            Allow Image Uploads
          </span>
          <div
            onClick={() => toggle(setImageUploads)}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              imageUploads ? "bg-blue-900" : "bg-gray-400"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                imageUploads ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg dark:bg-gray-700">
        <span className="font-medium text-[14.5px] text-[#333333] dark:text-gray-100">
          Show Only Verified Dentists
        </span>
        <div
          onClick={() => toggle(setVerifiedDentists)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            verifiedDentists ? "bg-blue-900" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              verifiedDentists ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button className="px-8 py-2 text-lg text-white bg-[#229EDA] rounded-lg hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default Notifications;
