"use client";

import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  const languages = [
    { code: "en", label: "EN" },
    { code: "hi", label: "HI" },
    { code: "ja", label: "JP" },
    { code: "ar", label: "AR" },
  ];

  return (
    <div
      className={`
        flex
        h-[40px]
        items-center
        rounded-full
        px-2
        shadow-lg
        backdrop-blur-md
        transition-all
        duration-300
        ${
          theme === "dark"
            ? "bg-[#171A24] border border-[#2D3242]"
            : "bg-white border border-gray-300"
        }
      `}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          className={`
            flex
            h-[40px]
            min-w-[40px]
            items-center
            justify-center
            rounded-full
            text-[15px]
            font-semibold
            transition-all
            duration-300
            ${
              language === lang.code
                ? theme === "dark"
                  ? "bg-[#e27500] text-[#12161C] shadow-[0_0_20px_rgba(216,154,74,0.45)]"
                  : "bg-[#1E1E1E] text-white"
                : theme === "dark"
                ? "text-gray-300 hover:bg-[#252B39]"
                : "text-gray-600 hover:bg-gray-100"
            }
          `}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}