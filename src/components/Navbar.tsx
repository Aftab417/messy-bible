"use client";

import {  FaBars } from "react-icons/fa";
import Image from "next/image";
 

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
 
    <div className="flex w-full items-center justify-between px-6 py-4 bg-[#6AC8C4] dark:bg-gray-900 ">
    
    
      {/* Mobile Menu Button */}
      <button className="block text-xl text-white md:hidden" onClick={onMenuClick}>
        <FaBars />
      </button>

      {/* Search Input */}
      <div className="  hidden  md:flex items-center md:ml-0 pl-[40px]">
          <div>
          <Image
            src="/images/massy-image/logo.png"
            alt="Bar Graph"
            width={50}
            height={50}
            className="w-[40px] h-[50px]"
          />
        </div>

        <p className="text-white flex  items-center pl-[40px] font-dm-sans text-[15px] font-medium not-italic leading-normal">
  Dashboard <span className="mx-1 text-[#C4C4C4]">
  <div className="px-[6px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="7" viewBox="0 0 6 7" fill="none">
  <circle cx="3" cy="3.5" r="3" fill="white"/>
</svg>
  </div>
</span> Overview
</p>

      </div>

      <div className="flex items-center gap-6">
        {/* <ThemeToggle /> */}
        <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#F5F5F5] rounded-[50px]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9161 10.2464L15.4911 5.11945C15.0734 3.61745 14.1657 2.29817 12.9121 1.3713C11.6586 0.444441 10.1312 -0.0368093 8.57271 0.00405082C7.01425 0.0449109 5.51417 0.605536 4.31091 1.59681C3.10765 2.58809 2.27027 3.95313 1.93186 5.47495L0.828614 10.4362C0.706751 10.9844 0.709568 11.553 0.836859 12.0999C0.964149 12.6469 1.21266 13.1583 1.56405 13.5964C1.91544 14.0344 2.36073 14.388 2.86705 14.6309C3.37337 14.8739 3.92778 15 4.48936 14.9999H5.32486C5.497 15.8477 5.95691 16.6098 6.62667 17.1572C7.29643 17.7047 8.13485 18.0037 8.99986 18.0037C9.86488 18.0037 10.7033 17.7047 11.3731 17.1572C12.0428 16.6098 12.5027 15.8477 12.6749 14.9999H13.3034C13.8815 15 14.4518 14.8664 14.9697 14.6095C15.4876 14.3527 15.9391 13.9796 16.289 13.5193C16.6388 13.0591 16.8775 12.5242 16.9865 11.9565C17.0954 11.3887 17.0716 10.8035 16.9169 10.2464H16.9161ZM8.99986 16.4999C8.53617 16.498 8.08439 16.3529 7.70634 16.0844C7.32829 15.8159 7.04243 15.4371 6.88786 14.9999H11.1119C10.9573 15.4371 10.6714 15.8159 10.2934 16.0844C9.91534 16.3529 9.46356 16.498 8.99986 16.4999V16.4999ZM15.0944 12.6112C14.8854 12.8885 14.6146 13.1131 14.3036 13.2674C13.9925 13.4217 13.6498 13.5013 13.3026 13.4999H4.48936C4.15245 13.4999 3.81986 13.4242 3.51612 13.2784C3.21239 13.1326 2.94527 12.9205 2.73449 12.6576C2.5237 12.3948 2.37463 12.088 2.29829 11.7598C2.22194 11.4317 2.22025 11.0906 2.29336 10.7617L3.39586 5.7997C3.66163 4.60436 4.31934 3.53215 5.26446 2.75354C6.20957 1.97492 7.38783 1.53458 8.61195 1.50251C9.83606 1.47044 11.0358 1.84849 12.0203 2.57655C13.0049 3.30462 13.7179 4.34091 14.0459 5.5207L15.4709 10.6477C15.565 10.9817 15.58 11.3331 15.5147 11.6739C15.4493 12.0148 15.3054 12.3357 15.0944 12.6112V12.6112Z"
              fill="#666666"
            />
          </svg>
        </div>
        {/* <FaUser className="text-2xl" /> */}
        <div>
          <Image
            src="/images/topbar-userprofile.png"
            alt="Bar Graph"
            width={39}
            height={33}
            className="w-[39px] h-[39px]"
          />
        </div>
      </div>
    </div>
 
  );
};
