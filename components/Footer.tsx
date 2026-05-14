"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Instagram, X, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Smartphones",    href: "/products?category=smartphones" },
    { label: "Audio",          href: "/products?category=audio"        },
    { label: "Smartwatches",   href: "/products?category=smartwatches" },
    { label: "Power Banks",    href: "/products?category=power-banks"  },
    { label: "Laptops",        href: "/products?category=laptops"      },
    { label: "Gaming",         href: "/products?category=games"        },
  ],
  Company: [
    { label: "About Us",       href: "/about"    },
    { label: "All Products",   href: "/products" },
    { label: "Checkout",       href: "/checkout" },
    { label: "Careers",        href: "#"         },
    { label: "Press",          href: "#"         },
  ],
  Support: [
    { label: "FAQ",               href: "#" },
    { label: "Shipping Policy",   href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Warranty Info",     href: "#" },
    { label: "Privacy Policy",    href: "#" },
    { label: "Terms of Service",  href: "#" },
  ],
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/NosaCyfa001",
    icon: Github,
    hoverClass: "hover:text-gray-900",
    external: true,
  },
  {
    label: "Instagram",
    href: "#",
    icon: Instagram,
    hoverClass: "hover:text-pink-500",
    external: false,
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: X,
    hoverClass: "hover:text-sky-400",
    external: false,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 border-t border-blue-100">

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Logo — matches navbar exactly */}
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/cyfa.png"
                alt="Cyfa Tech"
                width={120}
                height={50}
                className="object-contain"
              />
            </Link>

            {/* Tagline */}
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Unlock the future with cutting-edge tech, gadgets & accessories for everyday life. Authentic products, fast delivery, expert support.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Lagos, Abuja, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>cyfatechgadgets@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>+234 913 249 6929</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 pt-1">
              {socials.map(({ label, href, icon: Icon, hoverClass, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`w-9 h-9 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 ${hoverClass} transition-all duration-200 hover:scale-110 hover:shadow-md`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-blue-200/60" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-gray-700">Cyfa Tech</span>
          {" "}— All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">We accept:</span>
          <div className="flex items-center gap-2">
            {["Paystack", "Cards", "Bank Transfer"].map((method) => (
              <span
                key={method}
                className="text-xs px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500 font-medium shadow-sm"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;