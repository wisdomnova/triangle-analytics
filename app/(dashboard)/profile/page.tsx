"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/dashboard/Input";
import Checkbox from "@/components/dashboard/Checkbox";
import Dropdown from "@/components/dashboard/Dropdown";
import { useDomain } from "@/context/DomainContext";
import { api, getStoredUser } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { currentDomain, domains, setCurrentDomainId } = useDomain();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("utc");

  const [anonymizeIp, setAnonymizeIp] = useState(true);
  const [excludeLocalhost, setExcludeLocalhost] = useState(true);
  const [cookieFree, setCookieFree] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    // Load local stored user first
    const stored = getStoredUser();
    if (stored) {
      setName(stored.name || "");
      setEmail(stored.email || "");
      if (stored.timezone) setTimezone(stored.timezone);
      if (stored.preferences) {
        if (typeof stored.preferences.anonymizeIp === "boolean") setAnonymizeIp(stored.preferences.anonymizeIp);
        if (typeof stored.preferences.excludeLocalhost === "boolean") setExcludeLocalhost(stored.preferences.excludeLocalhost);
        if (typeof stored.preferences.cookieFree === "boolean") setCookieFree(stored.preferences.cookieFree);
      }
    }

    // Fetch fresh user profile from backend
    api.auth.getMe().then((res) => {
      if (res?.user) {
        setName(res.user.name || "");
        setEmail(res.user.email || "");
        if (res.user.timezone) setTimezone(res.user.timezone);
        if (res.user.preferences) {
          if (typeof res.user.preferences.anonymizeIp === "boolean") setAnonymizeIp(res.user.preferences.anonymizeIp);
          if (typeof res.user.preferences.excludeLocalhost === "boolean") setExcludeLocalhost(res.user.preferences.excludeLocalhost);
          if (typeof res.user.preferences.cookieFree === "boolean") setCookieFree(res.user.preferences.cookieFree);
        }
      }
    }).catch(() => {});
  }, []);

  const handleSavePreferences = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    const preferences = {
      anonymizeIp,
      excludeLocalhost,
      cookieFree,
    };

    try {
      await api.auth.updateProfile({
        name,
        timezone,
        preferences,
      });

      // Also persist to localStorage for offline access
      localStorage.setItem("_tri_privacy_rules", JSON.stringify(preferences));

      setSaveStatus({
        type: "success",
        message: "Account details & telemetry rules saved successfully!",
      });
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err) {
      setSaveStatus({
        type: "error",
        message: (err as Error)?.message || "Failed to save preferences. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    api.auth.signOut();
    router.push("/auth/signin");
  };

  const timezoneOptions = [
    { value: "utc", label: "UTC (Coordinated Universal Time)" },
    { value: "est", label: "EST (Eastern Standard Time)" },
    { value: "pst", label: "PST (Pacific Standard Time)" },
    { value: "gmt", label: "GMT (Greenwich Mean Time)" },
  ];

  const domainOptions = domains.map((d) => ({
    value: d.siteId || d.id,
    label: `${d.domain} (${d.name})`,
  }));

  const scriptSnippet = currentDomain
    ? `<script defer src="https://triangle-analytics.vercel.app/tracker.js" data-site-id="${currentDomain.siteId}"></script>`
    : "<!-- Connect a domain property first to generate your tracking snippet -->";

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
        Account settings
      </h1>

      {/* Account Info Panel */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6">
        <span className="text-base font-light text-neutral-900">
          User Account Details
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />

          <div className="flex flex-col gap-1 w-full">
            <Input
              label="Email Address (Locked)"
              type="email"
              value={email}
              disabled={true}
              readOnly={true}
              className="disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-100/90 text-neutral-500 select-none"
            />
            <span className="text-[11px] text-neutral-400 font-light pl-1">
              Primary account email cannot be changed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {domains.length > 0 && currentDomain ? (
            <Dropdown
              label="Active Domain Context"
              options={domainOptions}
              selected={currentDomain.siteId || currentDomain.id}
              onChange={(val) => setCurrentDomainId(val)}
              widthClass="w-full"
              variant="neutral"
            />
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-light text-neutral-400">Active Domain</label>
              <div className="bg-neutral-100 px-4 py-3 rounded-xl text-xs text-neutral-500 font-light">
                No connected domain properties
              </div>
            </div>
          )}

          <Dropdown
            label="Analytics Timezone"
            options={timezoneOptions}
            selected={timezone}
            onChange={setTimezone}
            widthClass="w-full"
            variant="neutral"
          />
        </div>
      </div>

      {/* Tracking Script Snippet Panel */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6">
        <span className="text-base font-light text-neutral-900">
          Lightweight Tracking Code {currentDomain ? `(${currentDomain.domain})` : ""}
        </span>

        <p className="text-xs font-light text-neutral-500 leading-relaxed">
          {currentDomain
            ? `Insert this snippet into the header of your HTML to start capturing lightweight telemetry for ${currentDomain.name}.`
            : "Connect your website domain to generate a snippet and start capturing telemetry."}
        </p>

        <div className="bg-neutral-100/80 p-3 sm:p-5 rounded-2xl overflow-x-auto max-w-full">
          <code className="text-xs font-mono text-neutral-800 whitespace-nowrap">
            {scriptSnippet}
          </code>
        </div>
      </div>

      {/* Privacy Preferences */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6">
        <span className="text-base font-light text-neutral-900">
          Privacy and Telemetry Rules
        </span>

        <div className="flex flex-col gap-5">
          <Checkbox
            checked={anonymizeIp}
            onChange={setAnonymizeIp}
            label="Cryptographically hash client IP addresses to prevent persistent user tracking"
          />

          <Checkbox
            checked={excludeLocalhost}
            onChange={setExcludeLocalhost}
            label="Automatically ignore events originating from localhost and local staging environments"
          />

          <Checkbox
            checked={cookieFree}
            onChange={setCookieFree}
            label="Run in strict cookie free mode for instant GDPR and CCPA compliance without consent banners"
          />
        </div>

        {saveStatus && (
          <div
            className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
              saveStatus.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                : "bg-rose-50 text-rose-700 border border-rose-200/80"
            }`}
          >
            {saveStatus.type === "success" ? (
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            ) : (
              <span className="material-symbols-outlined text-[16px]">error</span>
            )}
            <span>{saveStatus.message}</span>
          </div>
        )}

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleSavePreferences}
            disabled={isSaving}
            className="bg-[#0B63E5] hover:bg-[#0952C3] disabled:opacity-50 text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Saving Preferences...</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            className="border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
