"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const fullText = "Lightweight web analytics for modern apps";
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-28 md:pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="w-full max-w-6xl flex flex-col gap-12 items-start"
      >
        <div className="w-full flex justify-start px-2 sm:px-4 mb-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#3A3935] text-left flex items-center min-h-[48px] sm:min-h-[64px] md:min-h-[80px]">
            <span>{displayText}</span>
            {!isTypingComplete && (
              <span className="inline-block w-1 h-8 sm:h-12 md:h-14 bg-[#3A3935] ml-2 animate-pulse" />
            )}
          </h2>
        </div>

        <div className="w-full border border-[#EAE5D9] rounded-[32px] overflow-hidden bg-white p-2 sm:p-4 flex items-center justify-center">
          <img
            src="/images/desktop_preview.png"
            alt="Triangle Analytics Dashboard Preview"
            className="w-full h-auto object-contain rounded-[20px] sm:rounded-[24px] border border-[#EAE5D9]/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
