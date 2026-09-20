"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";

interface Project {
  id: string;
  title: string;
  description: string;
  painPoint: string;
  strategy: string;
  value: string;
  gitRepo: string | null;
  tech: string[];
  color: string;
  icon: React.ReactNode;
}

// Localized Text Database for General About Section
const aboutTranslations: Record<string, any> = {
  en: {
    tagline: "ABOUT ME",
    title: "The Developer Behind The Code.",
    desc1: "I'm Prudhvi Reddy, a passionate Data Science undergraduate focused on building modern web applications, AI-powered solutions and premium digital experiences.",
    desc2: "I enjoy transforming ideas into real products through Full Stack Development, Artificial Intelligence, Cloud Technologies and Data Analytics while constantly learning new technologies.",
    desc3: "My goal is to become a Software Engineer who combines clean design, strong technical knowledge and AI to build products that people genuinely enjoy using.",
    resume: "Resume",
    viewCase: "View Case",
    challenge: "CHALLENGE",
    solution: "SOLUTION",
    impact: "BUSINESS IMPACT",
    close: "Close"
  },
  hi: {
    tagline: "मेरे बारे में",
    title: "कोड के पीछे का डेवलपर।",
    desc1: "मैं पृथ्वी रेड्डी हूँ, एक उत्साही डेटा साइंस स्नातक छात्र जो आधुनिक वेब एप्लिकेशन, एआई-संचालित समाधान और प्रीमियम डिजिटल अनुभव बनाने पर ध्यान केंद्रित कर रहा हूँ।",
    desc2: "मुझे लगातार नई तकनीकों को सीखते हुए फुल स्टैक डेवलपमेंट, आर्टिफिशियल इंटेलिजेंस, क्लाउड टेक्नोलॉजीज और डेटा एनालिटिक्स के माध्यम से विचारों को वास्तविक उत्पादों में बदलना पसंद है।",
    desc3: "मेरा लक्ष्य एक ऐसा सॉफ्टवेयर इंजीनियर बनना है जो लोगों को पसंद आने वाले उत्पाद बनाने के लिए स्वच्छ डिजाइन, मजबूत तकनीकी ज्ञान और एआई को जोड़ता है।",
    resume: "बायोडाटा",
    viewCase: "केस देखें",
    challenge: "चुनौती",
    solution: "समाधान",
    impact: "व्यावसायिक प्रभाव",
    close: "बंद करें"
  },
  ja: {
    tagline: "自己紹介",
    title: "コードの背後にいる開発者。",
    desc1: "私はプルドヴィ・レディです。モダンなWebアプリケーション、AI駆動型ソリューション、プレミアムなデジタル体験の構築に注力している、情熱的なデータサイエンスの学部生です。",
    desc2: "フルスタック開発、人工知能、クラウド技術、データ分析を通じて、常に新しい技術を学びながら、アイデアを実際の製品に変えることを楽しんでいます。",
    desc3: "私の目標は、クリーンなデザイン、強力な技術知識、AIを組み合わせて、人々が心から楽しんで使える製品を作るソフトウェアエンジニアになることです。",
    resume: "履歴書",
    viewCase: "ケースを見る",
    challenge: "課題",
    solution: "解決策",
    impact: "ビジネス効果",
    close: "閉じる"
  },
  ar: {
    tagline: "نبذة عني",
    title: "المطور الذي يقف وراء الكود.",
    desc1: "أنا برودهفي ريدي، طالب جامعي شغوف في علم البيانات أركز على بناء تطبيقات الويب الحديثة، والحلول المدعومة بالذكاء الاصطناعي، والتجارب الرقمية المتميزة.",
    desc2: "أستمتع بتحويل الأفكار إلى منتجات حقيقية من خلال تطوير الويب الشامل، والذكاء الاصطناعي، وتقنيات السحاب، وتحليل البيانات مع التعلم المستمر للتقنيات الجديدة.",
    desc3: "هدفي هو أن أصبح مهندس برمجيات يجمع بين التصميم النظيف، والمعرفة التقنية القوية، والذكاء الاصطناعي لبناء منتجات يستمتع الناس حقًا باستخدامها.",
    resume: "السيرة الذاتية",
    viewCase: "عرض الحالة",
    challenge: "التحدي",
    solution: "الحل",
    impact: "الأثر التجاري",
    close: "إغلاق"
  }
};

