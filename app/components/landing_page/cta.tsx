"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-16 pb-20">
      <motion.div 
        initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl flex flex-col items-center text-center gap-8"
      >
        <h2 className="text-4xl sm:text-7xl md:text-8xl font-medium tracking-tight text-[#1E1E1C] leading-[1.05]">
          Start measuring.
        </h2>
        <p className="text-sm sm:text-base text-[#3A3935] max-w-md leading-relaxed">
          Embed privacy-friendly analytics and stream real-time platform telemetry in under two minutes.
        </p>
        <Link
          href="/auth/join"
          className="group flex items-center gap-1.5 text-sm font-semibold bg-[#1E1E1C] text-[#FAF6F0] pl-6 pr-5 py-3 rounded-full hover:bg-[#323230] transition-colors mt-4 shadow-xs"
        >
          <span>Get started for free</span>
          <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            arrow_outward
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
