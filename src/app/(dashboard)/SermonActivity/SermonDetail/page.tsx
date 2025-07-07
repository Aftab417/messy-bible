"use client";

import React from "react";

export default function DetailDevotion() {
  return (
    <>
      <div className="justify-between py-8 lg:flex">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold pt-[15px]">
          Sermons Detail
        </h1>
      </div>

      <div className="space-y-4">
        {/* Header Info */}
        <div className="flex flex-wrap gap-2 mb-[20px]">
          <span className="bg-[#F6805C] rounded-[8px] px-[12px] py-[10px]   text-white  text-[14px] not-italic font-normal leading-normal">
            John 3:16
          </span>
          <span className="bg-[#F6805C] rounded-[8px] px-[12px] py-[10px]   text-white  text-[14px] not-italic font-normal leading-normal">
            March 15, 2024
          </span>
          <span className="bg-[#F6805C] rounded-[8px] px-[12px] py-[10px]   text-white  text-[14px] not-italic font-normal leading-normal">
            12 minutes read
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="bg-[#F5F0FF] p-[28px] rounded-[12px]">
          <h2 className="text-[#794A3A]  text-[15.038px] not-italic font-bold leading-normal pb-3">
            Walking by Faith, Not by Sight
          </h2>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal">
            In our journey of faith, we often encounter moments where the path
            ahead seems unclear. Today’s message explores how we can walk
            confidently with God even when we cannot see the full picture.
          </p>
        </div>
        <div className="bg-[#FFF4F0] p-[28px] rounded-[12px]">
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-3">
            {"For we walk by faith, not by sight."}
          </p>
          <h2 className="text-[#794A3A]  text-[15.038px] not-italic font-bold leading-normal ">
            2 Corinthians 5:7
          </h2>
        </div>

        <div className="bg-[#F0F4FF] p-[28px] rounded-[12px]">
          <h2 className="text-[#794A3A]  text-[15.038px] not-italic font-bold leading-normal pb-3">
            Main Message
          </h2>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-2 ">
            Faith requires us to trust in God&apos;s promises even when
            circumstances suggest otherwise. Like Abraham, who left his homeland
            without knowing the destination, we are called to trust God&apos;s
            guidance.
          </p>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal ">
            When we walk by faith, we acknowledge that God&apos;s wisdom
            surpasses our understanding. This doesn&apos;t mean we proceed
            blindly, but rather we move forward with confidence in God&apos;s
            character and promises.
          </p>
        </div>

        <div className="bg-[#F6805C] p-[28px] rounded-[12px]">
          <h2 className="text-[#FFF]  text-[15.038px] not-italic font-bold leading-normal pb-3">
            Reflection Questions
          </h2>

          <ol className="list-decimal list-inside text-sm text-[#FFF] space-y-1">
            <li>
              What areas of your life require more faith than sight right now?
            </li>
            <li>
              How has God proven His faithfulness in your past experiences?
            </li>
            <li>What steps can you take to strengthen your walk of faith?</li>
          </ol>
        </div>

        <div className="bg-[#FFF4F0] p-[28px] rounded-[12px]">
          <h2 className="text-[#794A3A]  text-[15.038px] not-italic font-bold leading-normal pb-3">
            Closing Prayer
          </h2>

          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-2 ">
            Heavenly Father, strengthen our faith as we walk with You. Help us
            trust Your guidance even when the path ahead seems uncertain. May we
            find peace in Your presence and confidence in Your promises. In
            Jesus&apos; name, Amen.
          </p>
        </div>
      </div>
    </>
  );
}
