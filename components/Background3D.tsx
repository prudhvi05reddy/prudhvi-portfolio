"use client";

import { useEffect, useState } from "react";

export default function Background3D() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 4K Pre-rendered Hexagonal Video Loop Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          // Apply theme-specific CSS filters automatically
          filter: "var(--video-filter, none)",
        }}
      >
        <source
          src="https://nikolaradeski.com/wp-content/uploads/2025/08/abstract-white-background-4k-motion-graphics-background-loop-white-video-loop-1080-ytshorts.savetube.me_.mp4"
          type="video/mp4"
        />
      </video>

      {/* CSS variables to swap filters based on theme toggles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Light Mode (Clean, highly visible desaturated grey/white hexagons) */
          :root, body.light-theme {
            --video-filter: grayscale(1) brightness(0.96) contrast(1.05) opacity(0.65);
          }
          /* Dark Mode (High visibility monochrome cyber grid, no yellow/orange color) */
          [data-theme="dark"], .dark, body.dark-theme, [data-theme="moon"] {
            --video-filter: invert(1) grayscale(1) brightness(0.80) contrast(1.2) opacity(0.70);
          }
        `,
        }}
      />

      {/* Seamless fading gradient overlay to blend into bottom content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/15 to-[var(--background)] z-10 pointer-events-none" />
    </div>
  );
}