"use client";

import { motion } from "framer-motion";

export default function Features() {
  const steps = [
    {
      step: "1. Real-time Telemetry",
      description:
        "Sub-second visitor session streams, multi-tab presence detection, 12s socket heartbeats, and instant offline drop beacons.",
      preview: (
        <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white border border-[#EAE5D9] px-3 py-1.5 rounded-full shadow-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-neutral-800 tracking-tight">2 online now</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">ws://live</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between p-2.5 bg-white border border-[#EAE5D9]/70 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                  V
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-900">Visitor 609d68</span>
                  <span className="text-[10px] text-neutral-400">/auth/register</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-white/60 border border-[#EAE5D9]/50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                  V
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-neutral-700">Visitor 8f31b2</span>
                  <span className="text-[10px] text-neutral-400">/checkout</span>
                </div>
              </div>
              <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">1m ago</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: "2. Zero Cookies & Pure Privacy",
      description:
        "100% cookie-free and compliant with GDPR, CCPA, and PECR out of the box. No cookie consent banners or intrusive cross-site fingerprinting.",
      preview: (
        <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Compliance</span>
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              No Banner Required
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-center flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-neutral-900">SHA-256 Daily Rotate</span>
              <span className="text-[11px] text-neutral-500">Anonymous one-way salt hash per domain</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#EAE5D9]/60 text-[10px] text-neutral-400">
            <span>Cookies: 0 B</span>
            <span>Local PII: None</span>
          </div>
        </div>
      ),
    },
    {
      step: "3. Auto-Tracked Goals",
      description:
        "Automatically captures button clicks, outbound links, and scroll depth milestones (25%, 50%, 75%, 90%) without manual code configuration.",
      preview: (
        <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-50 to-white">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Auto Events</span>
            <span className="text-[10px] font-mono text-neutral-400">telemetry:event</span>
          </div>

          <div className="flex flex-col gap-2.5 my-auto">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-700">Scroll Depth Milestone</span>
              <span className="font-semibold text-neutral-900">75%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full w-3/4" />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-medium text-neutral-600 bg-neutral-100 border border-neutral-200 px-2 py-1 rounded-md">
                Click: "Get Started"
              </span>
              <span className="text-[10px] font-medium text-neutral-600 bg-neutral-100 border border-neutral-200 px-2 py-1 rounded-md">
                Viewport: 1440×900
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#EAE5D9]/60 text-[10px] text-neutral-400">
            <span>Payload Size: &lt; 3KB</span>
            <span>Zero Setup Required</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-24 sm:py-32">
      <div className="w-full max-w-6xl flex flex-col gap-16">
        <motion.div
          initial={{ x: -30, opacity: 0, filter: "blur(8px)" }}
          whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-0.5">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#3A3935]">
            Engineered for speed, privacy, and actionable insight
          </h2>
          <p className="text-xs sm:text-sm text-[#3A3935] max-w-lg leading-relaxed">
            Lightweight, privacy-friendly telemetry built for modern web applications, high-performance APIs, and forward-thinking product teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ x: -40, opacity: 0, filter: "blur(8px)" }}
              whileInView={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }}
              className="flex flex-col gap-6"
            >
              <div className="w-full h-64 sm:h-72 bg-white border border-[#EAE5D9] rounded-3xl overflow-hidden shadow-xs">
                {item.preview}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-[#1E1E1C]">
                  {item.step}
                </h3>
                <p className="text-xs sm:text-sm text-[#3A3935] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
