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

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    } else {
      api.auth.getMe().then((res) => {
        if (res?.user) {
          setName(res.user.name || "");
          setEmail(res.user.email || "");
        }
      }).catch(() => {});
    }
  }, []);

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
    ? `<script defer src="https://triangle-analytics-api-5e8e94f7dd98.herokuapp.com/api/v1/tracker.js" data-site-id="${currentDomain.siteId}"></script>`
    : "<!-- Connect a domain property first to generate your tracking snippet -->";

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900">
        Account settings
      </h1>

      {/* Account Info Panel */}
      <div className="bg-white rounded-3xl p-8 flex flex-col gap-6">
        <span className="text-base font-light text-neutral-900">
          User Account Details
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
      <div className="bg-white rounded-3xl p-8 flex flex-col gap-6">
        <span className="text-base font-light text-neutral-900">
          Lightweight Tracking Code {currentDomain ? `(${currentDomain.domain})` : ""}
        </span>

        <p className="text-xs font-light text-neutral-500 leading-relaxed">
          {currentDomain
            ? `Insert this snippet into the header of your HTML to start capturing lightweight telemetry for ${currentDomain.name}.`
            : "Connect your website domain to generate a snippet and start capturing telemetry."}
        </p>

        <div className="bg-neutral-100/80 p-5 rounded-2xl overflow-x-auto">
          <code className="text-xs font-mono text-neutral-800 whitespace-nowrap">
            {scriptSnippet}
          </code>
        </div>
      </div>

      {/* Privacy Preferences */}
      <div className="bg-white rounded-3xl p-8 flex flex-col gap-6">
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

        <div className="pt-4 flex items-center gap-4">
          <button
            type="button"
            className="bg-[#0B63E5] hover:bg-[#0952C3] text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
          >
            Save Preferences
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
