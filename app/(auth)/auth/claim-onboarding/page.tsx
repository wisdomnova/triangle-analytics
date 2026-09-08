"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { IconCopy, IconCheck, IconArrowRight, IconWorld, IconTag } from "@tabler/icons-react";

import { api, SiteItem } from "@/lib/api";

export default function ClaimOnboardingPage() {
  const router = useRouter();

  // Flow states: "welcome" | "create" | "snippet"
  const [flowState, setFlowState] = useState<"welcome" | "create" | "snippet">("welcome");

  // Form states
  const [domainUrl, setDomainUrl] = useState("");
  const [domainName, setDomainName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createdSite, setCreatedSite] = useState<SiteItem | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreateDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainUrl.trim()) {
      setErrorMsg("Please enter a valid domain address");
      return;
    }

    setErrorMsg("");
    setIsLoading(true);

    try {
      const site = await api.dash.createSite(
        domainName.trim() || domainUrl.trim(),
        domainUrl.trim()
      );
      setCreatedSite(site);
      setFlowState("snippet");
    } catch (err: unknown) {
      setErrorMsg((err as Error).message || "Failed to create domain property");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!createdSite?.siteId) return;
    const snippet = `<script defer src="https://triangle-analytics.vercel.app/tracker.js" data-site-id="${createdSite.siteId}"></script>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {/* Step 1: Welcome Splash */}
        {flowState === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-center flex flex-col gap-10 items-center"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl sm:text-7xl font-medium tracking-tighter text-[#1E1E1C]">
                Thanks for signing up.
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 font-medium max-w-lg mx-auto leading-relaxed">
                Connect your domain to start capturing privacy-friendly, lightweight analytics in real-time.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 mt-2">
              <button
                type="button"
                onClick={() => setFlowState("create")}
                className="flex items-center gap-2.5 bg-[#0B63E5] hover:bg-[#0952C3] text-white font-semibold text-xs sm:text-sm py-4.5 px-10 rounded-full transition-all cursor-pointer shadow-sm select-none"
              >
                <span>Connect Domain</span>
                <IconArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => router.push("/overview")}
                className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer py-2 select-none"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Register Domain Form */}
        {flowState === "create" && (
          <motion.div
            key="create"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl bg-white border border-[#EAE5D9] rounded-[32px] p-8 sm:p-10 flex flex-col gap-8 shadow-[0_24px_80px_rgb(0,0,0,0.02)]"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Step 1 of 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1C]">
                Connect your website
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Add your website domain to generate your custom tracking snippet.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-4 py-3 rounded-2xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateDomain} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                  <IconWorld size={14} className="text-neutral-400" />
                  <span>Domain Hostname</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. app.mycompany.com or mystore.io"
                  value={domainUrl}
                  onChange={(e) => setDomainUrl(e.target.value)}
                  autoFocus
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
                  <IconTag size={14} className="text-neutral-400" />
                  <span>Property Name (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Production SaaS or Marketing Site"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-2xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C]"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#EAE5D9]">
                <button
                  type="button"
                  onClick={() => setFlowState("welcome")}
                  className="flex-1 py-3.5 border border-neutral-300 rounded-full font-semibold text-sm hover:bg-[#FAF8F5] transition-colors cursor-pointer text-center select-none text-[#1E1E1C] bg-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#0B63E5] hover:bg-[#0952C3] text-white py-3.5 rounded-full font-semibold text-sm transition-colors cursor-pointer text-center disabled:opacity-50 select-none shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? "Creating Property..." : "Create & Get Script"}</span>
                  <IconArrowRight size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 3: Embed Snippet & Completion */}
        {flowState === "snippet" && createdSite && (
          <motion.div
            key="snippet"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white border border-[#EAE5D9] rounded-[32px] p-8 sm:p-10 flex flex-col gap-8 shadow-[0_24px_80px_rgb(0,0,0,0.02)]"
          >
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold w-fit border border-emerald-100">
                <IconCheck size={14} />
                <span>Domain Property Created</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E1C]">
                Embed tracking snippet
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Add this lightweight, privacy-preserving script tag inside the <code className="text-neutral-800 font-mono text-xs bg-neutral-100 px-1.5 py-0.5 rounded">&lt;head&gt;</code> of <strong className="text-neutral-800 font-semibold">{createdSite.domain}</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  HTML Tracking Code
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0B63E5] hover:text-[#0952C3] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <IconCheck size={14} className="text-emerald-600" />
                      <span className="text-emerald-600">Copied to clipboard!</span>
                    </>
                  ) : (
                    <>
                      <IconCopy size={14} />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#FAF8F5] border border-[#EAE5D9] p-5 rounded-2xl overflow-x-auto">
                <code className="text-xs font-mono text-neutral-800 whitespace-nowrap select-all">
                  {`<script defer src="https://triangle-analytics.vercel.app/tracker.js" data-site-id="${createdSite.siteId}"></script>`}
                </code>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#EAE5D9]">
              <button
                type="button"
                onClick={() => router.push("/overview")}
                className="w-full bg-[#1E1E1C] hover:bg-black text-white py-4 rounded-full font-semibold text-sm transition-colors cursor-pointer text-center select-none shadow-sm flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <IconArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
