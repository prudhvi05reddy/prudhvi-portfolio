"use client";

import { useEffect, useState } from "react";

interface Props {
  onFinish: () => void;
}

const greetings = [
  {
    text: "Hello",
    image: "/greetings/English.jpeg",
  },
  {
    text: "నమస్కారం",
    image: "/greetings/Telugu.jpeg",
  },
  {
    text: "नमस्ते",
    image: "/greetings/Hindi.jpeg",
  },
  {
    text: "こんにちは",
    image: "/greetings/Japanese.jpeg",
  },
  {
    text: "مرحباً",
    image: "/greetings/Arab.jpeg",
  },
//   {
//     text: "Bonjour",
//     image: "/greetings/French.jpeg",
//   },
  {
    text: "Hola",
    image: "/greetings/Spanish.jpeg",
  },
  // {
  //   text: "你好",
  //   image: "/greetings/China.png",
  // },
];

export default function GreetingIntro({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (index >= greetings.length - 1) {
      const timer = setTimeout(() => {
        onFinish();
      }, 500);

      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setFade(true);
      }, 60);
    }, 300);

    return () => clearInterval(timer);
  }, [index, onFinish]);
  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black">

      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${greetings[index].image})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Greeting */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          fade
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90"
        }`}
      >
        <h1 className="text-white text-7xl md:text-5xl font-bold drop-shadow-3xl tracking-wide">
          {greetings[index].text}
        </h1>
      </div>

    </div>
  );
}