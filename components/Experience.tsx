"use client";

import { motion } from "framer-motion";
import FloatingHexagons from "./FloatingHexagons";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

// Localized translations for the Experience section (EN, HI, JA, AR)
const experienceTranslations: Record<string, any> = {
  en: {
    heading: "EXPERIENCE",
    items: [
      {
        id: "exp-01",
        role: "Data Science Intern",
        company: "Future Interns",
        duration: "Feb 2026 – Mar 2026",
        bullets: [
          "Successfully completed a Data Science internship focused on business analytics, data visualization, and dashboard development.",
          "Designed interactive Power BI dashboards to analyze sales performance, marketing campaigns, customer insights, and business KPIs.",
          "Performed data cleaning, transformation, data modeling, and visualization to generate meaningful business insights.",
          "Successfully completed all assigned projects and earned an Internship Completion Certificate for outstanding technical performance."
        ]
      },
      {
        id: "exp-02",
        role: "Data Specialist Intern",
        company: "Technical Hub",
        duration: "May 2025 – Jun 2025",
        bullets: [
          "Completed a Data Specialist internship with hands-on experience in Microsoft Excel, SharePoint, Power Automate, Outlook, and business process automation.",
          "Developed automated workflows for leave approvals, inventory management, coding progress tracking, and email notifications.",
          "Designed interactive Excel dashboards using Pivot Tables, Charts, Conditional Formatting, and advanced Excel functions.",
          "Integrated Microsoft Power Platform solutions to streamline workflows, improve productivity, and reduce manual effort."
        ]
      },
      {
        id: "exp-03",
        role: "Technical Trainee",
        company: "Technical Hub",
        duration: "Sep 2023 – Present",
        bullets: [
          "Undergoing continuous technical training in Java, Python, SQL, Data Structures & Algorithms, Cloud Computing, Artificial Intelligence, and Data Analytics.",
          "Built real-world projects using Power BI, SharePoint, Power Automate, AI, and Full Stack Web Development.",
          "Strengthened problem-solving skills by solving 600+ coding problems across LeetCode, HackerRank, and GeeksforGeeks.",
          "Actively enhancing problem-solving skills through hands-on practice and live projects."
        ]
      }
    ]
  },
  hi: {
    heading: "अनुभव",
    items: [
      {
        id: "exp-01",
        role: "डेटा साइंस इंटर्न",
        company: "फ़्यूचर इंटर्न्स",
        duration: "फरवरी 2026 - मार्च 2026",
        bullets: [
          "सफलतापूर्वक एक डेटा साइंस इंटर्नशिप पूरी की जो बिजनेस एनालिटिक्स, डेटा विज़ुअलाइज़ेशन और डैशबोर्ड विकास पर केंद्रित थी।",
          "बिक्री प्रदर्शन, विपणन अभियानों, ग्राहक अंतर्दृष्टि और व्यावसायिक KPI का विश्लेषण करने के लिए इंटरैक्टिव पावर बीआई डैशबोर्ड तैयार किए।",
          "सार्थक व्यावसायिक अंतर्दृष्टि उत्पन्न करने के लिए डेटा की सफाई, परिवर्तन, डेटा मॉडलिंग और विज़ुअलाइज़ेशन का प्रदर्शन किया।",
          "सभी सौंपे गए प्रोजेक्ट्स को सफलतापूर्वक पूरा किया और उत्कृष्ट तकनीकी प्रदर्शन के लिए इंटर्नशिप पूर्णता प्रमाणपत्र अर्जित किया।"
        ]
      },
      {
        id: "exp-02",
        role: "डेटा विशेषज्ञ इंटर्न",
        company: "टेक्निकल हब",
        duration: "मई 2025 - जून 2025",
        bullets: [
          "माइक्रोसॉफ्ट एक्सेल, शेयरपॉइंट, पावर ऑटोमेट, आउटलुक और बिजनेस प्रोसेस ऑटोमेशन में व्यावहारिक अनुभव के साथ एक डेटा विशेषज्ञ इंटर्नशिप पूरी की।",
          "छुट्टी की मंजूरी, सूची प्रबंधन, कोडिंग प्रगति ट्रैकिंग और ईमेल सूचनाओं के लिए स्वचालित वर्कफ़्लो विकसित किए।",
          "पिवट टेबल्स, चार्ट्स, कंडीशनल फॉर्मेटिंग और उन्नत एक्सेल फ़ंक्शंस का उपयोग करके इंटरैक्टिव एक्सेल डैशबोर्ड डिज़ाइन किए।",
          "वर्कफ़्लो को सुव्यवस्थित करने, उत्पादकता में सुधार करने और मैन्युअल प्रयास को कम करने के लिए माइक्रोसॉफ्ट पावर प्लेटफ़ॉर्म समाधानों को एकीकृत किया।"
        ]
      },
      {
        id: "exp-03",
        role: "तकनीकी प्रशिक्षु",
        company: "टेक्निकल हब",
        duration: "सितंबर 2023 - वर्तमान",
        bullets: [
          "जावा, पायथन, एसक्यूएल, डेटा स्ट्रक्चर और एल्गोरिदम, क्लाउड कंप्यूटिंग, आर्टिफिशियल इंटेलिजेंस और डेटा एनालिटिक्स में निरंतर तकनीकी प्रशिक्षण प्राप्त कर रहे हैं।",
          "पावर बीआई, शेयरपॉइंट, पावर ऑटोमेट, एआई और फुल स्टैक वेब डेवलपमेंट का उपयोग करके वास्तविक दुनिया के प्रोजेक्ट बनाए।",
          "लीटकोड, हैकररैंक और गीक्सफॉरगीक्स पर 600+ कोडिंग समस्याओं को हल करके समस्या-समाधान कौशल को मजबूत किया।",
          "व्यावहारिक परियोजनाओं और उद्योग-केंद्रित प्रशिक्षण के माध्यम से तकनीकी विशेषज्ञता बढ़ाते हुए कोडिंग कौशल को लगातार मजबूत कर रहे हैं।"
        ]
      }
    ]
  },
  ja: {
    heading: "職歴",
    items: [
      {
        id: "exp-01",
        role: "データサイエンス インターン",
        company: "Future Interns",
        duration: "2026年2月 – 2026年3月",
        bullets: [
          "ビジネス分析、データ可視化、およびダッシュボード開発に焦点を当てたデータサイエンスインターンシップを無事に完了しました。",
          "売上パフォーマンス、マーケティングキャンペーン、顧客インサイト、およびビジネスKPIを分析するためのインタラクティブなPower BIダッシュボードを設計しました。",
          "有意義なビジネスインサイトを生成するために、データのクレンジング、変換、データモデリング、および可視化を実行しました。",
          "割り当てられたすべてのプロジェクトを無事に完了し、卓越した技術的パフォーマンスに対してインターンシップ修了証明書を獲得しました。"
        ]
      },
      {
        id: "exp-02",
        role: "データスペシャリスト インターン",
        company: "Technical Hub",
        duration: "2025年5月 – 2025年6月",
        bullets: [
          "Microsoft Excel、SharePoint、Power Automate、Outlook、およびビジネスプロセス自動化の実務経験を持つデータスペシャリストインターンシップを修了しました。",
          "休暇申請、在庫管理、コーディング進捗追跡、およびメール通知のための自動化ワークフローを開発しました。",
          "ピボットテーブル、グラフ、条件付き書式、および高度なExcel関数を使用して、インタラクティブなExcelダッシュボードを設計しました。",
          "ワークフローを合理化し、生産性を向上させ、手動の労力を削減するために、Microsoft Power Platformソリューションを統合しました。"
        ]
      },
      {
        id: "exp-03",
        role: "技術トレーニー",
        company: "Technical Hub",
        duration: "2023年9月 – 現在",
        bullets: [
          "Java、Python、SQL、データ構造とアルゴリズム、クラウドコンピューティング、人工知能、およびデータ分析の継続的な技術トレーニングを受けています。",
          "Power BI、SharePoint、Power Automate、AI、およびフルスタックWeb開発を使用して、実際のプロジェクトを構築しました。",
          "LeetCode、HackerRank、GeeksforGeeksで600以上のコーディング問題を解くことで、問題解決能力を強化しました。",
          "実践的なコーディング演習とライブプロジェクトを通じて、問題解決能力を積極的に強化しています。"
        ]
      }
    ]
  },
  ar: {
    heading: "الخبرة العملية",
    items: [
      {
        id: "exp-01",
        role: "متدرب في علم البيانات",
        company: "Future Interns",
        duration: "فبراير 2026 – مارس 2026",
        bullets: [
          "أكملت بنجاح فترة تدريب في علم البيانات تركز على تحليلات الأعمال وتصور البيانات وتطوير لوحات المعلومات.",
          "تصميم لوحات معلومات Power BI تفاعلية لتحليل أداء المبيعات وحملات التسويق ورؤى العملاء ومؤشرات الأداء الرئيسية للأعمال.",
          "إجراء تنظيف البيانات وتحويلها ونمذجة البيانات وتصورها لإنتاج رؤى تجارية قيمة.",
          "أكملت بنجاح جميع المشاريع المسندة وحصلت على شهادة إتمام التدريب للأداء التقني المتميز."
        ]
      },
      {
        id: "exp-02",
        role: "متدرب أخصائي بيانات",
        company: "Technical Hub",
        duration: "مايو 2025 – يونيو 2025",
        bullets: [
          "أكملت تدريب أخصائي بيانات مع خبرة عملية في إكسل وشيربوينت وباور أوتوميت وأوتلوك وأتمتة العمليات التجارية.",
          "تطوير مسارات عمل مؤتمتة للموافقات على الإجازات وإدارة المخزون وتتبع تقدم البرمجة وإشعارات البريد الإلكتروني.",
          "تصميم لوحات معلومات تفاعلية في إكسل باستخدام الجداول المحورية والمخططات والتنسيق الشرطي ووظائف إكسل المتقدمة.",
          "دمج حلول Microsoft Power Platform لتبسيط مسارات العمل وتحسين الإنتاجية وتقليل الجهد اليدوي."
        ]
      },
      {
        id: "exp-03",
        role: "متدرب تقني",
        company: "Technical Hub",
        duration: "سبتمبر 2023 – الحالي",
        bullets: [
          "خضعت لتدريب تقني مستمر في لغات جافا وبايثون وإس كيو إل وبنية البيانات والخوارزميات والحوسبة السحابية والذكاء الاصطناعي وتحليل البيانات.",
          "بناء مشاريع واقعية باستخدام Power BI وشيربوينت وباور أوتوميت والذكاء الاصطناعي وتطوير الويب المتكامل.",
          "تعزيز مهارات حل المشكلات من خلال حل أكثر من 600 مسألة برمجية عبر منصات LeetCode وHackerRank وGeeksforGeeks.",
          "تعزيز مهارات حل المشكلات بنشاط من خلال الممارسة العملية والمشاريع الحية."
        ]
      }
    ]
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Experience() {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const tExp = experienceTranslations[language] || experienceTranslations.en;
  const isRtl = language === "ar";

  return (
    <section
      id="experience"
      className={`relative w-full pt-32 pb-48 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
        theme === "light" 
          ? "bg-[#F9F6F0] border-y border-[var(--border)]/20" 
          : "bg-transparent border-none"
      }`}
    >
      {/* Background hexagon grids and low-opacity depth elements */}
      <FloatingHexagons />

      <div
        className="absolute inset-0 pointer-events-none -z-20 select-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(245,158,11,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/5 dark:bg-[#F59E0B]/4 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[380px] h-[380px] rounded-full bg-[#8A2BE2]/5 dark:bg-[#8A2BE2]/3 blur-[110px] pointer-events-none -z-10" />

      {/* Grid Container centered exactly on screen */}
      <div className="relative w-full max-w-[1250px] px-6 sm:px-12 lg:px-16 mx-auto z-10 flex flex-col">
        
        {/* Center Section Title with bold tracking and a centered thin orange underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full mb-16 select-none flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-2xl sm:text-3xl uppercase tracking-[8px] text-[var(--text-primary)] font-extrabold">
            {tExp.heading}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 h-[2px] w-24 bg-[#F59E0B] mx-auto"
          />
        </motion.div>

        {/* Separated Cards Stack - Generous vertical spacing of 48px to 64px */}
        <div className="relative w-full flex flex-col gap-12 md:gap-14 lg:gap-16">
          {tExp.items.map((item: any, index: number) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.12 }}
              
              // Interactive spring hover physics: slides DOWN on touch/hover
              whileHover={{
                y: 8, // Positive y moves the card downwards
                scale: 0.992,
                transition: { type: "spring", stiffness: 350, damping: 24 },
              }}
              whileTap={{
                y: 12,
                scale: 0.985,
              }}
              
              className="group relative w-full rounded-[24px] border border-[var(--border)] dark:border-[#F59E0B]/12 bg-[var(--card)]/90 dark:bg-[#0B0B0F]/90 p-8 sm:p-10 lg:p-12 overflow-hidden cursor-default select-none shadow-[0_4px_28px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.06)] dark:hover:shadow-[0_0_45px_rgba(245,158,11,0.1)] hover:border-[#F59E0B]/35 dark:hover:border-[#F59E0B]/40 transition-[box-shadow,border-color] duration-500 backdrop-blur-sm"
            >
              {/* Large, transparent backdrop index numbers on the right side */}
              <span
                className={`absolute top-1/2 -translate-y-1/2 text-5xl sm:text-6xl lg:text-7xl font-black text-[#F59E0B]/6 group-hover:text-[#F59E0B]/12 transition-all duration-500 select-none leading-none pointer-events-none ${
                  isRtl ? "left-8 sm:left-12 lg:left-16" : "right-8 sm:right-12 lg:right-16"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Card Contents Wrapper with generous visual padding */}
              <div
                className={`relative w-full ${isRtl ? "text-right" : "text-left"}`}
                dir={isRtl ? "rtl" : "ltr"}
              >
                {/* Header Row: Title, Company & Dates */}
                <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between w-full gap-2 mb-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[#F59E0B] transition-colors duration-300 tracking-tight leading-snug">
                      {item.role}
                    </h3>
                    <h4 className="text-sm sm:text-base font-semibold text-[#F59E0B] mt-1 select-none">
                      {item.company}
                    </h4>
                  </div>
                  <span className="text-sm sm:text-base font-semibold tracking-wide text-[#F59E0B] whitespace-nowrap shrink-0 lg:text-right select-none">
                    {item.duration}
                  </span>
                </div>

                {/* Bullet Points with Orange Circle Markers & Clean Indent spacing */}
                <ul className="mt-6 space-y-4">
                  {item.bullets.map((bullet: string, i: number) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.15 + i * 0.05 }}
                      className="flex gap-4 items-start text-sm sm:text-[15px] md:text-base leading-relaxed text-[var(--text-secondary)]"
                    >
                      {/* Custom orange bullet marker dot */}
                      <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0 select-none" />
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
