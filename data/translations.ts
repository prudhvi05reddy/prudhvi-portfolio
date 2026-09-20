export const translations = {
  en: {
    hero: {
      role: "Software Developer",
      subtitle: "Aspiring Software Developer",
      location: "Kakinada, Andhra Pradesh • India",
    },

    navbar: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      certifications: "Certificates",
      contact: "Contact",
    },
  },

  hi: {
    hero: {
      role: "सॉफ्टवेयर डेवलपर",
      subtitle: "उभरते हुए सॉफ्टवेयर डेवलपर",
      location: "काकीनाडा, आंध्र प्रदेश • भारत",
    },

    navbar: {
      home: "होम",
      about: "मेरे बारे में",
      skills: "कौशल",
      projects: "प्रोजेक्ट्स",
      certifications: "प्रमाणपत्र",
      contact: "संपर्क",
    },
  },

  ja: {
    hero: {
      role: "ソフトウェア開発者",
      subtitle: "将来のソフトウェア開発者",
      location: "インド・アーンドラプラデーシュ州・カキナダ",
    },

    navbar: {
      home: "ホーム",
      about: "私について",
      skills: "スキル",
      projects: "プロジェクト",
      certifications: "資格",
      contact: "お問い合わせ",
    },
  },

  ar: {
    hero: {
      role: "مطور برمجيات",
      subtitle: "مطور برمجيات طموح",
      location: "كاكينادا، أندرا براديش، الهند",
    },

    navbar: {
      home: "الرئيسية",
      about: "نبذة عني",
      skills: "المهارات",
      projects: "المشاريع",
      certifications: "الشهادات",
      contact: "اتصل",
    },
  },
} as const;

export type Language = keyof typeof translations;