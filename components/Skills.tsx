"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeContext";

// Localized translations for the Skills & Certifications section
const skillsTranslations: Record<string, any> = {
  en: {
    heading: "SKILLS & CERTIFICATIONS",
    certHeading: "Certifications 📜",
    modalTitle: "PROFESSIONAL CERTIFICATES",
    modalDesc: "A collection of professional certificates I have acquired to enhance my skills across various technical domains.",
    groupCloud: "Cloud",
    groupOracle: "Oracle",
    groupCisco: "Cisco Networking Academy",
    groupWebDev: "HTML/CSS & Web Development",
  },
  hi: {
    heading: "कौशल और प्रमाणपत्र",
    certHeading: "प्रमाणपत्र 📜",
    modalTitle: "पेशेवर प्रमाणपत्र",
    modalDesc: "विभिन्न तकनीकी डोमेन में अपने कौशल को बढ़ाने के लिए मेरे द्वारा प्राप्त किए गए पेशेवर प्रमाणपत्रों का एक संग्रह।",
    groupCloud: "क्लाउड",
    groupOracle: "ओरेकल",
    groupCisco: "सिस्को नेटवर्किंग अकादमी",
    groupWebDev: "HTML/CSS और वेब विकास",
  },
  ja: {
    heading: "スキルと認定",
    certHeading: "認定証 📜",
    modalTitle: "プロフェッショナル認定資格",
    modalDesc: "さまざまな技術分野でスキルを向上させるために取得したプロフェッショナル認定資格のコレクション。",
    groupCloud: "クラウド",
    groupOracle: "Oracle",
    groupCisco: "Ciscoネットワーキングアカデミー",
    groupWebDev: "HTML/CSS & Web開発",
  },
  ar: {
    heading: "المهارات والشهادات",
    certHeading: "الشهادات 📜",
    modalTitle: "الشهادات المهنية",
    modalDesc: "مجموعة من الشهادات المهنية التي حصلت عليها لتعزيز مهاراتي عبر مختلف المجالات التقنية.",
    groupCloud: "الحوسبة السحابية",
    groupOracle: "أوراكل",
    groupCisco: "أكاديمية سيسكو للشبكات",
    groupWebDev: "HTML/CSS وتطوير الويب",
  }
};

// Skill Categories for Left Column
const leftColumnCategories: Record<string, any[]> = {
  en: [
    {
      title: " • Top Expertise",
      skills: ["   Java", "SharePoint", "Microsoft Power BI", "SQL"]
    },
    {
      title: " • Programming & Data",
      skills: ["Python", "Java", "SQL", "Data Cleaning", "Exploratory Data Analysis (EDA)"]
    },
    {
      title: " • Visualization & BI",
      skills: ["Microsoft Power BI", "Excel Dashboards", "SharePoint (Lists & Sites)", "Outlook Integration", "Power Apps"]
    }
  ],
  hi: [
    {
      title: " • शीर्ष विशेषज्ञता",
      skills: ["डेटा इंजीनियरिंग", "डेटा विश्लेषण", "माइक्रोसॉफ्ट पावर बीआई"]
    },
    {
      title: " • प्रोग्रामिंग और डेटा",
      skills: ["पायथन", "जावा", "एसक्यूएल", "डेटा सफाई", "खोजपूर्ण डेटा विश्लेषण (EDA)"]
    },
    {
      title: " • विज़ुअलाइज़ेशन और बीआई",
      skills: ["माइक्रोसॉफ्ट पावर बीआई", "एक्सेल डैशबोर्ड", "शेयरपॉइंट (सूचियां और साइटें)", "आउटलुक एकीकरण", "पावर ऐप्स"]
    }
  ],
  ja: [
    {
      title: " • 主な専門分野",
      skills: ["データエンジニアリング", "データ分析", "Microsoft Power BI"]
    },
    {
      title: " • プログラミング & データ",
      skills: ["Python", "Java", "SQL", "データクレンジング", "探索的データ分析 (EDA)"]
    },
    {
      title: " • 可視化 & BI",
      skills: ["Microsoft Power BI", "Excelダッシュボード", "SharePoint (リスト & サイト)", "Outlook連携", "Power Apps"]
    }
  ],
  ar: [
    {
      title: " • الخبرة الأساسية",
      skills: ["هندسة البيانات", "تحليل البيانات", "مايكروسوفت باور بي آي"]
    },
    {
      title: " • البرمجة والبيانات",
      skills: ["بايثون", "جافا", "إس كيو إل", "تنظيف البيانات", "تحليل البيانات الاستكشافية (EDA)"]
    },
    {
      title: " • تصور البيانات وذكاء الأعمال",
      skills: ["مايكروسوفت باور بي آي", "لوحات معلومات إكسل", "شيربوينت (القوائم والمواقع)", "تكامل أوتلوك", "باور أبس"]
    }
  ]
};

