"use client";

import React from "react";
import * as Flags from "country-flag-icons/react/3x2";
import { getCountryCode } from "@/lib/countries";

interface CountryFlagProps {
  country: string;
  className?: string;
  title?: string;
}

export default function CountryFlag({
  country,
  className = "w-4 h-3 rounded-xs inline-block shrink-0",
  title,
}: CountryFlagProps) {
  const rawCode = getCountryCode(country);
  const code = rawCode && rawCode in Flags ? (rawCode as keyof typeof Flags) : null;

  if (!code) {
    // Clean neutral fallback — never defaults to US
    return (
      <span
        className={`${className} bg-neutral-200/80 rounded-[2px] inline-flex items-center justify-center text-[8px] text-neutral-500 font-mono select-none`}
        title={title || country || "Unknown Region"}
      >
        🏳
      </span>
    );
  }

  const FlagComponent = Flags[code];
  if (!FlagComponent) {
    return (
      <span
        className={`${className} bg-neutral-200/80 rounded-[2px] inline-block shrink-0`}
        title={title || country}
      />
    );
  }

  return <FlagComponent className={className} title={title || country} />;
}
