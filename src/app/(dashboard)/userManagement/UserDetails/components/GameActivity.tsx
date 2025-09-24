"use client";
import React, { useState } from "react";

const GameActivity = () => {
  const [formData] = useState({
    TriviaQuiz: "5",
    BibleAnswerQuestion: "3",
    DailyChallenge: "5"
  });

  return (
    <div className="w-full p-6 bg-[#F9F9F9] max-w-7xl  rounded-xl">
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 sm:gap-4">
        <div className="mt-4">
          <label className="block mb-1  text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
            Bible Trivia Quiz
          </label>
          <input
            type="text"
            readOnly
            value={formData.TriviaQuiz}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0  cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-1  text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
          Search Words
          </label>
          <input
            type="text"
            readOnly
            value={formData.BibleAnswerQuestion}
            className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0  cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-1  text-[#5B5B5B] font-dm-sans text-base font-semibold normal-case">
        Bible emoji translator 
        </label>
        <input
          type="text"
          readOnly
          value={formData.DailyChallenge}
          className="w-full px-4 py-3  font-normal rounded-lg focus:outline-none focus:ring-0  cursor-not-allowed bg-[#D7D7D7] text-[#656565] border border-[#AFAFAF]"
        />
      </div>
    </div>
  );
};

export default GameActivity;