// Skill Categories for Right Column
const rightColumnCategories: Record<string, any[]> = {
  en: [
    {
      title: " • Cloud Platforms",
      skills: ["Snowflake", "Google Cloud Platform (GCP)", "Amazon Web Services (AWS)"]
    },
    {
      title: " • AI & Automation",
      skills: ["Power Automate (Cloud Flows)", "ChatGPT Prompting", "AI System Integration", "GitHub Copilot"]
    }
  ],
  hi: [
    {
      title: " • क्लाउड प्लेटफॉर्म",
      skills: ["स्नोफ्लेक", "गूगल क्लाउड प्लेटफॉर्म (GCP)", "अमेज़न वेब सर्विसेज (AWS)"]
    },
    {
      title: " • एी और स्वचालन",
      skills: ["पावर ऑटोमेट (क्लाउड फ्लो)", "चैटजीपीटी प्रॉम्प्टिंग", "एआई सिस्टम एकीकरण", "गिटहब कोपायलट"]
    }
  ],
  ja: [
    {
      title: " • クラウドプラットフォーム",
      skills: ["Snowflake", "Google Cloud Platform (GCP)", "Amazon Web Services (AWS)"]
    },
    {
      title: " • AI & 自動化",
      skills: ["Power Automate (クラウドフロー)", "ChatGPTプロンプト", "AIシステム連携", "GitHub Copilot"]
    }
  ],
  ar: [
    {
      title: " • منصات السحاب",
      skills: ["سنوفليك", "منصة جوجل السحابية (GCP)", "أمازون لخدمات الويب (AWS)"]
    },
    {
      title: " • الذكاء الاصطناعي والأتمتة",
      skills: ["باور أوتوميت (تدفقات السحاب)", "تلقين ChatGPT", "تكامل أنظمة الذكاء الاصطناعي", "جيت هاب كوبايلوت"]
    }
  ]
};

// Certifications List (Renders as bullet items, matches user mockup text)
const certificationsList = [
  {
    id: "cert-snowflake",
    title: "SnowPro Associate: Platform",
    issuer: "Snowflake"
  },
  {
    id: "cert-oracle-db",
    title: "Oracle Certified Foundations Associate – Database",
    issuer: "Oracle"
  },
  {
    id: "cert-oracle-java",
    title: "Oracle Java Certified Foundations Associate",
    issuer: "Oracle"
  },
  {
    id: "cert-cisco",
    title: "Cisco Networking Academy",
    issuer: "Cisco"
  },
  {
    id: "cert-html-css",
    title: "Information Technology Specialist - HTML/CSS",
    issuer: "Pearson / Certiport"
  },
];

// Inner Hexagon SVG Background Component
function Hexagon({
  className,
  size = 120,
  delay = 0,
  opacity = 0.05,
}: {
  className?: string;
  size?: number;
  delay?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity, scale: 1 }}
      animate={{
        y: [0, 8, 0],
        rotate: [0, 2, 0],
      }}
      transition={{
        y: { duration: 11 + delay * 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 17 + delay * 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 1, delay },
      }}
      viewport={{ once: true }}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#F59E0B]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{ filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.15))" }}
      >
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
      </svg>
    </motion.div>
  );
}

