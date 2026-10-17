"use client";

import Image from "next/image";
import Background3D from "./Background3D";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";
import ScrollingSkills from "./ScrollingSkills";
export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[var(--background)]">

      <Background3D />
      <ScrollingSkills />

      {/* Top Navigation & Controls Bar */}
      <div className="absolute top-4 sm:top-8 md:top-10 left-3 sm:left-6 md:left-10 right-3 sm:right-6 md:right-10 z-30 flex items-center justify-between gap-2 pointer-events-none">
        {/* Top Left Controls (Languages and Theme switch) */}
        <div className="flex items-center gap-1.5 sm:gap-3 pointer-events-auto">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Top Right Social Links */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 pointer-events-auto">
          {/* X (formerly Twitter) */}
          <a
            href="https://x.com/prudhvireddy01"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] hover:text-[#E27500] hover:border-[#E27500] hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-md"
            aria-label="X (formerly Twitter)"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/prudhvi_reddy_3000/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] hover:text-[#E27500] hover:border-[#E27500] hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-md"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/prudhvi-reddy-billakurthi/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] hover:text-[#E27500] hover:border-[#E27500] hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-md"
            aria-label="LinkedIn"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Telegram */}
          <a
            href="https://web.telegram.org/k/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--text)] hover:text-[#E27500] hover:border-[#E27500] hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-md"
            aria-label="Telegram"
          >
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </a>
        </div>
      </div>

      {/* Left Small Text (Desktop only) */}
      <p className="hidden xl:block absolute top-75 left-53 z-20 text-sm font-light text-[var(--text-secondary)]">
        {t.hero.subtitle}
      </p>

      {/* Right Small Text (Desktop only) */}
      <p className="hidden xl:block absolute top-75 right-84 z-20 text-sm font-light text-[var(--text-secondary)]">
        B.Tech Data Science '27
      </p>

      {/* Location (Desktop only) */}
      <p className="hidden xl:block absolute top-106 right-85 z-20 text-xs font-light text-[var(--text-secondary)]">
        {t.hero.location}
      </p>

      {/* Huge Name */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1
          className="
            absolute
            left-3 sm:left-8 md:left-16 lg:left-32 xl:left-50
            top-1/2
            -translate-y-1/2
            select-none
            text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[120px] 2xl:text-[100px]
            font-black
            tracking-[-2px] sm:tracking-[-4px]
            text-[var(--text-primary)]
            opacity-50 md:opacity-100
            z-10
          "
        >
          PRUDHVI
        </h1>

        <h1
          className="
            absolute
            right-3 sm:right-8 md:right-16 lg:right-48 xl:right-80
            top-1/2
            -translate-y-1/2
            select-none
            text-4xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[135px] 2xl:text-[100px]
            font-black
            tracking-[-2px] sm:tracking-[-4px]
            text-[var(--text-primary)]
            opacity-50 md:opacity-100
            z-10
          "
        >
          REDDY
        </h1>
      </div>

      {/* Center Image */}
      <div className="absolute left-1/2 top-[52%] sm:top-[53%] z-20 -translate-x-1/2 -translate-y-1/2">
        <div
          className="
            relative
            h-[280px] w-[240px]
            sm:h-[320px] sm:w-[280px]
            md:h-[360px] md:w-[330px]
            overflow-hidden
            rounded-[28px] sm:rounded-[36px]
            bg-[var(--card)]
            shadow-[0_25px_60px_rgba(0,0,0,0.18)]
          "
        >
          <Image
            src="/profile.png"
            alt="Prudhvi Reddy"
            fill
            priority
            sizes="(max-width: 768px) 240px, (max-width: 1200px) 280px, 330px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Bottom Text */}
      <p
        className="
          absolute
          bottom-20 sm:bottom-28
          left-1/2
          z-20
          -translate-x-1/2
          uppercase
          tracking-[4px] sm:tracking-[8px]
          text-xs sm:text-[15px]
          text-[var(--text-secondary)]
          whitespace-nowrap
          text-center
          px-4
        "
      >
        {t.hero.role}
      </p>

    </section>
  );
}