// Localized Projects Content Database (Covers all 7 Projects in EN, HI, JP, AR)
const projectTranslations: Record<string, Record<string, any>> = {
  en: {
    "01": {
      title: "CodeRader",
      description: "Automated student progress tracker using Excel, SharePoint, and Power Automate to log coding activity and send alerts.",
      painPoint: "Monitoring students' coding progress across multiple platforms was time-consuming, making it difficult to track performance and identify students needing support.",
      strategy: "Developed an automated solution using Excel, SharePoint, Power Automate, and Outlook to monitor coding activity, assign badges, and send personalized email notifications.",
      value: "Reduced manual tracking efforts, improved performance visibility, and enabled faster mentor intervention while encouraging consistent student engagement."
    },
    "02": {
      title: "Employee Skill Matrix",
      description: "Centralized skill and certification manager using Excel, SharePoint, and Power Automate to automate training gap updates.",
      painPoint: "Managing employee skills, certifications, and training records manually made it difficult to track progress and identify skill gaps.",
      strategy: "Developed a centralized tracking system using Excel, SharePoint, and Power Automate to manage employee skills, monitor training progress, and automate notifications.",
      value: "Simplified skill management, improved training visibility, reduced administrative effort, and helped managers make better workforce development decisions."
    },
    "03": {
      title: "Sales analytics",
      description: "Dynamic Power BI visualizer tracking sales growth, revenue trends, and regional performance with KPI analytics.",
      painPoint: "Businesses lacked a centralized view of sales performance, making it difficult to identify revenue trends, top-performing products, and regional growth opportunities.",
      strategy: "Designed an interactive Power BI dashboard to visualize key sales metrics, revenue trends, customer insights, and regional performance using dynamic filters and KPI cards.",
      value: "Enabled faster data-driven decision-making, improved sales performance analysis, and provided actionable insights to support business growth and strategic planning."
    },
    "04": {
      title: "Marketing Insights",
      description: "Campaign performance and conversion dashboard built with Power BI to analyze customer demographics.",
      painPoint: "Marketing teams struggled to analyze customer behavior and campaign performance, making it difficult to target the right audience effectively.",
      strategy: "Built an interactive Power BI dashboard to analyze customer demographics, campaign outcomes, and subscription trends with dynamic visuals and filters.",
      value: "Improved campaign analysis, enabled data-driven marketing decisions, and helped identify customer segments with higher conversion potential."
    },
    "05": {
      title: "AI Compiler",
      description: "AI-powered Next.js code compiler with Supabase for complexity analysis, compiler, and progress tracking.",
      painPoint: "Developers often rely on separate tools for coding, execution, and performance analysis, resulting in an inefficient and fragmented workflow.",
      strategy: "Built an AI-powered coding platform using Next.js, Supabase, and AI integration to provide code execution, complexity analysis, personalized feedback, progress tracking, and an interactive AI assistant in one place.",
      value: "Simplified the coding workflow, enhanced learning through AI-driven insights, reduced context switching, and helped users improve coding efficiency and problem-solving skills."
    },
    "06": {
      title: "BMW Sales Dashboard",
      description: "Interactive Power BI sales tool displaying model performance, revenue growth, and regional analysis.",
      painPoint: "Analyzing sales performance across different BMW models, regions, and sales channels was challenging due to scattered data and limited reporting capabilities.",
      strategy: "Developed an interactive Power BI dashboard to visualize revenue trends, top-performing models, regional sales distribution, and key business KPIs using dynamic charts and filters.",
      value: "Provided a centralized view of sales performance, enabled faster business analysis, and supported data-driven decision-making through interactive insights."
    },
    "07": {
      title: "Sales Dashboard",
      description: "Unified Power BI report compiling raw Excel sales databases, relationships, and regional insights.",
      painPoint: "Raw sales data was scattered across multiple tables, making it difficult to identify revenue trends, product performance, and regional sales insights.",
      strategy: "Built an interactive Power BI dashboard by cleaning and transforming data in Excel, creating relationships through data modeling, and designing dynamic visualizations to analyze sales performance.",
      value: "Provided a unified view of key sales metrics, improved reporting efficiency, and enabled data-driven business decisions through interactive dashboards and actionable insights."
    }
  },
  hi: {
    "01": {
      title: "कोडरेडर",
      description: "छात्रों की कोडिंग गतिविधि को ट्रैक करने और अलर्ट भेजने के लिए एक्सेल, शेयरपॉइंट और पावर ऑटोमेट का उपयोग करके स्वचालित छात्र प्रगति ट्रैकर।",
      painPoint: "विभिन्न प्लेटफार्मों पर छात्रों की कोडिंग प्रगति की निगरानी करना समय लेने वाला था, जिससे प्रदर्शन को ट्रैक करना और सहायता की आवश्यकता वाले छात्रों की पहचान करना मुश्किल हो गया था।",
      strategy: "कोडिंग गतिविधि की निगरानी करने, बैज आवंटित करने और व्यक्तिगत ईमेल सूचनाएं भेजने के लिए एक्सेल, शेयरपॉइंट, पावर ऑटोमेट और आउटलुक का उपयोग करके एक स्वचालित समाधान विकसित किया।",
      value: "मैनुअल ट्रैकिंग प्रयासों को कम किया, प्रदर्शन दृश्यता में सुधार किया, और निरंतर छात्र जुड़ाव को प्रोत्साहित करते हुए त्वरित सलाहकार हस्तक्षेप को सक्षम किया।"
    },
    "02": {
      title: "कर्मचारी कौशल मैट्रिक्स",
      description: "प्रशिक्षण अंतराल अपडेट को स्वचालित करने के लिए एक्सेल, शेयरपॉइंट और पावर ऑटोमेट का उपयोग करके केंद्रीकृत कौशल और प्रमाणन प्रबंधक।",
      painPoint: "कर्मचारी कौशल, प्रमाणपत्र और प्रशिक्षण रिकॉर्ड को मैन्युअल रूप से प्रबंधित करने से प्रगति को ट्रैक करना और कौशल अंतराल की पहचान करना कठिन हो गया था।",
      strategy: "कर्मचारी कौशल का प्रबंधन करने, प्रशिक्षण प्रगति की निगरानी करने और सूचनाओं को स्वचालित करने के लिए एक्सेल, शेयरपॉइंट और पावर ऑटोमेट का उपयोग करके एक केंद्रीकृत ट्रैकिंग सिस्टम विकसित किया।",
      value: "सरलीकृत कौशल प्रबंधन, बेहतर प्रशिक्षण दृश्यता, कम प्रशासनिक प्रयास, और प्रबंधकों को कार्यबल विकास के बेहतर निर्णय लेने में मदद की।"
    },
    "03": {
      title: "बिक्री विश्लेषिकी",
      description: "KPI एनालिटिक्स के साथ बिक्री वृद्धि, राजस्व रुझान और क्षेत्रीय प्रदर्शन को ट्रैक करने वाला डायनामिक पावर बीआई विज़ुअलाइज़र।",
      painPoint: "व्यवसायों के पास बिक्री प्रदर्शन का एक केंद्रीकृत दृष्टिकोण नहीं था, जिससे राजस्व रुझान, शीर्ष प्रदर्शन करने वाले उत्पादों और क्षेत्रीय विकास के अवसरों की पहचान करना कठिन हो गया था।",
      strategy: "डायनेमिक फिल्टर और KPI कार्ड का उपयोग करके प्रमुख बिक्री मेट्रिक्स, राजस्व रुझान, ग्राहक अंतर्दृष्टि और क्षेत्रीय प्रदर्शन को विज़ुअलाइज़ करने के लिए एक इंटरैक्टिव पावर बीआई डैशबोर्ड तैयार किया।",
      value: "तेजी से डेटा-संचालित निर्णय लेने में सक्षम बनाया, बिक्री प्रदर्शन विश्लेषण में सुधार किया, और व्यावसायिक विकास और रणनीतिक योजना का समर्थन करने के लिए कार्रवाई योग्य अंतर्दृष्टि प्रदान की।"
    },
    "04": {
      title: "विपणन अंतर्दृष्टि",
      description: "ग्राहक जनसांख्यिकी का विश्लेषण करने के लिए पावर बीआई के साथ निर्मित अभियान प्रदर्शन और रूपांतरण डैशबोर्ड।",
      painPoint: "विपणन टीमों को ग्राहक व्यवहार और अभियान प्रदर्शन का विश्लेषण करने में कठिनाई होती थी, जिससे सही दर्शकों को प्रभावी ढंग से लक्षित करना कठिन हो जाता था।",
      strategy: "गतिशील दृश्यों और फिल्टर के साथ ग्राहक जनसांख्यिकी, अभियान परिणामों और सदस्यता रुझानों का विश्लेषण करने के लिए एक इंटरैक्टिव पावर बीआई डैशबोर्ड बनाया।",
      value: "बेहतर अभियान विश्लेषण, डेटा-संचालित विपणन निर्णय सक्षम किए, और उच्च रूपांतरण क्षमता वाले ग्राहक समूहों की पहचान करने में मदद की।"
    },
    "05": {
      title: "एआई कंपाइलर",
      description: "जटिलता विश्लेषण, कंपाइलर और प्रगति ट्रैकिंग के लिए Supabase के साथ एआई-संचालित Next.js कोड कंपाइलर।",
      painPoint: "डेवलपर्स अक्सर कोडिंग, निष्पादन और प्रदर्शन विश्लेषण के लिए अलग-अलग उपकरणों पर भरोसा करते हैं, जिसके परिणामस्वरूप एक अक्षम और खंडित वर्कफ़्लो होता है।",
      strategy: "एक ही स्थान पर कोड निष्पादन, जटिलता विश्लेषण, व्यक्तिगत प्रतिक्रिया, प्रगति ट्रैकिंग और एक इंटरैक्टिव एआई सहायक प्रदान करने के लिए Next.js, Supabase और AI एकीकरण का उपयोग करके एक एआई-संचालित कोडिंग प्लेटफॉर्म बनाया।",
      value: "कोडिंग वर्कफ़्लो को सरल बनाया, एआई-संचालित अंतर्दृष्टि के माध्यम से सीखने को बढ़ाया, संदर्भ स्विचिंग को कम किया, और उपयोगकर्ताओं को कोडिंग दक्षता और समस्या-समाधान कौशल में सुधार करने में मदद की।"
    },
    "06": {
      title: "बीएमडब्ल्यू बिक्री डैशबोर्ड",
      description: "मॉडल प्रदर्शन, राजस्व वृद्धि और क्षेत्रीय विश्लेषण प्रदर्शित करने वाला इंटरैक्टिव पावर बीआई बिक्री उपकरण।",
      painPoint: "बिखरे हुए डेटा और सीमित रिपोर्टिंग क्षमताओं के कारण विभिन्न बीएमडब्ल्यू मॉडल, क्षेत्रों और बिक्री चैनलों में बिक्री प्रदर्शन का विश्लेषण करना चुनौतीपूर्ण था।",
      strategy: "गतिशील चार्ट और फ़िल्टर का उपयोग करके राजस्व रुझान, शीर्ष प्रदर्शन करने वाले मॉडल, क्षेत्रीय बिक्री वितरण और प्रमुख व्यावसायिक KPI को विज़ुअलाइज़ करने के लिए एक इंटरैक्टिव पावर बीआई डैशबोर्ड विकसित किया।",
      value: "बिक्री प्रदर्शन का एक केंद्रीकृत दृश्य प्रदान किया, तेजी से व्यावसायिक विश्लेषण सक्षम किया, और इंटरैक्टिव अंतर्दृष्टि के माध्यम से डेटा-संचालित निर्णय लेने का समर्थन किया।"
    },
    "07": {
      title: "बिक्री डैशबोर्ड",
      description: "कच्चे एक्सेल बिक्री डेटाबेस, संबंधों और क्षेत्रीय अंतर्दृष्टि को संकलित करने वाली एकीकृत पावर बीआई रिपोर्ट।",
      painPoint: "कच्चा बिक्री डेटा कई तालिकाओं में बिखरा हुआ था, जिससे राजस्व रुझान, उत्पाद प्रदर्शन और क्षेत्रीय बिक्री अंतर्दृष्टि की पहचान करना मुश्किल हो गया था।",
      strategy: "एक्सेल में डेटा को साफ और परिवर्तित करके, डेटा मॉडलिंग के माध्यम से संबंध बनाकर और बिक्री प्रदर्शन का विश्लेषण करने के लिए गतिशील विज़ुअलाइज़ेशन डिजाइन करके एक इंटरैक्टिव पावर बीआई डैशबोर्ड बनाया।",
      value: "प्रमुख बिक्री मेट्रिक्स का एक एकीकृत दृष्टिकोण प्रदान किया, रिपोर्टिंग दक्षता में सुधार किया, और इंटरैक्टिव डैशबोर्ड और कार्रवाई योग्य अंतर्दृष्टि के माध्यम से डेटा-संचालित व्यावसायिक निर्णयों को सक्षम किया।"
    }
  },
  ja: {
    "01": {
      title: "コードレイダー",
      description: "Excel、SharePoint、Power Automateを使用してコーディング活動を記録し、アラートを送信する自動生徒進捗トラッカー。",
      painPoint: "複数のプラットフォームにわたる生徒のコーディングの進捗状況を監視するのに時間がかかり、パフォーマンスを追跡してサポートが必要な生徒を特定することが困難でした。",
      strategy: "Excel、SharePoint、Power Automate、Outlookを使用して、コーディング活動の監視、バッジの割り当て、およびパーソナライズされた電子メール通知の送信を行う自動化ソリューションを開発しました。",
      value: "手動の追跡作業を削減し、パフォーマンスの可視性を向上させ、生徒の継続的な関与を促しながら、メンターによる迅速な介入を可能にしました。"
    },
    "02": {
      title: "スキルマトリックス",
      description: "Excel、SharePoint、Power Automateを使用してトレーニングギャップの更新を自動化する、一元化されたスキルおよび資格管理者。",
      painPoint: "従業員のスキル、資格、トレーニング記録を手動で管理していたため、進捗状況を追跡し、スキルのギャップを特定することが困難でした。",
      strategy: "Excel、SharePoint、Power Automateを使用して、従業員のスキルを管理し、トレーニングの進捗状況を監視し、通知を自動化する一元化された追跡システムを開発しました。",
      value: "スキル管理を簡素化し、トレーニングの可視性を向上させ、管理作業を削減し、マネージャーがより良い人員開発の意思決定を行えるよう支援しました。"
    },
    "03": {
      title: "売上分析",
      description: "KPI分析を使用して売上成長、収益傾向、および地域パフォーマンスを追跡する動的なPower BIビジュアライザー。",
      painPoint: "企業には売上パフォーマンスを一元的に把握する手段がなく、収益傾向、売れ筋商品、および地域の成長機会を特定することが困難でした。",
      strategy: "動的フィルターとKPIカードを使用して、主要な売上指標、収益傾向、顧客に関する洞察、および地域のパフォーマンスを視覚化するインタラクティブなPower BIダッシュボードを設計しました。",
      value: "データに基づく意思決定の迅速化、売上パフォーマンス分析の向上、およびビジネスの成長と戦略的計画をサポートする実用的な洞察を提供しました。"
    },
    "04": {
      title: "マーケティング分析",
      description: "顧客属性を分析するためにPower BIで構築されたキャンペーンパフォーマンスとコンバージョン用のダッシュボード。",
      painPoint: "マーケティングチームは顧客行動とキャンペーンパフォーマンス of キャンペーンの分析に苦労しており、適切なオーディエンスを効果的にターゲットすることが困難でした。",
      strategy: "動的なビジュアルとフィルターを使用して、顧客の属性、キャンペーンの結果、およびサブスクリプションの傾向を分析するインタラクティブなPower BIダッシュボードを構築しました。",
      value: "キャンペーン分析の向上、データ駆動型のマーケティング意思決定の実現、およびコンバージョン可能性の高い顧客セグメントの特定を支援しました。"
    },
    "05": {
      title: "AIコンパイラ",
      description: "複雑さの分析、コンパイラ、および進捗追跡のためのSupabaseを備えたAI駆動のNext.jsコードコンパイラ。",
      painPoint: "開発者はコーディング、実行、およびパフォーマンス分析のために別々のツールに依存することが多く、非効率で断片化されたワークフローを招いていました。",
      strategy: "Next.js、Supabase、およびAI統合を使用して、コード実行、複雑さの分析、パーソナライズされたフィードバック、進捗追跡、およびインタラクティブなAIアシスタントを1か所で提供するAI駆動のコーディングプラットフォームを構築しました。",
      value: "コーディングのワークフローを簡素化し、AIによる洞察を通じて学習を強化し、コンテキストの切り替えを減らし、ユーザーがコーディング効率と問題解決スキルを向上させるのを支援しました。"
    },
    "06": {
      title: "BMW売上ダッシュボード",
      description: "モデルのパフォーマンス、収益の伸び、および地域分析を表示するインタラクティブなPower BI売上ツール。",
      painPoint: "データが分散しており、レポート機能が限られていたため、さまざまなBMWモデル、地域、および販売チャネルにわたる売上パフォーマンスの分析が困難でした。",
      strategy: "動的なチャートとフィルターを使用して、収益傾向、トップパフォーマンスモデル、地域売上分布、および主要なビジネスKPIを視覚化するインタラクティブなPower BIダッシュボードを開発しました。",
      value: "売上パフォーマンスの一元的なビューを提供し、迅速なビジネス分析を可能にし、インタラクティブなインサイトを通じてデータ主導の意思決定をサポートしました。"
    },
    "07": {
      title: "売上ダッシュボード",
      description: "生のExcel売上データベース、リレーションシップ、および地域のインサイトをコンパイルする統一されたPower BIレポート。",
      painPoint: "生の売上データが複数のテーブルに分散していたため、収益傾向、製品パフォーマンス、および地域の売上インサイトを特定することが困難でした。",
      strategy: "Excelでデータをクレンジングおよび変換し、データモデリングを通じて関係を作成し、売上パフォーマンスを分析するための動的な視覚化を設計することにより、インタラクティブなPower BIダッシュボードを構築しました。",
      value: "主要な売上指標の一元的なビューを提供し、レポート作成の効率を向上させ、インタラクティブなダッシュボードと実用的な洞察を通じてデータ主導のビジネス上の意思決定を可能にしました。"
    }
  },
  ar: {
    "01": {
      title: "كود رادر",
      description: "متعقب تلقائي لتقدم الطلاب باستخدام إكسل وشيربوينت وباور أوتوميت لتسجيل نشاط البرمجة وإرسال التنبيهات.",
      painPoint: "كانت مراقبة تقدم الطلاب في البرمجة عبر منصات متعددة تستغرق وقتًا طويلاً، مما جعل من الصعب تتبع الأداء وتحديد الطلاب الذين يحتاجون إلى الدعم.",
      strategy: "تم تطوير حل مؤتمت باستخدام إكسل وشيربوينت وباور أوتوميت وأوتلوك لمراقبة نشاط البرمجة وتعيين الشارات وإرسال إشعارات بريد إلكتروني مخصصة.",
      value: "تقليل جهود التتبع اليدوي، وتحسين رؤية الأداء، وتمكين تدخل الموجهين بشكل أسرع مع تشجيع مشاركة الطلاب المستمرة."
    },
    "02": {
      title: "مصفوفة مهارات الموظفين",
      description: "مدير مركزي للمهارات والشهادات باستخدام إكسل وشيربوينت وباور أوتوميت لأتمتة تحديثات الفجوات التدريبية.",
      painPoint: "كانت إدارة مهارات الموظفين والشهادات وسجلات التدريب يدويًا تجعل من الصعب تتبع التقدم وتحديد الفجوات في المهارات.",
      strategy: "تطوير نظام تتبع مركزي باستخدام إكسل وشيربوينت وباور أوتوميت لإدارة مهارات الموظفين ومراقبة تقدم التدريب وأتمتة الإشعارات.",
      value: "تبسيط إدارة المهارات، وتحسين رؤية التدريب، وتقليل الجهد الإداري، ومساعدة المدراء في اتخاذ قرارات أفضل لتطوير القوى العاملة."
    },
    "03": {
      title: "تحليلات المبيعات",
      description: "برنامج تصور ديناميكي لـ Power BI يتتبع نمو المبيعات واتجاهات الإيرادات والأداء الإقليمي مع تحليلات KPI.",
      painPoint: "تفتقر الشركات إلى رؤية مركزية لأداء المبيعات، مما يجعل من الصعب تحديد اتجاهات الإيرادات والمنتجات الأكثر أداءً وفرص النمو الإقليمي.",
      strategy: "تصميم لوحة معلومات Power BI تفاعلية لتصور مقاييس المبيعات الرئيسية واتجاهات الإيرادات ورؤى العملاء والأداء الإقليمي باستخدام مرشحات ديناميكية وبطاقات مؤشرات الأداء الرئيسية.",
      value: "تمكين اتخاذ القرارات القائمة على البيانات بشكل أسرع، وتحسين تحليل أداء المبيعات، وتقديم رؤى قابلة للتنفيذ لدعم نمو الأعمال والتخطيط الاستراتيجي."
    },
    "04": {
      title: "رؤى التسويق",
      description: "لوحة معلومات أداء الحملات والتحويل المبنية بـ Power BI لتحليل التركيبة السكانية للعملاء.",
      painPoint: "واجهت فرق التسويق صعوبة في تحليل سلوك العملاء وأداء الحملات، مما جعل من الصعب استهداف الجمهور المناسب بفعالية.",
      strategy: "بناء لوحة معلومات Power BI تفاعلية لتحليل التركيبة السكانية للعملاء ونتائج الحملات واتجاهات الاشتراك مع مرئيات ومرشحات ديناميكية.",
      value: "تحسين تحليل الحملات، وتمكين قرارات التسويق القائمة على البيانات، والمساعدة في تحديد شرائح العملاء ذات إمكانات التحويل العالية."
    },
    "05": {
      title: "مترجم الذكاء الاصطناعي",
      description: "مترجم أكواد Next.js مدعوم بالذكاء الاصطناعي مع Supabase لتحليل التعقيد والتجميع وتتبع التقدم.",
      painPoint: "يعتمد المطورون غالبًا على أدوات منفصلة للترميز والتنفيذ وتحليل الأداء، مما يؤدي إلى سير عمل غير فعال ومجزأ.",
      strategy: "بناء منصة ترميز مدعومة بالذكاء الاصطناعي باستخدام Next.js وSupabase وتكامل الذكاء الاصطناعي لتوفير تنفيذ الأكواد، وتحليل التعقيد، والتعليقات المخصصة، وتتبع التقدم، ومساعد ذكاء اصطناعي تفاعلي في مكان واحد.",
      value: "تبسيط سير عمل الترميز، وتعزيز التعلم من خلال الرؤى المدفوعة بالذكاء الاصطناعي، وتقليل تبديل السياق، ومساعدة المستخدمين على تحسين كفاءة الترميز ومهارات حل المشكلات."
    },
    "06": {
      title: "لوحة مبيعات بي إم دبليو",
      description: "أداة مبيعات تفاعلية لـ Power BI تعرض أداء الطراز ونمو الإيرادات والتحليل الإقليمي.",
      painPoint: "كان تحليل أداء المبيعات عبر طرازات وقنوات مبيعات بي إم دبليو المختلفة يمثل تحديًا بسبب البيانات المتناثرة وقدرات إعداد التقارير المحدودة.",
      strategy: "تطوير لوحة معلومات Power BI تفاعلية لتصور اتجاهات الإيرادات والطرازات الأكثر أداءً وتوزيع المبيعات الإقليمية ومؤشرات الأداء الرئيسية للأعمال باستخدام مخططات ومرشحات ديناميكية.",
      value: "توفير رؤية مركزية لأداء المبيعات، وتمكين تحليل الأعمال بشكل أسرع، ودعم اتخاذ القرارات المستندة إلى البيانات من خلال الرؤى التفاعلية."
    },
    "07": {
      title: "لوحة معلومات المبيعات",
      description: "تقرير Power BI موحد يجمع قواعد بيانات مبيعات Excel الأولية والعلاقات والرؤى الإقليمية.",
      painPoint: "كانت بيانات المبيعات الأولية مبعثرة عبر جداول متعددة, مما جعل من الصعب تحديد اتجاهات الإيرادات وأداء المنتجات ورؤى المبيعات الإقليمية.",
      strategy: "بناء لوحة معلومات Power BI تفاعلية عن طريق تنظيف البيانات وتحويلها في Excel، وإنشاء علاقات من خلال نمذجة البيانات، وتصميم مرئيات ديناميكية لتحليل أداء المبيعات.",
      value: "توفير رؤية موحدة لمقاييس المبيعات الرئيسية، وتحسين كفاءة إعداد التقارير، وتمكين قرارات العمل المستندة إلى البيانات من خلال لوحات معلومات تفاعلية ورؤى قابلة للتنفيذ."
    }
  }
};

