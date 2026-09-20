"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import TextReveal from "@/components/TextReveal";
import Experience from "@/components/Experience";
import GreetingIntro from "@/components/GreetingIntro";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
// import AchievementTicker from "@/components/AchievementTicker";
// import MovingProfile from "@/components/MovingProfile";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <GreetingIntro onFinish={() => setShowIntro(false)} />
      ) : (
        <main>

          <Hero />
          <Navbar />
          {/* <AchievementTicker /> */}
          <About />
          <div className="h-[4.0cm]" />
          <TextReveal />
          <div className="h-[150px] sm:h-[180px] lg:h-[200px] pointer-events-none select-none" />
          <Experience />
          <div className="h-[5.25cm]" />
          <Skills />
          <div className="h-[1.25cm]" />
          <Contact />


        </main>
      )}
    </>
  );
}