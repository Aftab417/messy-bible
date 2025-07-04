"use client";

import { resetUser } from "@/redux/authSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaBookOpen, FaFileAlt, FaHome, FaUser } from "react-icons/fa";
import { FiLogOut, FiChevronDown, FiChevronUp } from "react-icons/fi";
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
    href: "#",
    icon: <FaFileAlt />,
    dropdown: [
      { label: "Sermon Activity", href: "/SermonActivity" },
      { label: "Sermon Templates", href: "/SermonTemplates" }
    ]
  },
  {
    label: "Devotional Management",
    href: "/DevotionalManagement",
    icon: <FaFileAlt />
  },
  {
    label: "Verse & Tips Management",
    href: "/VerseAndTipsManagement",
    icon: <FaFileAlt />
  },
  {
    label: "Game Management",
    href: "/GameManagement",
    icon: <FaFileAlt />
  },
  {
    label: "Subscription Management",
    href: "/SubscriptionManagement",
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(resetUser());
    router.push("/sign-in");
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const handleDropdownItemClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to parent
    if (onClose) onClose();
  };

  return (
    <div
      className="flex flex-col items-center w-full h-full md:h-[90vh] overflow-y-auto p-2 text-[#5B5B5B] bg-[#F9F9F9] dark:bg-gray-900 min-w-72 [&::-webkit-scrollbar]:w-1 
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
      <div className="flex flex-col items-center justify-between flex-grow w-full pt-[20px]">
        <div className="flex flex-col justify-center items-center w-full">
          <nav className="space-y-2 w-full">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              const hasDropdown = item.dropdown;
              const isDropdownOpen = openDropdown === item.label;
              const isDropdownItemActive = hasDropdown 
                ? item.dropdown.some(option => pathname === option.href)
                : false;

              // Add separator and heading after Users Management (index 1)
              if (index === 1) {
                return (
                  <div key={`group-${index}`} className="w-full">
                    {/* Users Management Link */}
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center min-w-64 w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                      }`}
                    >
                      <span
                        className={`text-lg ${isActive ? "text-white" : ""}`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
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

              if (hasDropdown) {
                return (
                  <div key={item.label} className="mb-2" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between min-w-64 cursor-pointer w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                        isDropdownItemActive || isDropdownOpen
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {isDropdownOpen ? (
                        <FiChevronUp className="text-lg" />
                      ) : (
                        <FiChevronDown className="text-lg" />
                      )}
                    </button>

                    {isDropdownOpen && (
                      <div className="space-y-1 text-center">
                        {item.dropdown.map((option) => {
                          const isOptionActive = pathname === option.href;
                          return (
                            <Link
                              key={option.href}
                              href={option.href}
                              onClick={handleDropdownItemClick}
                              className={`flex items-center text-center w-full gap-3 px-4 py-2 text-[#5B5B5B] font-inter text-[14px] font-normal transition-all ${
                                isOptionActive
                                  ? "text-[#F6805C] border-b border-b-[#F6805C] text-center font-semibold"
                                  : "hover:text-[#F6805C] hover:font-semibold border-b border-b-[#AFAFAF]"
                              }`}
                            >
                              <span className="text-center pl-[30px]">{option.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              if (index === navItems.length - 2) {
                return (
                  <div key={`group-${index}`} className="w-full">
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center min-w-64 w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                      }`}
                    >
                      <span
                        className={`text-lg ${isActive ? "text-white" : ""}`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>

                    <div className="my-3 w-full mt-[200px]"></div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center min-w-64 w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                    isActive
                      ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                      : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                  }`}
                >
                  <span className={`text-lg ${isActive ? "text-white" : ""}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="">
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer min-w-64 w-full gap-2 px-4 py-3 mb-3 hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all"
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