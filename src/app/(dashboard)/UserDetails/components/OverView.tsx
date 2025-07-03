"use client";
import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaChevronDown } from "react-icons/fa";
import Image from "next/image";

const OverView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(["Spiritual Growth & Application"]);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "Qasim Muneer",
    email: "Alice.Johnson@Example.Com",
    password: "Password123@",
    bibleVersion: "ESV",
    status: "Active",
    joined: "2025-05-14",
    age: "19",
    currentPlan: "Yearly"
  });

  const bibleVersions = ["ESV", "NIV", "KJV", "NASB", "NLT", "MSG"];
  const currentPlans = ["Yearly", "Monthly", "Free Trial"];
  const interestOptions = [
    "Spiritual Growth & Application",
    "Bible Study",
    "Prayer",
    "Community",
    "Leadership",
    "Worship"
  ];

  // Close dropdown when clicking outside
 
    
 

  const togglePassword = () => setShowPassword(!showPassword);

 const toggleInterest = (interest: string) => {
  if (selectedInterests.includes(interest)) {
    setSelectedInterests(selectedInterests.filter(item => item !== interest));
  } else {
    setSelectedInterests([...selectedInterests, interest]);
  }
};

 const removeInterest = (interestToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedInterests(selectedInterests.filter(interest => interest !== interestToRemove));
};

  return (
    <div className="flex-1 w-full p-6 bg-[#F9F9F9] dark:bg-gray-900 rounded-[16px]">
      <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Image
            width={200}
            height={300}
            src="/images/provider-profile.png"
            alt="Doctor"
            className="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-[#333] font-dm-sans text-[19.509px] font-semibold leading-normal">Qasim Muneer</h2>
            <p className="text-sm text-[#333333] pt-2">Alice.Johnson@Example.Com</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
        <div>
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Full Name
          </label>
          <input
            type="text"
            readOnly
            value={formData.name}
            className="w-full px-4 py-3 bg-[#D7D7D7] text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed border border-[#AFAFAF]"
          />
        </div>
        <div className="relative">
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Bible Version
          </label>
          <select
            value={formData.bibleVersion}
            onChange={(e) => setFormData((prev) => ({ ...prev, bibleVersion: e.target.value }))}
            className="w-full px-4 py-3 bg-white border border-[#AFAFAF] appearance-none cursor-pointer text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100"
          >
            {bibleVersions.map(version => (
              <option key={version} value={version}>{version}</option>
            ))}
          </select>
            <FaChevronDown className="ml-auto text-small text-gray-400 absolute top-11 right-4"  />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
          Email
        </label>
        <input
          type="email"
          readOnly
          value={formData.email}
          className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2 md:gap-6">
        <div>
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Status
          </label>
          <input
            type="text"
            readOnly
            value={formData.status}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>
        <div>
          <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Joined
          </label>
          <input
            type="text"
            readOnly
            value={formData.joined}
            className="w-full px-4 py-3   font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
          Age
        </label>
        <input
          type="text"
          readOnly
          value={formData.age}
          className="w-full px-4 py-3   font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
        />
      </div>

      <div className="mt-4 relative" ref={dropdownRef}>
        <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
          Interest
        </label>
        <div 
          className="w-full px-4 py-2 bg-white text-[#656565] border border-gray-300 font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 cursor-pointer flex items-center flex-wrap gap-2 min-h-[48px]"
          onClick={() => setShowInterestDropdown(!showInterestDropdown)}
        >
          {selectedInterests.length > 0 ? (
            selectedInterests.map((interest, index) => (
              <div key={index} className="flex items-center px-3 py-1 bg-[#F6F6F6] rounded-[10px]">
                <span className="text-[#794A3A] font-inter text-xs font-normal">{interest}</span>
                <button 
                  type="button"
                  onClick={(e) => removeInterest(interest, e)}
                  className="ml-1 text-[#F6805C] cursor-pointer hover:text-gray-700"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-400">Select interests...</span>
          )}
          <FaChevronDown className="ml-auto text-small text-gray-400" />
        </div>

        {showInterestDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 max-h-60 overflow-y-auto">
            {interestOptions.map((interest, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  selectedInterests.includes(interest) ? "bg-gray-100 dark:bg-gray-600" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleInterest(interest);
                }}
              >
                <div className="flex items-center">
                  {interest}
                  {selectedInterests.includes(interest) && (
                    <span className="ml-auto text-green-500">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 relative">
        <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
          Current Plan
        </label>
        <select
          value={formData.currentPlan}
          onChange={(e) => setFormData((prev) => ({ ...prev, currentPlan: e.target.value }))}
          className="w-full px-4 py-3 bg-white cursor-pointer appearance-none text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100"
        >
          {currentPlans.map(plan => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>

                  <FaChevronDown className="ml-auto text-small text-gray-400 absolute top-11 right-4"  />
        
      </div>

      <div className="mt-4">
        <label className="block mb-1 dark:text-white text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
          Password
        </label>
        <div className="relative color-[#656565]">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full px-4 py-3 bg-white text-[#656565] font-normal rounded-lg focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute text-gray-500 cursor-pointer dark:text-gray-100 dark:hover:text-gray-300 right-3 top-4 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-end mt-6">
        <button className="px-[80px] py-[16px]   hover:bg-transparent border-2 hover:border-[#F6805C] hover:text-[#F6805C] cursor-pointer   bg-[#F6805C] rounded-[10px]  text-[#FFF] text-center font-inter text-sm font-medium">
          Update
        </button>
      </div>
    </div>
  );
};

export default OverView;