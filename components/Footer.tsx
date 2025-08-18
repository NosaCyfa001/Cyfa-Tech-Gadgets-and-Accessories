"use client";

import { Github, Instagram, X } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 text-black text-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="https://github.com/NosaCyfa001"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="hover:text-green-900 transition-colors" />
        </a>
        <a
          href="Instagram"
          target="_blank"
          onClick={(e) => e.preventDefault()} // stops page scroll or navigation
          aria-label="Instagram"
        >
          <Instagram className="hover:text-purple-500 transition-colors" />
        </a>
        <a
          href="X (Twitter)"
          aria-label="X (Twitter)"
          onClick={(e) => e.preventDefault()} // stops page scroll or navigation
        >
          <X className="hover:text-black transition-colors" />
        </a>


      </div>
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">Cyfa Tech</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;


