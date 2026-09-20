"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={
        theme === "dark"
          ? "Switch to Light Mode"
          : "Switch to Dark Mode"
      }
      className={`
        flex
        h-[40px]
        w-[40px]
        items-center
        justify-center
        rounded-full
        border
        transition-all
        duration-300
        hover:scale-110
        cursor-pointer
        ${
          theme === "dark"
            ? "border-[#E27500] bg-[#171A24] shadow-[0_0_25px_rgba(226,117,0,0.45)]"
            : "border-gray-300 bg-white shadow-lg"
        }
      `}
    >
      {theme === "dark" ? (
        <FaMoon
          size={18}
          className="text-[#FFF8F0]"
        />
      ) : (
        <FaSun
          size={18}
          className="text-[#E27500]"
        />
      )}
    </button>
  );
}