"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-4 z-50 w-full px-4 sm:px-6 md:px-8 flex justify-center"
    >
      <div className="w-auto bg-[#ffffff]/70 backdrop-blur-md border border-[#EAE5D9]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between gap-8 sm:gap-12 md:gap-16 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          <img
            src="/images/logo-solid-plain.png"
            alt="Triangle Analytics Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="text-sm font-semibold tracking-tight text-[#1E1E1C]">
            Analytics
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-[#3A3935] hover:text-[#1E1E1C] transition-colors"
          >
            Features
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-[#3A3935] hover:text-[#1E1E1C] transition-colors"
          >
            Script & API
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-[#3A3935] hover:text-[#1E1E1C] transition-colors"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-sm font-semibold bg-neutral-100 hover:bg-neutral-200 text-[#1E1E1C] px-5 py-2.5 rounded-full transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/join"
            className="group flex items-center gap-1.5 text-sm font-medium bg-[#1E1E1C] text-[#FAF6F0] pl-5 pr-4 py-2.5 rounded-full hover:bg-[#323230] transition-colors"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              arrow_outward
            </span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
