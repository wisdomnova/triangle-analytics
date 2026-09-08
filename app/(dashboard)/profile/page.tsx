"use client";

import { useState } from "react";
import Input from "@/components/dashboard/Input";
import Checkbox from "@/components/dashboard/Checkbox";
import Dropdown from "@/components/dashboard/Dropdown";

export default function ProfilePage() {
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@company.com");
  const [domain, setDomain] = useState("app.triangle.io");
  const [timezone, setTimezone] = useState("utc");

  const [anonymizeIp, setAnonymizeIp] = useState(true);
  const [excludeLocalhost, setExcludeLocalhost] = useState(true);
  const [cookieFree, setCookieFree] = useState(true);

  const timezoneOptions = [
    { value: "utc", label: "UTC (Coordinated Universal Time)" },
    { value: "est", label: "EST (Eastern Standard Time)" },
    { value: "pst", label: "PST (Pacific Standard Time)" },
    { value: "gmt", label: "GMT (Greenwich Mean Time)" },
  ];

  const scriptSnippet = `<script defer src="https://analytics.triangle.io/tracker.js" data-site-id="tri_992140"></script>`;

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl">
      <h1 className="text-xl font-light text-neutral-900">
        Account settings and tracking script configuration
      </h1>

      {/* Account Info Panel */}
      <div className="bg-white rounded-3xl p-8 flex flex-col gap-6">
        <span className="text-sm font-normal text-neutral-900">
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
          <Input
            label="Registered Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />

          <Dropdown
            label="Analytics Timezone"
            options={timezoneOptions}
            selected={timezone}
            onChange={setTimezone}
            widthClass="w-full"
          />
        </div>
      </div>

      {/* Tracking Script Snippet Panel */}
      <div className="bg-white rounded-3xl p-8 flex flex-col gap-6">
        <span className="text-sm font-normal text-neutral-900">
          Lightweight Tracking Code
        </span>

        <p className="text-xs font-light text-neutral-500 leading-relaxed">
          Insert this snippet into the header of your HTML to start capturing lightweight telemetry.
        </p>

        <div className="bg-neutral-100/80 p-5 rounded-2xl overflow-x-auto">
          <code className="text-xs font-mono text-neutral-800 whitespace-nowrap">
            {scriptSnippet}
          </code>
        </div>
      </div>

      {/* Privacy Preferences */}
      <div className="bg-white rounded-3xl p-8 flex flex-col gap-6">
        <span className="text-sm font-normal text-neutral-900">
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

        <div className="pt-4">
          <button
            type="button"
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-normal px-6 py-3 rounded-full transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
