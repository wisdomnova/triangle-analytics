"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#EAE5D9] pt-16 pb-8 px-6 sm:px-8 flex flex-col items-center shrink-0">
      <motion.div 
        initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 border-b border-[#EAE5D9] pb-12 items-start"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo-solid-plain.png"
              alt="Triangle Analytics Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-semibold tracking-tight text-[#1E1E1C]">
              Analytics
            </span>
          </div>
          <p className="text-xs text-[#3A3935] leading-relaxed max-w-xs">
            The lightweight, cookie-free analytics platform providing real-time telemetry and conversion insights.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-0.5">
            Platform
          </span>
          <div className="flex flex-col gap-2">
            <Link href="#features" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Features
            </Link>
            <Link href="#pricing" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Pricing
            </Link>
            <Link href="#docs" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Script & API
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-0.5">
            Legal & Privacy
          </span>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-neutral-400 cursor-default">
              GDPR & CCPA Compliant
            </span>
            <span className="text-xs text-neutral-400 cursor-default">
              100% Cookie-Free
            </span>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-6xl relative select-none pointer-events-none overflow-hidden h-28 sm:h-36 md:h-48 flex items-end justify-center mt-6">
        <span className="text-[14vw] font-black text-[#1E1E1C] tracking-tight leading-none translate-y-6 sm:translate-y-8 md:translate-y-12">
          triangle
        </span>
      </div>

      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE5D9] pt-6 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
        <span>
          &copy; 2026 Triangle Analytics. All rights reserved.
        </span>
        <div className="flex items-center gap-3.5 select-none">
          <svg className="w-5 h-3 rounded border border-neutral-200 shrink-0" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>United Kingdom</title>
            <rect width="50" height="30" fill="#012169"/>
            <path d="M0 0L50 30M50 0L0 30" stroke="white" strokeWidth="6"/>
            <path d="M0 0L50 30M50 0L0 30" stroke="#C8102E" strokeWidth="2"/>
            <path d="M25 0V30M0 15H50" stroke="white" strokeWidth="10"/>
            <path d="M25 0V30M0 15H50" stroke="#C8102E" strokeWidth="6"/>
          </svg>
          <svg className="w-5 h-3 rounded border border-neutral-200 shrink-0" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Nigeria</title>
            <rect width="2" height="3" fill="#008751"/>
            <rect x="2" width="2" height="3" fill="#ffffff"/>
            <rect x="4" width="2" height="3" fill="#008751"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}
