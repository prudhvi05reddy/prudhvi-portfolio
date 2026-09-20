"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const revealTranslations: Record<string, string> = {
  en: "From analyzing data to developing intelligent applications, I enjoy building solutions that combine analytics, AI, and modern software engineering. Every project is driven by curiosity, innovation, and measurable impact.",
  hi: "मैं रणनीति और नवाचार के आधार पर संस्थापकों, उत्पाद टीमों, कंपनियों और ब्रांडों के साथ काम करता हूँ। मैं एक लक्ष्य निर्धारित करता हूँ, फालतू शोर को हटाता हूँ, और काम पूरा करता हूँ। जब काम हो जाता है, तो परिणाम केवल डिजाइन नहीं होता, बल्कि लाइव और मापा हुआ होता है।",
  ja: "私は戦略とイノベーションに基づいて、創業者、プロダクトチーム、企業、ブランドと協働しています。一つの目標を設定し、雑音を排除し、迅速に行動します。仕事が完了したとき、結果はただデザインされるだけでなく、稼働し、測定されます。",
  ar: "أعمل مع المؤسسين، وفرق المنتجات، والشركات، والعلامات التجارية بناءً على الاستراتيجية والابتكار. أضع هدفاً واحداً، وألغي التشويش، وأتحرك بسرعة. عندما تكتمل المهمة، تكون النتيجة حية ومقاسة، وليس مجرد تصميم."
};

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.12, 1]);

  return (
    <span className="relative inline-block select-none">
      <span className="absolute inset-0 text-[var(--text-primary)] opacity-[0.12]">
        {children}
      </span>
      <motion.span style={{ opacity }} className="relative text-[var(--text-primary)] font-bold">
        {children}
      </motion.span>
    </span>
  );
}

export default function TextReveal() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const text = revealTranslations[language] || revealTranslations.en;
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  });

  const isRtl = language === "ar";

  return (
    <section
      ref={containerRef}
      className="relative w-full flex items-center justify-center py-36 md:py-48 lg:py-52 bg-transparent"
    >
      <div
        className={`w-full max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-24 mx-auto ${
          isRtl ? "text-right" : "text-left"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <p className="text-4xl md:text-5xl lg:text-[50px] font-bold leading-[1.32] tracking-[-0.02em] text-[var(--text-primary)] select-none">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <span
                key={i}
                className="inline-block mb-1 md:mb-2"
                style={{
                  marginRight: isRtl ? 0 : "0.28em",
                  marginLeft: isRtl ? "0.28em" : 0,
                }}
              >
                <Word progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
