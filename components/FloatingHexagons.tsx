"use client";

import { motion } from "framer-motion";

function Hexagon({
  className,
  size = 120,
  delay = 0,
  opacity = 0.06,
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
        y: [0, 10, 0],
        rotate: [0, 3, 0],
      }}
      transition={{
        y: { duration: 12 + delay * 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 18 + delay * 3, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 1, delay },
      }}
      viewport={{ once: true }}
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-[#F59E0B] opacity-[var(--hex-opacity-multiplier,1)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        style={{ filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.25))" }}
      >
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
      </svg>
    </motion.div>
  );
}

export default function FloatingHexagons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Subtle radial glows behind some hexagons to add spatial depth */}
      <div className="absolute top-[-5%] left-[-4%] w-[250px] h-[250px] rounded-full bg-[#F59E0B]/3 dark:bg-[#F59E0B]/2.5 blur-[70px] pointer-events-none -z-20" />
      <div className="absolute top-[22%] right-[-6%] w-[320px] h-[320px] rounded-full bg-[#F59E0B]/3.5 dark:bg-[#F59E0B]/2.5 blur-[85px] pointer-events-none -z-20" />
      <div className="absolute bottom-[8%] left-[-4%] w-[280px] h-[280px] rounded-full bg-[#F59E0B]/3 dark:bg-[#F59E0B]/2 blur-[75px] pointer-events-none -z-20" />

      {/* 5 Hexagons distributed across edges/corners with low opacity (5-10%) */}
      <Hexagon className="top-[-3%] left-[-3%]" size={180} delay={0} opacity={0.06} />
      <Hexagon className="top-[22%] right-[-5%]" size={250} delay={0.2} opacity={0.08} />
      <Hexagon className="top-[48%] left-[-4%]" size={130} delay={0.4} opacity={0.05} />
      <Hexagon className="bottom-[8%] left-[-3%]" size={210} delay={0.6} opacity={0.07} />
      <Hexagon className="bottom-[-3%] right-[6%]" size={160} delay={0.8} opacity={0.06} />
    </div>
  );
}
