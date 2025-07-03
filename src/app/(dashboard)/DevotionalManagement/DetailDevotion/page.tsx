"use client";

 import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";

export default function DetailDevotion() {

    const router = useRouter();

const EditDevotion=()=>{
router.push("/DevotionalManagement/EditDevotion")

}
  return (
    <>
      <div className="lg:flex justify-between py-8">
        <h1 className="text-[#794A3A] font-dm-sans text-[18px] font-semibold pt-[15px]">
          Measuring for Growth
        </h1>

        <div className="sm:flex items-center gap-4">
          <button 
          onClick={EditDevotion}
          className="bg-[#FA8059] cursor-pointer hover:bg-[#f96c42] text-white text-sm font-semibold px-[18px] w-full sm:w-[200px] py-[14px] rounded-[12px] transition mt-[10px] sm:mt-[0px]">
           Edit Devotional
          </button>
        </div>
      </div>

      <div className="">
        <Image
          src="/images/massy-image/devotionimage.png"
          alt=""
          width={100}
          height={100}
          className="w-full h-[150px] cover rounded-[12px]"
        />
      </div>

      <div className="   space-y-4">
     
        {/* Title & Subtitle */}
        <div className=" p-[28px] rounded-[12px]">
          <h2 className="text-[#794A3A]  text-[15.038px] not-italic font-bold leading-normal pb-3">
             Measuring for Growth
          </h2>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal">
             Faith grows through hardship—if we choose to believe that God is always working for our good.
          </p>
        </div>
     

        <div className="bg-[#F0F4FF] p-[28px] rounded-[12px]">
          <h2 className="text-[#794A3A]  text-[15.038px] not-italic font-bold leading-normal pb-3">
           Ephesians 4:14-16

          </h2>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-3 ">
            In today’s reading, Paul writes, “We are to grow up in all aspects into Him who is the head” (Eph. 4:15). As believers, we should constantly strive to grow closer to God. When He is the Lord of our life, certain characteristics will be evident. Here are two spiritual benchmarks to help us evaluate our progress:

          </p>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-3 ">
            We know we’re growing spiritually when we become increasingly aware of our sinfulness and respond with quick repentance. Failure to deal with sin is rebellion against God. Growing believers turn away from wrongdoing and embrace righteousness. As we live a life of dependence and repentance, our desire to obey God intensifies and the attraction of sin diminishes.

          </p>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-3 ">
 Spiritual growth is also marked by an increase in two things—joy and struggle. Faith is often developed through hardship; in fact, we will more easily grasp how they are connected when we practice living with trust and endurance. So our relationship with the Lord will deepen when we view trials and temptations as opportunities for us to mature (James 1:2-4).

          </p>
          <p className="text-[#5B5B5B] font-inter text-[14px] italic font-normal leading-normal pb-3 ">
 The sovereign God is the gatekeeper of our life. We are maturing when we perceive whatever comes our way as being allowed by our Father and realize He’s working every situation for good.
          </p>
        </div>

        <div className="bg-[#F6805C] p-[28px] rounded-[12px]">
          <h2 className="text-[#FFF]   text-[15.038px] not-italic font-bold leading-normal pb-3">
           Related Scripture
          </h2>

            <div className="flex flex-wrap gap-2 mb-[20px]">
          <span className="bg-[#F9F9F9] rounded-[4px] p-[12px]    text-[#5B5B5B]  text-[14px] not-italic leading-normal">
            John 3:16
          </span>
          <span className="bg-[#F9F9F9] rounded-[4px] p-[12px]    text-[#5B5B5B]  text-[14px] not-italic leading-normal">
            March 15, 2024
          </span>
          <span className="bg-[#F9F9F9] rounded-[4px] p-[12px]    text-[#5B5B5B]  text-[14px] not-italic leading-normal">
            12 minutes read
          </span>
        </div>
        </div>

      
      </div>
    </>
  );
}
