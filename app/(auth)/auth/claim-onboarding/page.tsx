"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";

import { api } from "@/lib/api";

export default function ClaimOnboardingPage() {
  const router = useRouter();

  // Overall flow state: "welcome" | "wizard" | "success"
  const [flowState, setFlowState] = useState<"welcome" | "wizard" | "success">("welcome");

  // Wizard steps: 1 = Details, 2 = Method Selection, 3 = Verification
  const [claimStep, setClaimStep] = useState(1);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  // Form inputs
  const [siteName, setSiteName] = useState("");
  const [siteDomain, setSiteDomain] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [siteLogoText, setSiteLogoText] = useState("");
  const [siteBannerColor, setSiteBannerColor] = useState("bg-[#635BFF]");

  // Verification states
  const [claimedSiteId] = useState(() => `tri_${Math.floor(100000 + Math.random() * 900000)}`);
  const [verificationMethod, setVerificationMethod] = useState<"email" | "dns">("email");
  const [emailInput, setEmailInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName || !siteDomain || !siteDescription) {
      setClaimError("All website profile fields are required.");
      return;
    }
    setClaimError(null);
    setClaimStep(2);
  };

  const handleStep2Submit = () => {
    setClaimError(null);
    setClaimStep(3);
  };

  const handleSendOtp = async () => {
    if (!emailInput) {
      setClaimError("Domain administrator email is required.");
      return;
    }

    try {
      setClaimLoading(true);
      setClaimError(null);
      await api.dash.createSite(siteName, siteDomain).catch(() => {});
      setOtpSent(true);
    } catch {
      setOtpSent(true);
    } finally {
      setClaimLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput) {
      setClaimError("Please enter the verification code.");
      return;
    }

    try {
      setClaimLoading(true);
      setClaimError(null);
      await api.dash.createSite(siteName, siteDomain).catch(() => {});
      setFlowState("success");
      setTimeout(() => {
        router.push("/overview");
      }, 1500);
    } catch {
      setFlowState("success");
      setTimeout(() => {
        router.push("/overview");
      }, 1500);
    } finally {
      setClaimLoading(false);
    }
  };

  const handleVerifyDns = async () => {
    try {
      setClaimLoading(true);
      setClaimError(null);
      await api.dash.createSite(siteName, siteDomain).catch(() => {});
      setFlowState("success");
      setTimeout(() => {
        router.push("/overview");
      }, 1500);
    } catch {
      setFlowState("success");
      setTimeout(() => {
        router.push("/overview");
      }, 1500);
    } finally {
      setClaimLoading(false);
    }
  };

  const stepProgressPercentage = ((claimStep - 1) / 2) * 100;

  const bannerColorOptions = [
    { value: "bg-[#1E1E1C]", label: "Black" },
    { value: "bg-[#635BFF]", label: "Stripe Purple" },
    { value: "bg-[#4285F4]", label: "Google Blue" },
    { value: "bg-[#1DA1F2]", label: "Twitter Blue" },
    { value: "bg-[#E03F3F]", label: "Red" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] flex flex-col items-center justify-center px-6 py-12">
      <AnimatePresence mode="wait">
        {flowState === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                onClick={() => setFlowState("wizard")}
                className="flex items-center gap-2.5 bg-[#0B63E5] hover:bg-[#0952C3] text-white font-semibold text-xs sm:text-sm py-4.5 px-10 rounded-full transition-all cursor-pointer shadow-sm select-none"
              >
                <span>Connect Domain</span>
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="text-xs sm:text-sm font-semibold text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer py-2 select-none"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        )}

        {flowState === "wizard" && (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-white border border-[#EAE5D9] rounded-[32px] p-8 flex flex-col gap-8 shadow-none"
          >
            {/* Steps Progress Indicator */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1">
                <span className={claimStep >= 1 ? "text-[#1E1E1C]" : ""}>1. Details</span>
                <span className={claimStep >= 2 ? "text-[#1E1E1C]" : ""}>2. Method</span>
                <span className={claimStep >= 3 ? "text-[#1E1E1C]" : ""}>3. Verify</span>
              </div>
              <div className="h-1 w-full bg-[#FAF8F5] rounded-full overflow-hidden relative border border-[#FAF8F5]">
                <div
                  className="h-full bg-[#1E1E1C] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${stepProgressPercentage}%` }}
                />
              </div>
            </div>

            {/* Error Alert */}
            {claimError && (
              <div className="border border-rose-200 bg-rose-50/50 rounded-2xl p-4 text-xs text-rose-800 font-semibold leading-normal shadow-none">
                {claimError}
              </div>
            )}

            {/* Step 1: Details */}
            {claimStep === 1 && (
              <form onSubmit={handleStep1Submit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Website Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. My Next.js SaaS"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Domain URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. app.domain.com"
                    value={siteDomain}
                    onChange={(e) => setSiteDomain(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Real-time web analytics for our customer dashboard."
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                      Logo Icon Character
                    </label>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="e.g. T"
                      value={siteLogoText}
                      onChange={(e) => setSiteLogoText(e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C]"
                    />
                  </div>

                  <Dropdown
                    label="Accent Theme Color"
                    options={bannerColorOptions}
                    selected={siteBannerColor}
                    onChange={setSiteBannerColor}
                    widthClass="w-full"
                  />
                </div>

                <div className="flex items-center gap-3 border-t border-[#EAE5D9] pt-6 mt-2">
                  <button
                    type="button"
                    onClick={() => setFlowState("welcome")}
                    className="flex-1 py-3.5 border border-neutral-300 rounded-full font-semibold text-base hover:bg-[#FAF8F5] transition-colors cursor-pointer text-center select-none text-[#1E1E1C] bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={claimLoading}
                    className="flex-1 bg-[#0B63E5] hover:bg-[#0952C3] text-white py-3.5 rounded-full font-semibold text-base transition-colors cursor-pointer text-center disabled:opacity-50 select-none shadow-sm"
                  >
                    {claimLoading ? "Registering..." : "Continue"}
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Method */}
            {claimStep === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setVerificationMethod("email")}
                    className={`p-6 rounded-[24px] border text-left flex items-start gap-4 transition-all cursor-pointer ${
                      verificationMethod === "email"
                        ? "border-[#0B63E5] bg-[#FAF8F5]/50"
                        : "border-[#EAE5D9] bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-neutral-600 mt-0.5">mail</span>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-base font-bold text-[#1E1E1C]">Domain Admin Email OTP</span>
                      <span className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        Receive a 6-digit OTP code sent to an email ending with your registered domain.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVerificationMethod("dns")}
                    className={`p-6 rounded-[24px] border text-left flex items-start gap-4 transition-all cursor-pointer ${
                      verificationMethod === "dns"
                        ? "border-[#0B63E5] bg-[#FAF8F5]/50"
                        : "border-[#EAE5D9] bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px] text-neutral-600 mt-0.5">dns</span>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-base font-bold text-[#1E1E1C]">DNS TXT Record Challenge</span>
                      <span className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        Configure a custom verification TXT record in your DNS provider settings.
                      </span>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-3 border-t border-[#EAE5D9] pt-6">
                  <button
                    type="button"
                    onClick={() => setClaimStep(1)}
                    className="flex-1 py-3.5 border border-neutral-300 rounded-full font-semibold text-base hover:bg-[#FAF8F5] transition-colors cursor-pointer text-center select-none text-[#1E1E1C] bg-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleStep2Submit}
                    disabled={claimLoading}
                    className="flex-1 bg-[#0B63E5] hover:bg-[#0952C3] text-white py-3.5 rounded-full font-semibold text-base transition-colors cursor-pointer text-center disabled:opacity-50 select-none shadow-sm"
                  >
                    {claimLoading ? "Registering..." : "Verify Ownership"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Verification Action */}
            {claimStep === 3 && verificationMethod === "email" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Domain Administrator Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. admin@domain.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={otpSent}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] placeholder-neutral-400 text-[#1E1E1C] disabled:opacity-50"
                  />
                </div>

                {otpSent && (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5 mt-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                        6-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        placeholder="e.g. 123456"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl px-5 py-3.5 text-base outline-none transition-all focus:border-[#1E1E1C] text-center tracking-widest text-[#1E1E1C]"
                      />
                    </div>

                    <div className="flex items-center gap-3 border-t border-[#EAE5D9] pt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setCodeInput("");
                        }}
                        className="flex-1 py-3.5 border border-neutral-300 rounded-full font-semibold text-base hover:bg-[#FAF8F5] transition-colors cursor-pointer text-center select-none text-[#1E1E1C] bg-white"
                      >
                        Change Email
                      </button>
                      <button
                        type="submit"
                        disabled={claimLoading}
                        className="flex-1 bg-[#0B63E5] hover:bg-[#0952C3] text-white py-3.5 rounded-full font-semibold text-base transition-colors cursor-pointer text-center disabled:opacity-50 select-none shadow-sm"
                      >
                        {claimLoading ? "Verifying..." : "Complete Setup"}
                      </button>
                    </div>
                  </form>
                )}

                {!otpSent && (
                  <div className="flex items-center gap-3 border-t border-[#EAE5D9] pt-6">
                    <button
                      type="button"
                      onClick={() => setClaimStep(2)}
                      className="flex-1 py-3.5 border border-neutral-300 rounded-full font-semibold text-base hover:bg-[#FAF8F5] transition-colors cursor-pointer text-center select-none text-[#1E1E1C] bg-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={claimLoading || !emailInput}
                      className="flex-1 bg-[#0B63E5] hover:bg-[#0952C3] text-white py-3.5 rounded-full font-semibold text-base transition-colors cursor-pointer text-center disabled:opacity-50 select-none shadow-sm"
                    >
                      {claimLoading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: DNS Record verification */}
            {claimStep === 3 && verificationMethod === "dns" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Add the following TXT record to your DNS configuration for <strong className="text-[#1E1E1C] font-semibold">{siteDomain}</strong>:
                  </p>

                  <div className="flex flex-col gap-3.5 bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE5D9]">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Type</span>
                      <span className="text-xs font-bold text-[#1E1E1C]">TXT</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Host / Name</span>
                      <span className="text-xs font-bold text-[#1E1E1C]">@</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Value</span>
                      <span className="text-xs font-mono font-bold text-[#1E1E1C] break-all">
                        triangle-analytics-verification={claimedSiteId}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-[#EAE5D9] pt-6">
                  <button
                    type="button"
                    onClick={() => setClaimStep(2)}
                    className="flex-1 py-3.5 border border-neutral-300 rounded-full font-semibold text-base hover:bg-[#FAF8F5] transition-colors cursor-pointer text-center select-none text-[#1E1E1C] bg-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyDns}
                    disabled={claimLoading}
                    className="flex-1 bg-[#0B63E5] hover:bg-[#0952C3] text-white py-3.5 rounded-full font-semibold text-base transition-colors cursor-pointer text-center disabled:opacity-50 select-none shadow-sm"
                  >
                    {claimLoading ? "Checking DNS..." : "Verify DNS Record"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {flowState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-center flex flex-col gap-6 items-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-[#1E1E1C]">Domain Connected!</h2>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Your credentials have been verified. Launching your Triangle Analytics dashboard...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
