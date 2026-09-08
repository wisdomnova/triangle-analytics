"use client";

import { motion } from "framer-motion";

export default function Features() {
  const steps = [
    {
      step: "1. Real-time Telemetry",
      description:
        "Sub-second visitor session streams, multi-tab presence detection, 12s socket heartbeats, and instant offline drop beacons.",
    },
    {
      step: "2. Zero Cookies & Pure Privacy",
      description:
        "100% cookie-free and compliant with GDPR, CCPA, and PECR out of the box. No cookie consent banners or intrusive cross-site fingerprinting.",
    },
    {
      step: "3. Auto-Tracked Goals",
      description:
        "Automatically captures button clicks, outbound links, and scroll depth milestones (25%, 50%, 75%, 90%) without manual code configuration.",
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
              <div className="w-full h-64 sm:h-72 bg-white rounded-3xl" />
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
