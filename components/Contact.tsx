"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import FloatingHexagons from "./FloatingHexagons";

// Localized translations for the Contact section
const contactTranslations: Record<string, any> = {
  en: {
    heading: "LET'S CONNECT",
    description: "I'm always open to discussing new opportunities in Data Analysis, Data Engineering, and Business Intelligence.",
    emailBtn: "Email Me",
    linkedinBtn: "LinkedIn",
    githubBtn: "GitHub",
    badgesBtn: "Credly Badges",
    phone: "+91 9701062341",
    location: "Kakinada, Andhra Pradesh, India",
    helpBubble: "Can I help you?",
  },
  hi: {
    heading: "आइए जुड़ें",
    description: "मैं हमेशा डेटा विश्लेषण, डेटा इंजीनियरिंग और बिजनेस इंटेलिजेंस में नए अवसरों पर चर्चा करने के लिए तैयार हूं।",
    emailBtn: "ईमेल भेजें",
    linkedinBtn: "लिंक्डइन",
    githubBtn: "गिटहब",
    badgesBtn: "Credly Badges",
    phone: "+91 9701062341",
    location: "काकीनाडा, आंध्र प्रदेश, भारत",
    helpBubble: "क्या मैं आपकी मदद कर सकता हूं?",
  },
  ja: {
    heading: "つながりましょう",
    description: "データ分析、データエンジニアリング、ビジネスインテリジェンスに関する新しい機会についてのご相談をいつでもお待ちしています。",
    emailBtn: "Email Me",
    linkedinBtn: "LinkedIn",
    githubBtn: "GitHub",
    badgesBtn: "Credly Badges",
    phone: "+91 9701062341",
    location: "Kakinada, Andhra Pradesh, India",
    helpBubble: "お手伝いしましょうか？",
  },
  ar: {
    heading: "لنتواصل",
    description: "أنا دائمًا منفتح لمناقشة الفرص الجديدة في تحليل البيانات وهندسة البيانات وذكاء الأعمال.",
    emailBtn: "راسلني",
    linkedinBtn: "لينكد إن",
    githubBtn: "جيت هاب",
    badgesBtn: "شارات Credly",
    phone: "+91 9701062341",
    location: "كاكينادا، أندرا براديش، الهند",
    helpBubble: "هل يمكنني مساعدتك؟",
  }
};

export default function Contact() {
  const { language } = useLanguage();
  const t = contactTranslations[language] || contactTranslations.en;

  return (
    <section
      id="contact"
      className="relative w-full pt-20 pb-40 md:pb-48 overflow-hidden flex flex-col items-center bg-transparent"
    >
      {/* Background Floating Hexagons */}
      <FloatingHexagons />

      {/* Reduced Opacity Background Radial Ambient Glows */}
      <div
        className="absolute inset-0 pointer-events-none -z-20 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(138,43,226,0.12) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(20,184,166,0.1) 0%, transparent 55%)",
        }}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-[1280px] px-4 sm:px-8 mx-auto z-10 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full rounded-[32px] border border-[var(--border)] dark:border-white/10 bg-[var(--card)]/80 dark:bg-[#0B0C12]/90 p-8 sm:p-12 md:p-14 backdrop-blur-xl shadow-lg dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-center flex flex-col items-center justify-center"
        >
          {/* --- MAIN HEADING (48-56px on desktop, Spacing Heading -> Description: 12px) --- */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[var(--text-primary)] dark:text-white tracking-wide uppercase mb-3 select-none leading-tight">
            {t.heading}
          </h2>

          {/* --- DESCRIPTION PARAGRAPH (Max-width ~650px, Spacing Description -> Location: 12px) --- */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] dark:text-gray-400 font-normal leading-relaxed max-w-[650px] mx-auto mb-3 text-center select-none">
            {t.description}
          </p>

          {/* --- LOCATION TEXT (Plain text, small gray font, Spacing Location -> Buttons: 16px) --- */}
          <span className="text-xs sm:text-sm text-[var(--text-secondary)] dark:text-gray-500 font-medium tracking-wide mb-4 select-none block">
            {t.location}
          </span>

          {/* --- MAIN ACTION BUTTONS GRID (1 row on desktop, 2 columns on tablet, 1 column on mobile) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto z-10">
            {/* Email Me */}
            <motion.a
              href="mailto:billakurthiprudhvireddy@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full h-11 sm:h-12 rounded-full bg-white text-black border border-black/10 font-bold text-sm sm:text-base flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              {t.emailBtn}
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/prudhvi-reddy-billakurthi/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full h-11 sm:h-12 rounded-full bg-white text-black border border-black/10 font-bold text-sm sm:text-base flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              {t.linkedinBtn}
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/prudhvi05reddy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full h-11 sm:h-12 rounded-full bg-white text-black border border-black/10 font-bold text-sm sm:text-base flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              {t.githubBtn}
            </motion.a>

            {/* Credly Badges */}
            <motion.a
              href="https://www.linkedin.com/in/prudhvi-reddy-billakurthi/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full h-11 sm:h-12 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white font-bold text-sm sm:text-base flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.35)] hover:shadow-[0_0_22px_rgba(124,58,237,0.55)] transition-shadow duration-300 cursor-pointer"
            >
              {t.badgesBtn}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
