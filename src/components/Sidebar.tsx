"use client";

import { resetUser } from "@/redux/authSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FaBookOpen, FaFileAlt, FaHome, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosSettings, IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

const navItems = [
  { label: "Dashboard", href: "/", icon: <FaHome /> },
  { label: "Users Management", href: "/userManagement", icon: <FaUser /> },
  // Add a separator and heading after this item
  {
    label: "Lesson Management",
    href: "/LessonManagement",
    icon: <FaBookOpen />
  },
  {
    label: "Sermon Management",
    href: "/dentalManagement",
    icon: <FaFileAlt />
  },
  {
    label: "Devotional Management",
    href: "/dentalManagement1",
    icon: <FaFileAlt />
  },
  {
    label: "Verse & Tips Management",
    href: "/VerseAndTipsManagement",
    icon: <FaFileAlt />
  },
  {
    label: "Game Management",
    href: "/dentalManagement2",
    icon: <FaFileAlt />
  },
  {
    label: "Subscription Management",
    href: "/dentalManagement3",
    icon: <FaFileAlt />
  },
  { label: "Settings", href: "/settings", icon: <IoIosSettings /> }
];

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(resetUser());
    router.push("/sign-in");
  };

  return (
    <div
      className="flex flex-col items-center w-full h-full md:h-[90vh] overflow-y-auto  p-2 text-[#5B5B5B] bg-[#F9F9F9] dark:bg-gray-900 min-w-72    [&::-webkit-scrollbar]:w-1 
  [&::-webkit-scrollbar-thumb]:rounded-full 
  [&::-webkit-scrollbar-thumb]:bg-gray-300 
  [&::-webkit-scrollbar-track]:bg-gray-100"
    >
      {onClose && (
        <button
          onClick={onClose}
          className="self-end mb-4 text-2xl md:hidden"
          aria-label="Close Sidebar"
        >
          <IoMdClose />
        </button>
      )}
      <div className="flex flex-col items-center justify-between flex-grow w-full  pt-[20px]">
        <div className="flex flex-col justify-center items-center w-full">
          <nav className="space-y-2 w-full">
            {navItems.map(({ label, href, icon }, index) => {
              const isActive = pathname === href;

              // Add separator and heading after Users Management (index 1)
              if (index === 1) {
                return (
                  <div key={`group-${index}`} className="w-full">
                    {/* Users Management Link */}
                    <Link
                      href={href}
                      onClick={onClose}
                      className={`flex items-center min-w-64 w-full gap-3 px-4 py-3   text-[#5B5B5B] font-inter text-[14px] font-normal   rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-white hover:text-[#333333] hover:font-semibold"
                      }`}
                    >
                      <span
                        className={`text-lg ${isActive ? "text-white" : ""}`}
                      >
                        {icon}
                      </span>
                      <span>{label}</span>
                    </Link>

                    {/* Divider Line */}
                    <div className="my-3 w-full border-t border-gray-300"></div>

                    {/* Content Management Heading */}
                    <div className="text-[#794A3A] font-inter text-sm font-semibold leading-normal">
                      Content Management
                    </div>
                  </div>
                );
              }

              if (index === 6) {
                return (
                  <div key={`group-${index}`} className="w-full">
                    {/* Users Management Link */}
                    <Link
                      href={href}
                      onClick={onClose}
                      className={`flex items-center min-w-64 w-full gap-3 px-4 py-3   text-[#5B5B5B] font-inter text-[14px] font-normal   rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-white hover:text-[#333333] hover:font-semibold"
                      }`}
                    >
                      <span
                        className={`text-lg ${isActive ? "text-white" : ""}`}
                      >
                        {icon}
                      </span>
                      <span>{label}</span>
                    </Link>

                    {/* Divider Line */}
                    <div className=" my-3 w-full mt-[200px]"></div>
                  </div>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center min-w-64 w-full gap-3 px-4 py-3    text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                    isActive
                      ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                      : "hover:bg-white hover:text-[#333333] hover:font-semibold"
                  }`}
                >
                  <span className={`text-lg ${isActive ? "text-white" : ""}`}>
                    {icon}
                  </span>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="">
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer min-w-64 w-full gap-2 px-4 py-3  mb-3 hover:bg-white hover:text-[#333333] hover:font-semibold         text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all"
            >
              <FiLogOut className="text-lg" />
              <span className=""> Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