const baseProjects: Omit<Project, "title" | "description" | "painPoint" | "strategy" | "value">[] = [
  {
    id: "01",
    gitRepo: "https://github.com/prudhvi05reddy/CodeRader_Automation_Project",
    tech: ["Excel", "SharePoint", "Power Automate", "Outlook"],
    color: "#E27500",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 10 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    id: "02",
    gitRepo: "https://github.com/prudhvi05reddy/Employee-SkillMatrix-Project",
    tech: ["Excel", "SharePoint", "Power Automate"],
    color: "#3B82F6",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    id: "03",
    gitRepo: "https://github.com/prudhvi05reddy/FUTURE_DS_01",
    tech: ["Power BI", "Data Modeling", "Excel"],
    color: "#8B5CF6",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    )
  },
  {
    id: "04",
    gitRepo: "https://github.com/prudhvi05reddy/FUTURE_DS_03",
    tech: ["Power BI", "Campaigns", "Customer Insights"],
    color: "#10B981",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    )
  },
  {
    id: "05",
    gitRepo: null,
    tech: ["Next.js", "Supabase", "AI Core", "Code Execution"],
    color: "#A78BFA",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.97-8.97m-8.97 8.97L15 15m-5.187.904l-1.958-1.958a3.375 3.375 0 010-4.773l5.69-5.69a3.375 3.375 0 114.774 4.774l-3.023 3.023M9 21h6m-9-9h6" />
      </svg>
    )
  },
  {
    id: "06",
    gitRepo: "https://github.com/prudhvi05reddy/BMW-dashboard",
    tech: ["Power BI", "KPI Models", "Sales Analytics"],
    color: "#06B6D4",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "07",
    gitRepo: "https://github.com/prudhvi05reddy/FUTURE_DS_02",
    tech: ["Power BI", "Data Cleaning", "Data Modeling", "Excel"],
    color: "#EC4899",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694 4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
      </svg>
    )
  }
];

