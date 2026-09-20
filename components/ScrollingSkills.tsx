"use client";

import { motion } from "framer-motion";

const skills = [
  "Java • Python • SQL",
  "Power BI Developer",
  "Microsoft Power Platform",
  "Open To Internships",
  "Oracle Certified SQL",
];

export default function ScrollingSkills() {
  // Duplicate the list of skills to ensure seamless infinite looping
  const duplicatedSkills = [... skills, ...skills, ...skills];

  return (
    <div className="absolute bottom-2 left-0 w-full overflow-hidden py-4 select-none">
      {/* Ambient gradient edge masks for fading effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track using Framer Motion */}
      <div className="relative w-full flex items-center">
        <motion.div
          animate={{ x: [0, "-33.33%"] }}
          transition={{
            ease: "linear",
            duration: 22, // adjust duration to change speed
            repeat: Infinity,
          }}
          className="flex items-center gap-12 whitespace-nowrap w-max"
        >
          {duplicatedSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="text-sm md:text-base font-light tracking-[4px] uppercase text-[var(--text-muted)] opacity-55">
                {skill}
              </span>
              <span className="text-sm md:text-base font-light text-[var(--text-muted)] opacity-25">
                /
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}