"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DeveloperSimplicity() {
  const [activeTab, setActiveTab] = useState("HTML Script");
  const [copied, setCopied] = useState(false);

  const snippets: Record<string, string> = {
    "HTML Script": `<!-- Place in the <head> of your website -->
<script
  defer
  src="https://triangle-analytics.vercel.app/tracker.js"
  data-site-id="tri_YOUR_SITE_ID"
></script>`,
    "Next.js App Router": `// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://triangle-analytics.vercel.app/tracker.js"
          data-site-id="tri_YOUR_SITE_ID"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="docs" className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-28">
      <motion.div
        initial={{ y: 40, opacity: 0, filter: "blur(12px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl flex flex-col gap-10 items-center text-center"
      >
        <div className="flex flex-col gap-3 items-center">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Developer tools
          </span>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#1E1E1C]">
            One snippet. Instant telemetry.
          </h2>
          <p className="text-xs sm:text-sm text-[#3A3935] max-w-md leading-relaxed mt-1">
            Install via a lightweight script snippet or embed directly into modern Next.js and React web applications.
          </p>
        </div>

        <div className="w-full bg-[#FAF8F5] border border-[#EAE5D9] rounded-3xl p-6 sm:p-8 flex flex-col gap-4 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EAE5D9] pb-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {Object.keys(snippets).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setCopied(false);
                  }}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-[#1E1E1C] text-[#FAF6EE]"
                      : "text-neutral-500 hover:text-[#1E1E1C] hover:bg-neutral-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-semibold text-[#1E1E1C] bg-white border border-[#EAE5D9] px-4 py-1.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
            >
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>

          <pre className="text-xs sm:text-sm text-[#1E1E1C] leading-relaxed overflow-x-auto p-4 bg-white border border-[#EAE5D9] rounded-2xl whitespace-pre font-mono">
            <code>{snippets[activeTab]}</code>
          </pre>
        </div>
      </motion.div>
    </section>
  );
}
