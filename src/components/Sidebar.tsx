"use client";

import { resetUser } from "@/redux/authSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import Image from "next/image";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: "/images/dashboard.svg",
    iconActive: "/images/wDashboard.svg"
  },
  {
    label: "Users Management",
    href: "/userManagement",
    icon: "/images/userManagement.svg",
    iconActive: "/images/wUserManagement.svg"
  },
  {
    label: "Lesson Management",
    href: "/LessonManagement",
    icon: "/images/lessonManagement.svg",
    iconActive: "/images/wLessonManagement.svg"
  },
  {
    label: "Sermon Management",
    href: "#",
    icon: "/images/sermonManagement.svg",
    iconActive: "/images/wSermonManagement.svg",
    dropdown: [
      { label: "Sermon Activity", href: "/SermonActivity" },
      { label: "Sermon Templates", href: "/SermonTemplates" }
    ]
  },
  {
    label: "Devotional Management",
    href: "/DevotionalManagement",
    icon: "/images/devotionalManagement.svg",
    iconActive: "/images/wDevotionalManagement.svg"
  },
  {
    label: "Verse & Tips Management",
    href: "/VerseAndTipsManagement",
    icon: "/images/verseAndTips.svg",
    iconActive: "/images/wVerseAndTips.svg"
  },
  {
    label: "Game Management",
    href: "/GameManagement",
    icon: "/images/gameManagement.svg",
    iconActive: "/images/wGameManagement.svg"
  },
  {
    label: "Subscription Management",
    href: "/SubscriptionManagement",
    icon: "/images/subscriptionManagement.svg",
    iconActive: "/images/wSubscriptionManagement.svg"
  },
  {
    label: "Settings",
    href: "/settings",
    icon: "/images/setting.svg",
    iconActive: "/images/wSetting.svg"
  }
];

interface SidebarProps {
  onClose?: () => void;
}
interface NavDropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
  iconActive: string;
  dropdown?: NavDropdownItem[];
}

type GetIconPathParams = {
  item: NavItem;
  isActive: boolean;
  isHovered: boolean;
  isDropdownItemActive: boolean;
  isDropdownOpen: boolean;
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [logoutHover, setLogoutHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
    e.stopPropagation();
    if (onClose) onClose();
  };
  const getIconPath = ({
    item,
    isActive,
    isHovered,
    isDropdownItemActive,
    isDropdownOpen
  }: GetIconPathParams): string => {
    if (isActive || isDropdownItemActive || isDropdownOpen || isHovered) {
      return item.iconActive;
    }
    return item.icon;
  };
  return (
    <div
      className="flex flex-col items-center w-full h-full md:h-[90vh] overflow-y-auto p-2 text-[#5B5B5B] bg-[#F9F9F9] scrollbar-hide max-w-64 [&::-webkit-scrollbar]:w-1 
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
        <div className="flex flex-col items-center justify-center w-full">
          <nav className="w-full space-y-2">
            {navItems.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const hasDropdown = item.dropdown;
              const isDropdownOpen = openDropdown === item.label;
              const isDropdownItemActive = hasDropdown
                ? item.dropdown.some((option) => pathname === option.href)
                : false;
              // const isHovered = hoveredItem === item.label;

              // Add separator and heading after Users Management (index 1)
              if (index === 1) {
                return (
                  <div key={`group-${index}`} className="w-full">
                    {/* Users Management Link */}
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex items-center w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                      }`}
                    >
                      <Image
                        src={getIconPath({
                          item,
                          isActive,
                          isHovered: hoveredItem === item.label,
                          isDropdownItemActive,
                          isDropdownOpen
                        })}
                        alt={item.label}
                        width={20}
                        height={20}
                        className="object-contain w-5 h-5"
                      />
                      <span>{item.label}</span>
                    </Link>

                    {/* Divider Line */}
                    <div className="w-full my-3 border-t border-gray-300"></div>

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
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex items-center justify-between min-w-50 cursor-pointer w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                        isDropdownItemActive || isDropdownOpen
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={getIconPath({
                            item,
                            isActive,
                            isHovered: hoveredItem === item.label,
                            isDropdownItemActive,
                            isDropdownOpen
                          })}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="object-contain w-5 h-5"
                        />
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
                              <span className="text-center pl-[30px]">
                                {option.label}
                              </span>
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
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`flex items-center min-w-50 w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                        isActive
                          ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                          : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                      }`}
                    >
                      <Image
                        src={getIconPath({
                          item,
                          isActive,
                          isHovered: hoveredItem === item.label,
                          isDropdownItemActive,
                          isDropdownOpen
                        })}
                        alt={item.label}
                        width={20}
                        height={20}
                        className="object-contain w-5 h-5"
                      />
                      <span>{item.label}</span>
                    </Link>

                    <div className="w-full my-3 mt-10"></div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex items-center min-w-50 w-full gap-3 px-4 py-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
                    isActive
                      ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                      : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
                  }`}
                >
                  <Image
                    src={getIconPath({
                      item,
                      isActive,
                      isHovered: hoveredItem === item.label,
                      isDropdownItemActive,
                      isDropdownOpen
                    })}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="object-contain w-5 h-5"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            onMouseEnter={() => {
              setLogoutHover(true);
              setHoveredItem("logout");
            }}
            onMouseLeave={() => {
              setLogoutHover(false);
              setHoveredItem(null);
            }}
            className={`flex items-center w-full gap-3 px-4 py-3 mt-3 text-[#5B5B5B] font-inter text-[14px] font-normal rounded-lg transition-all ${
              logoutHover
                ? "bg-[#F6805C] text-[#FFFFFF] font-semibold"
                : "hover:bg-[#F6805C] hover:text-[#FFFFFF] hover:font-semibold"
            }`}
          >
            <Image
              src={logoutHover ? "/images/wLogout.svg" : "/images/logout.svg"}
              alt="logout"
              width={20}
              height={20}
              className="object-contain w-5 h-5"
            />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};