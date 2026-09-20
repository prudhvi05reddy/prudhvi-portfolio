"use client";

import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const links = [
    { id: "home", label: "", icon: <FaHome size={20} /> },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact Me" },
  ];

  // Automatically highlight current section accurately on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["contact", "skills", "about", "home"];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      // Special case for top of page
      if (window.scrollY < 150) {
        setActive("home");
        return;
      }

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition <= top + height + 200) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const targetId = id === "projects" ? "about" : id;
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] opacity-100 pointer-events-auto transition-all duration-300 ease-in-out">
      <div
        className="
          flex
          items-center
          rounded-full
          bg-[#171717]/95
          backdrop-blur-xl
          border
          border-white/10
          p-2
          shadow-[0_15px_40px_rgba(0,0,0,.5)]
        "
      >
        {links.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`
              relative
              flex
              items-center
              justify-center
              text-center
              rounded-full
              font-semibold
              transition-all
              duration-300
              ease-in-out

              ${
                item.icon
                  ? "h-11 w-25"
                  : item.id === "contact"
                  ? "h-11 w-[100px]"
                  : "h-11 w-[80px]"
              }

              ${
                active === item.id
                  ? "bg-[#E27500] text-white shadow-[0_0_15px_rgba(226,117,0,.35)]"
                  : "text-white/80 hover:text-[#E27500]"
              }
            `}
          >
            {item.icon ? item.icon : item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}