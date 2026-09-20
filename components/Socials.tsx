"use client";

import {
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

export default function Socials() {
  return (
    <div className="flex h-[35px] items-center rounded-full border border-gray-300 bg-white/90 px-3 shadow-lg backdrop-blur-md">

      {/* Title */}
      <span className="mr-3 text-[11px] font-bold uppercase tracking-[2px] text-gray-500">
        SOCIALS
      </span>

      {/* Icons */}
      <div className="flex items-center gap-4 text-[16px] text-gray-700">

        <a
          href="https://www.linkedin.com/in/prudhvi-reddy-billakurthi/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-110 hover:text-black"
        >
          <FaLinkedinIn />
        </a>

        <a
          href="https://github.com/prudhvi05reddy"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-110 hover:text-black"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.instagram.com/prudhvi_reddy_3000/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-110 hover:text-black"
        >
          <FaInstagram />
        </a>

        {/* <a
          href="https://www.credly.com/users/prudhvinadh-satya-sasankadhar-reddy-billakurthi.45dd4a93"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-110 hover:text-black"
        >
          <FaGlobe />
        </a> */}

      </div>
    </div>
  );
}