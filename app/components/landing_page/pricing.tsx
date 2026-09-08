"use client";

import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-20 pb-4">
      <motion.div 
        initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl flex flex-col gap-10 items-center text-center"
      >
        <div className="flex flex-col gap-3 items-center">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1E1E1C]">
            Choose your perfect plan
          </h2>
          <p className="text-xs sm:text-sm text-[#3A3935] max-w-md leading-relaxed mt-1">
            Free access during our public beta. No credit card required.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl">
          {/* Card 1: Beta Plan */}
          <div className="bg-white border border-[#EAE5D9] rounded-[32px] p-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Beta Plan
                </span>
                <div className="flex items-baseline gap-1 text-[#1E1E1C]">
                  <span className="text-5xl font-bold tracking-tight">$0</span>
                  <span className="text-sm font-medium text-neutral-400">/month</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#3A3935] leading-relaxed">
                Complete access to real-time live telemetry, unlimited custom domains, interaction event auto-tracking, and sub-second Socket.IO updates.
              </p>
            </div>
          </div>

          {/* Card 2: Pro Plan (Coming Soon) */}
          <div className="bg-[#FAF8F5]/40 border border-[#EAE5D9]/60 rounded-[32px] p-8 flex flex-col justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-neutral-100 border border-neutral-200 text-neutral-500 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
              Coming Soon
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Pro Plan
                </span>
                <div className="flex items-baseline gap-1 text-[#1E1E1C]/50">
                  <span className="text-5xl font-bold tracking-tight">TBD</span>
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">(Price Unknown)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Extended timeseries retention, multi-member workspace teams, automated alert notifications, webhook delivery pipelines, and priority developer SLAs.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
