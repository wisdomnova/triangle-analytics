"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountryFlag from "@/components/dashboard/CountryFlag";

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
        {/* Brand info */}
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
            The lightweight, privacy-first web analytics platform providing real-time telemetry, session streams, and automated conversion tracking.
          </p>
        </div>

        {/* Platform Links */}
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
            <Link href="/auth/signin" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Dashboard Sign In
            </Link>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-0.5">
            Legal & Privacy
          </span>
          <div className="flex flex-col gap-2">
            <Link href="#features" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Privacy Policy (100% Cookieless)
            </Link>
            <Link href="#features" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Terms of Service
            </Link>
            <Link href="https://triangle-analytics-api-5e8e94f7dd98.herokuapp.com/health" target="_blank" className="text-xs text-[#3A3935] hover:text-[#1E1E1C] transition-colors w-max">
              Platform Status
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Signature Watermark */}
      <div className="w-full max-w-6xl relative select-none pointer-events-none overflow-hidden h-28 sm:h-36 md:h-48 flex items-end justify-center mt-6">
        <span className="text-[14vw] font-black text-[#1E1E1C] tracking-tight leading-none translate-y-6 sm:translate-y-8 md:translate-y-12">
          triangle
        </span>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE5D9] pt-6 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
        <span>
          &copy; 2026 Triangle Analytics. All rights reserved.
        </span>
        <div className="flex items-center gap-3 select-none">
          <CountryFlag
            country="United Kingdom"
            title="United Kingdom"
            className="w-5 h-3.5 rounded-[2px] object-cover shrink-0 border border-neutral-200/60"
          />
          <CountryFlag
            country="Nigeria"
            title="Nigeria"
            className="w-5 h-3.5 rounded-[2px] object-cover shrink-0 border border-neutral-200/60"
          />
        </div>
      </div>
    </footer>
  );
}