function Hexagon({
  className,
  size = 120,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.45, scale: 1 }}
      animate={{
        y: [0, 15, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        y: { duration: 8 + delay * 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 12 + delay * 2.5, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 1, delay },
      }}
      viewport={{ once: true }}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-black/[0.04] dark:text-white/10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
      </svg>
    </motion.div>
  );
}

// Subcomponent to render each project card using Framer Motion direct styles to prevent React re-renders
interface ProjectCardProps {
  project: Project;
  index: number;
  scrollOffset: any;
  spreadWidth: number;
  totalLength: number;
  isPaused: boolean;
  setIsPaused: (p: boolean) => void;
  setSelectedProject: (p: Project) => void;
  tAbout: any;
}

function ProjectCard({
  project,
  index,
  scrollOffset,
  spreadWidth,
  totalLength,
  isPaused,
  setIsPaused,
  setSelectedProject,
  tAbout,
}: ProjectCardProps) {
  // Translate the scrollOffset motion value to relative card offset
  const offset = useTransform(scrollOffset, (latestScroll: number) => {
    let val = index - latestScroll;
    // Normalize to handle wrapping of duplicated items
    const halfLength = totalLength;
    if (val < -halfLength) val += halfLength * 2;
    if (val > halfLength) val -= halfLength * 2;
    return val;
  });

  const x = useTransform(offset, (val) => val * spreadWidth);
  const y = useTransform(offset, (val) => Math.abs(val) * 12);
  const scale = useTransform(offset, (val) => Math.abs(val) < 0.5 ? 1.05 : 1 - Math.abs(val) * 0.15);
  const rotateY = useTransform(offset, (val) => val * -25);
  const opacity = useTransform(offset, (val) => Math.abs(val) > 2 ? 0 : 1 - Math.abs(val) * 0.35);
  const zIndex = useTransform(offset, (val) => Math.round(10 - Math.abs(val)));

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotateY,
        opacity,
        zIndex,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="absolute w-[265px] h-[395px] rounded-[32px] border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl transition-[box-shadow] duration-500 flex flex-col justify-between overflow-hidden shrink-0 shadow-lg hover:shadow-2xl cursor-pointer"
    >
      {/* Glowing Background Blob */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], x: [0, 4, 0], y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        className="absolute -left-10 -bottom-10 w-32 h-32 blur-2xl rounded-full opacity-60 pointer-events-none"
        style={{ backgroundColor: `${project.color}18` }}
      />

      {/* Card Container */}
      <div className="flex flex-col justify-between items-center text-center h-full py-6 px-5 relative z-10 min-h-[150px]">
        {/* Top Block: Icon, Localized Title, & Tech badges */}
        <div className="flex flex-col items-center w-full mt-3">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            className="mt-2 transition-transform duration-300 filter drop-shadow-md"
            style={{ color: project.color, filter: `drop-shadow(0 0 6px ${project.color}35)` }}
          >
            {project.icon}
          </motion.div>

          <h3 className="text-[17px] font-extrabold text-[var(--text-primary)] mt-3 leading-snug tracking-tight">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-1 justify-center mt-2.5 max-w-full">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-[8.5px] font-semibold bg-white/5 border border-white/10 text-[var(--text-secondary)] select-none"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Middle Block: Localized Description */}
        <p className="text-[11.5px] leading-relaxed text-[var(--text-secondary)] my-3 font-light max-h-[85px] overflow-hidden line-clamp-3">
          {project.description}
        </p>

        {/* Bottom Block: Button (Larger size and clearly shifted up) */}
        <div className="w-full max-w-[210px] mb-3 relative z-20">
          <button
            onClick={() => setSelectedProject(project)}
            className="w-full py-3 rounded-xl text-[13px] font-black tracking-wider text-[var(--text-primary)] transition-all duration-300 scale-100 hover:scale-105 hover:shadow-[0_0_15px_rgba(226,117,0,0.3)] shadow-md cursor-pointer border border-[var(--border)] -translate-y-2.5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = project.color;
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow = `0 0 18px ${project.color}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {tAbout.viewCase}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { language } = useLanguage();
  const scrollOffset = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Responsive spread spacing for the 3D perspective path
  const [spreadWidth, setSpreadWidth] = useState(160);

  // Dynamic layout helpers for RTL languages (Arabic)
  const isRtl = language === "ar";

  // Resolve localized text for the About section
  const tAbout = aboutTranslations[language] || aboutTranslations.en;

  // Resolve localized content for each project dynamically
  const localizedProjects: Project[] = baseProjects.map((p) => {
    const translation = projectTranslations[language]?.[p.id] || projectTranslations.en[p.id];
    return {
      ...p,
      title: translation.title,
      description: translation.description,
      painPoint: translation.painPoint,
      strategy: translation.strategy,
      value: translation.value,
    };
  });

  const duplicatedProjects = [...localizedProjects, ...localizedProjects];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpreadWidth(80);
      } else if (window.innerWidth < 1024) {
        setSpreadWidth(125);
      } else {
        setSpreadWidth(160);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous linear glide loop running at hardware speed
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        // Speed: 1 project per 5200ms
        const speed = 1 / 5200;
        let currentVal = scrollOffset.get();
        let nextVal = currentVal - speed * deltaTime;
        
        // Wrap around seamlessly
        if (nextVal <= -localizedProjects.length) {
          nextVal += localizedProjects.length;
        } else if (nextVal >= localizedProjects.length) {
          nextVal -= localizedProjects.length;
        }

        scrollOffset.set(nextVal);
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, localizedProjects.length, scrollOffset]);

  const handlePrev = () => {
    const current = scrollOffset.get();
    const target = Math.round(current) + 1;
    animate(scrollOffset, target, { type: "spring", stiffness: 90, damping: 14 });
  };

  const handleNext = () => {
    const current = scrollOffset.get();
    const target = Math.round(current) - 1;
    animate(scrollOffset, target, { type: "spring", stiffness: 90, damping: 14 });
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center bg-transparent py-28 overflow-hidden"
    >
      {/* Background Ambient Glow Orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-48 top-0 h-[550px] w-[550px] rounded-full bg-[#E27500]/8 dark:bg-[#E27500]/15 blur-[180px] pointer-events-none"
      />

      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -right-48 bottom-0 h-[450px] w-[450px] rounded-full bg-[#8A2BE2]/5 dark:bg-[#8A2BE2]/10 blur-[180px] pointer-events-none"
      />

      {/* Hexagons */}
      <Hexagon className="top-12 -left-20" size={300} delay={0.1} />
      <Hexagon className="bottom-20 left-1/4" size={180} delay={0.4} />
      <Hexagon className="top-[-8%] right-[-5%]" size={420} delay={0.2} />
      <Hexagon className="bottom-12 right-[32%]" size={140} delay={0.6} />

      <div className="relative w-full max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-24 mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Spacious Social Buttons (RTL support configured) */}
          <div 
            className={`lg:col-span-5 flex flex-col justify-center ${isRtl ? "text-right" : "text-left"}`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 uppercase tracking-[8px] text-xs md:text-sm font-semibold text-[#E27500]"
            >
              {tAbout.tagline}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-2px] text-[var(--primary)] mb-8"
            >
              {tAbout.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 max-w-[640px]"
            >
              <p className="text-[16px] md:text-[17px] leading-[1.8] text-[var(--text-muted)] font-light">
                {tAbout.desc1}
              </p>
              <p className="text-[16px] md:text-[17px] leading-[1.8] text-[var(--text-muted)] font-light">
                {tAbout.desc2}
              </p>
              <p className="text-[16px] md:text-[17px] leading-[1.8] text-[var(--text-muted)] font-light">
                {tAbout.desc3}
              </p>
            </motion.div>

            {/* Social Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              {/* Resume button */}
              <a
                href="/resume.pdf"
                className="group flex items-center gap-2 rounded-xl bg-[#E27500] px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(226,117,0,0.4)] text-sm"
              >
                <FaDownload className="text-sm text-white group-hover:animate-bounce" />
                <span>{tAbout.resume}</span>
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/prudhvi05reddy"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--text)] transition-all duration-300 hover:border-[#E27500] hover:scale-105 text-sm"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com/in/prudhvi-reddy-billakurthi/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-semibold text-[var(--text)] transition-all duration-300 hover:border-[#E27500] hover:scale-105 text-sm"
              >
                <FaLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Curved Perspective Carousel (lg:col-span-7) */}
          <div className="lg:col-span-7 relative w-full h-[460px] flex items-center justify-center group/track">
            
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute left-2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[var(--border)] bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-[#E27500] hover:border-[#E27500]/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover/track:opacity-100 shadow-lg cursor-pointer"
              aria-label="Scroll Left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute right-2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[var(--border)] bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-[#E27500] hover:border-[#E27500]/50 hover:scale-110 transition-all duration-300 opacity-0 group-hover/track:opacity-100 shadow-lg cursor-pointer"
              aria-label="Scroll Right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Soft Edge Blending Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--bg)] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--bg)] to-transparent z-20 pointer-events-none" />

            {/* Perspective Viewport wrapper */}
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              style={{ perspective: "1000px" }}
            >
              {duplicatedProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${index}`}
                  project={project}
                  index={index}
                  scrollOffset={scrollOffset}
                  spreadWidth={spreadWidth}
                  totalLength={localizedProjects.length}
                  isPaused={isPaused}
                  setIsPaused={setIsPaused}
                  setSelectedProject={setSelectedProject}
                  tAbout={tAbout}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Case Details Popup Modal (Translates completely and switches flow for RTL languages) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Modal Card Box - Rounded Square Sizing (max-w-xl md:max-w-2xl), bg-[var(--card)] theme mutability, shadow, and text layout */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 25 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              dir={isRtl ? "rtl" : "ltr"}
              style={{ textAlign: isRtl ? "right" : "left" }}
              className="relative w-full max-w-xl md:max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-[28px] px-8 sm:px-12 md:px-14 py-10 md:py-12 shadow-2xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#E27500]/20 dark:hover:[&::-webkit-scrollbar-thumb]:bg-[#E27500]/40 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col gap-8"
            >
              {/* Close Button X (Swaps position in RTL layout, positioned inside padding) */}
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-6 ${isRtl ? "left-6" : "right-6"} w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#E27500] hover:scale-110 transition-all duration-300 cursor-pointer border border-white/10 shadow-lg z-20`}
                aria-label="Close Modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header (Indented from card margins) */}
              <div className="pt-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] pr-10 tracking-tight leading-snug">
                  {selectedProject.title}
                </h2>

                <div className="flex flex-wrap gap-2 mt-5">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/20 text-[#A993FE]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Description sections (Generously indented to prevent touching borders) */}
              <div className="space-y-8 my-2">
                {/* Challenge */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-2.5 font-mono select-none">
                    // {tAbout.challenge}
                  </h4>
                  <p className="text-[15px] text-[var(--text-primary)] leading-relaxed font-light">
                    {selectedProject.painPoint}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h4 className="text-[13px] uppercase tracking-widest text-[var(--text-secondary)] font-bold mb-2.5 font-mono select-none">
                    // {tAbout.solution}
                  </h4>
                  <p className="text-[15px] text-[var(--text-primary)] leading-relaxed font-light">
                    {selectedProject.strategy}
                  </p>
                </div>

                {/* Business Value */}
                <div className="bg-[var(--card)]/40 dark:bg-white/[0.01] border border-[#7C5DF9]/30 rounded-2xl p-6 shadow-inner">
                  <h4 className={`text-xs uppercase tracking-wider text-[#A993FE] font-bold flex items-center gap-2 mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                    <svg className="w-4.5 h-4.5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    {tAbout.impact}
                  </h4>
                  <p className="text-[14px] text-[var(--text-primary)] leading-relaxed font-light">
                    {selectedProject.value}
                  </p>
                </div>
              </div>

              {/* Bottom Buttons Row (Indented matching the text) */}
              <div className={`flex items-center gap-3 border-t border-[var(--border)] pt-6 mt-4 pb-6 ${isRtl ? "justify-start flex-row-reverse" : "justify-end"}`}>
                {selectedProject.gitRepo && (
                  <a
                    href={selectedProject.gitRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#1A1838] border border-[#7C5DF9] px-6 py-3 text-xs font-semibold text-[#A5A6F6] hover:bg-[#2c1d4d] transition-all duration-300 shadow-[0_0_20px_rgba(124,93,249,0.15)]"
                  >
                    <FaGithub size={14} className="text-[#A5A6F6]" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-xs font-semibold text-white hover:text-[#E27500] hover:border-[#E27500]/30 transition-all duration-300 cursor-pointer"
                >
                  {tAbout.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}