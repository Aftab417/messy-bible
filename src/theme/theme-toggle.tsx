"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

  return (
    <div className="bg-white  dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg inline-flex p-1 items-center">
      <button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 text-sm rounded-lg font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
          !isDark ? "bg-[#2298e0] text-white" : "text-black dark:text-white"
        }`}
      >
        <FiSun className="text-lg" />
       
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 text-sm rounded-lg font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
          isDark ? "bg-[#2298e0] text-white" : "text-black dark:text-white"
        }`}
      >
        <FiMoon className="text-lg" />
     
      </button>
    </div>
  );
}