export default function Skills() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [stars, setStars] = useState<{ id: number; left: string; top: string; size: number; delay: number; duration: number }[]>([]);

  const tSkills = skillsTranslations[language] || skillsTranslations.en;
  const leftCats = leftColumnCategories[language] || leftColumnCategories.en;
  const rightCats = rightColumnCategories[language] || rightColumnCategories.en;
  const isRtl = language === "ar";

  // Prevent Next.js hydration mismatch for twinkling background elements
  useEffect(() => {
    const generatedStars = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 1.2,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  // Keyboard escape key modal listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <section
      id="skills"
      className={`relative w-full pt-32 pb-48 flex flex-col items-center justify-center overflow-visible transition-colors duration-500 ${theme === "light"
        ? "bg-[#F5F2EB] border-b border-[var(--border)]/20"
        : "bg-transparent border-none"
        }`}
    >
      {/* --- CYBER STARFIELD & GRID BACKGROUND --- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.035] -z-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--text-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px"
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white dark:bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `skills-twinkle ${star.duration}s infinite ease-in-out`,
              animationDelay: `${star.delay}s`,
              boxShadow: star.size > 2 ? "0 0 6px rgba(255, 255, 255, 0.5)" : "none",
            }}
          />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes skills-twinkle {
            0%, 100% { opacity: 0.15; transform: scale(0.9); }
            50% { opacity: 0.85; transform: scale(1.1); }
          }
        `
      }} />

      {/* Hexagons Background (Thin outlines, 4-7% opacity, soft glows) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none">
        <div className="absolute top-[-4%] left-[-3%] w-[250px] h-[250px] rounded-full bg-[#F59E0B]/3 dark:bg-[#F59E0B]/2.5 blur-[70px] pointer-events-none -z-20" />
        <div className="absolute bottom-[-3%] left-[5%] w-[280px] h-[280px] rounded-full bg-[#F59E0B]/3 dark:bg-[#F59E0B]/2 blur-[75px] pointer-events-none -z-20" />

        <Hexagon className="top-[-4%] left-[-3%]" size={180} delay={0} opacity={0.06} />
        <Hexagon className="top-[18%] right-[-5%]" size={220} delay={0.2} opacity={0.05} />
        <Hexagon className="top-[45%] left-[-4%]" size={140} delay={0.4} opacity={0.04} />
        <Hexagon className="bottom-[-3%] left-[5%]" size={200} delay={0.6} opacity={0.06} />
        <Hexagon className="bottom-[12%] right-[-3%]" size={160} delay={0.8} opacity={0.05} />
      </div>

      {/* Main container centered */}
      <div className="relative w-full max-w-[1280px] px-6 sm:px-12 lg:px-16 mx-auto z-20 overflow-visible">

        {/* Unified Glassmorphic Panel Card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{
            boxShadow: "0 0 35px rgba(245, 158, 11, 0.04)",
          }}
          className="relative w-full rounded-[24px] border border-[var(--border)] dark:border-[#F59E0B]/12 bg-[var(--card)]/90 dark:bg-[#0B0B0F]/90 p-10 sm:p-16 lg:p-20 pb-20 sm:pb-28 lg:pb-32 backdrop-blur-xl overflow-visible shadow-lg dark:shadow-2xl transition-[box-shadow] duration-500"
        >
          {/* Header Title with centered Underline */}
          <div className="relative mb-16 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[7px] uppercase text-[var(--text-primary)] relative z-10 select-none">
              {tSkills.heading}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 h-[2px] w-28 bg-[#F59E0B] mx-auto"
            />
          </div>

          {/* Two-Column Grid layout matching user original structure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12">

            {/* LEFT COLUMN - Top Expertise, Programming & Data, Visualization & BI */}
            <div className="flex flex-col gap-10">
              {leftCats.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col ${isRtl ? "text-right" : "text-left"}`}
                >
                  <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-5 select-none">
                    {cat.title}
                  </h3>

                  {/* Skill pill chips */}
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill: string, i: number) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.03 }}
                        className="px-4 py-2 rounded-full text-sm md:text-base font-light tracking-wide bg-[var(--card)]/60 dark:bg-white/[0.02] border border-[var(--border)] dark:border-white/5 text-[var(--text-secondary)] hover:text-[#F59E0B] hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all duration-300 cursor-default select-none"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT COLUMN - Cloud Platforms, AI & Automation, Certifications */}
            <div className="flex flex-col gap-10">
              {rightCats.map((cat, index) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                  className={`flex flex-col ${isRtl ? "text-right" : "text-left"}`}
                >
                  <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-5 select-none">
                    {cat.title}
                  </h3>

                  {/* Skill pill chips */}
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map((skill: string, i: number) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.03 }}
                        className="px-4 py-2 rounded-full text-sm md:text-base font-light tracking-wide bg-[var(--card)]/60 dark:bg-white/[0.02] border border-[var(--border)] dark:border-white/5 text-[var(--text-secondary)] hover:text-[#F59E0B] hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all duration-300 cursor-default select-none"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Certifications Category with Header clickable button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className={`flex flex-col ${isRtl ? "text-right" : "text-left"}`}
              >
                {/* Certifications Header styled as plain text link */}
                <div className="flex justify-start mb-5 select-none">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-lg md:text-xl font-bold text-[#F59E0B] hover:text-[#F59E0B]/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer bg-transparent border-none p-0 outline-none focus:outline-none"
                  >
                    <span>{tSkills.certHeading}</span>
                  </button>
                </div>

                {/* Bullets List (Google Prompt, Learning REST, Docker Foundations) */}
                <ul className={`space-y-3.5 list-disc text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-light ${isRtl ? "pr-5 pl-0" : "pl-5 pr-0"
                  }`}>
                  {certificationsList.map((cert) => (
                    <li
                      key={cert.id}
                      className="hover:text-[#F59E0B] transition-colors duration-300 cursor-pointer"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {cert.title} {cert.issuer ? `(${cert.issuer})` : ""}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* --- PROFESSIONAL CERTIFICATES MODAL POPUP --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => { setIsModalOpen(false); setSelectedPdf(null); }}
          >
            {/* Modal Container Panel - Original size (max-w-7xl) with generous horizontal padding on all children to prevent touching borders */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative w-full max-w-6xl max-h-[85vh] overflow-y-auto rounded-[26px] border border-[var(--border)] dark:border-[#F59E0B]/15 bg-[var(--card)] dark:bg-[#0B0B0F]/95 shadow-2xl [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#F59E0B]/20 dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#F59E0B]/40 [&::-webkit-scrollbar-thumb]:rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button (Positioned inside padded zone) */}
              <button
                onClick={() => { setIsModalOpen(false); setSelectedPdf(null); }}
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[var(--border)] dark:border-white/10 hover:border-[#F59E0B]/40 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--card)] dark:bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer z-10"
                aria-label="Close modal"
              >
                ✕
              </button>

              {selectedPdf ? (
                /* --- INTERACTIVE PDF VIEWER LAYER --- */
                <div className="flex flex-col h-[65vh] w-full px-8 sm:px-16 lg:px-24">
                  {/* PDF Header with Back Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-[var(--border)] dark:border-white/5 pb-4">
                    <button
                      onClick={() => setSelectedPdf(null)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border)] dark:border-white/10 hover:border-[#F59E0B] text-[var(--text-primary)] hover:text-[#F59E0B] bg-[var(--card)] dark:bg-white/5 transition-all duration-300 cursor-pointer text-sm font-semibold w-fit"
                    >
                      ← Back to Catalog
                    </button>
                    <span className="text-xs tracking-wider uppercase text-[var(--text-secondary)] font-mono">
                      Official Verified PDF Document
                    </span>
                  </div>
                  {/* PDF iframe Container */}
                  <div className="flex-1 w-full bg-black/15 dark:bg-black/40 rounded-2xl overflow-hidden border border-[var(--border)] dark:border-white/10 shadow-inner">
                    <iframe
                      src={selectedPdf}
                      className="w-full h-full border-none"
                      title="Certificate PDF Viewer"
                    />
                  </div>
                </div>
              ) : (
                /* --- MAIN CERTIFICATE CATALOG GRID --- */
                <div className="w-full px-8 sm:px-12 md:px-16 lg:px-24 py-12 md:py-16">
                  {/* Title & Description */}
                  <div className="mb-8 pr-10 text-left">
                    <h3 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
                      {tSkills.modalTitle}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 font-light">
                      {tSkills.modalDesc}
                    </p>

                    {/* Center Badge Button */}
                    <div className="mt-8 flex justify-center">
                      <a
                        href="https://www.credly.com/users/prudhvireddy/edit/badges/credly"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full border border-[#8A2BE2]/30 hover:border-[#8A2BE2] text-[#8A2BE2] dark:text-purple-400 bg-[#8A2BE2]/5 hover:bg-[#8A2BE2]/10 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(138,43,226,0.06)]"
                      >
                        <span>🔗</span>
                        <span>View Verified Credly Badges</span>
                      </a>
                    </div>
                  </div>

                  {/* Certificates grouped by organization */}
                  <div className="flex flex-col gap-10 text-left mt-10">

                    {/* Snowflake */}
                    <div className="border-t border-[var(--border)] dark:border-white/5 pt-8">
                      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 select-none">
                        Snowflake
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-[#F59E0B]/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                          onClick={() => setSelectedPdf("/certificates/snowflake_platform.pdf")}
                        >
                          <img src="/certificates/snowflake_platform.png" alt="SnowPro Associate: Platform" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Oracle */}
                    <div className="border-t border-[var(--border)] dark:border-white/5 pt-8">
                      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 select-none">
                        Oracle
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-blue-500/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/oracle_database.png" alt="Oracle Certified Foundations Associate – Database" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-orange-500/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/oracle_java.png" alt="Oracle Java Certified Foundations Associate" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Cisco Networking Academy */}
                    <div className="border-t border-[var(--border)] dark:border-white/5 pt-8">
                      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 select-none">
                        Cisco Networking Academy
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-green-500/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                          onClick={() => setSelectedPdf("/certificates/cisco_data_analytics.pdf")}
                        >
                          <img src="/certificates/cisco_data_analytics.png" alt="Data Analytics Essentials" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-blue-500/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                          onClick={() => setSelectedPdf("/certificates/cisco_data_science.pdf")}
                        >
                          <img src="/certificates/cisco_data_science.png" alt="Introduction to Data Science" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-indigo-500/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                          onClick={() => setSelectedPdf("/certificates/cisco_apply_ai.pdf")}
                        >
                          <img src="/certificates/cisco_apply_ai.png" alt="Apply AI: Analyze Customer Reviews" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Certiport & Pearson */}
                    <div className="border-t border-[var(--border)] dark:border-white/5 pt-8">
                      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 select-none">
                        Certiport & Pearson
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-pink-500/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                          onClick={() => setSelectedPdf("/certificates/html_css.pdf")}
                        >
                          <img src="/certificates/html_css.png" alt="Information Technology Specialist - HTML and CSS" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn Learning */}
                    <div className="border-t border-[var(--border)] dark:border-white/5 pt-8">
                      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 select-none">
                        LinkedIn Learning
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-blue-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/linkedin_docker.png" alt="Docker Foundations Professional Certificate" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-blue-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/linkedin_react.png" alt="React Essential Training" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-blue-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/linkedin_kubernetes.png" alt="Kubernetes: Microservices" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Anthropic */}
                    <div className="border-t border-[var(--border)] dark:border-white/5 pt-8">
                      <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-8 select-none">
                        Anthropic
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-purple-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/anthropic_claude_api.png" alt="Claude with the Anthropic API" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-purple-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/anthropic_claude_code.png" alt="Claude Code in Action" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-purple-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/anthropic_mcp.png" alt="Introduction to Model Context Protocol" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                        <div
                          className="rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/50 dark:bg-[#0B0B0F] p-6 flex items-center justify-center hover:border-purple-400/50 hover:shadow-2xl hover:-translate-y-2 active:scale-95 active:translate-y-0 transition-all duration-300 cursor-pointer group max-w-[400px] w-full"
                        >
                          <img src="/certificates/anthropic_agent_skills.png" alt="Introduction to agent skills" className="w-[85%] h-auto rounded-xl object-contain group-hover:scale-105 group-active:scale-95 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
