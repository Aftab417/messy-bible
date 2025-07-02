"use client";
 
import Image from "next/image";
 
import { FaInstagram, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  

  return (
    <footer className="mt-16 bg-white">
      <div className="flex flex-col items-center justify-between max-w-6xl px-4 py-10 mx-auto space-y-8 md:flex-row md:items-start md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col items-center space-y-4 text-center md:items-start md:text-left">
          <div className="flex items-center space-x-2">
            {/* Replace this div with your actual logo image if needed */}
            {/* <div className="p-2 bg-[#229EDA] rounded-full"> */}
            <Image
              src="/images/logo.png"
              alt="AI Smile Logo"
              width={55}
              height={55}
            />
            {/* </div> */}
            <span className="text-lg font-semibold text-gray-800">
              AI Smile
            </span>
          </div>
          <p className="max-w-xs text-sm text-gray-500">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center space-y-4 md:items-end">
          <h3 className="font-semibold text-gray-800">Social</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaGoogle size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="py-4 border-t border-gray-200">
        <div className="flex flex-col items-center justify-between max-w-6xl px-4 mx-auto text-sm text-gray-400 md:flex-row">
          <p>Copyright © 2022 Tess Payments. All rights reserved</p>
          <div className="flex mt-2 space-x-4 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
