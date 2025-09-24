"use client";

import React, { useState } from "react";

const InterestManagement = () => {
  const [interests, setInterests] = useState([
    "Spiritual Growth & Application",
    "Faith Communication & Apologetics", 
    "Critical Thinking & Worldview",
    "Character Building & Christlike Living"
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setNewInterest("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-4 sm:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl sm:text-3xl font-bold text-[#794A3A] mb-2">
              Add New Interest
            </h1>
          </div>

          {/* Interests List */}
          <div className="space-y-4 mb-8">
            {interests.map((interest, index) => (
              <div 
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <span className="text-gray-900 font-medium text-sm sm:text-base">
                  {interest}
                </span>
                <button
                  onClick={() => handleDeleteInterest(index)}
                  className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                  aria-label="Delete interest"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Add Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#F6805C] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#E6704A] transition-colors text-sm sm:text-base cursor-pointer"
            >
              + Add New Interest
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              {/* Modal Header */}
              <h2 className="text-xl font-bold text-[#794A3A] mb-6">
                Add New Interest
              </h2>

              {/* Form */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#794A3A] mb-2">
                  Enter Interest
                </label>
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Enter Text Here"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F6805C] focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                  autoFocus
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 border border-[#F6805C] text-[#F6805C] rounded-lg font-medium hover:bg-[#F6805C] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddInterest}
                  disabled={!newInterest.trim()}
                  className="flex-1 px-4 py-3 bg-[#F6805C] text-white rounded-lg font-medium hover:bg-[#E6704A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestManagement;
