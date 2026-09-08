"use client";

import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

const countryCodeMap: Record<string, keyof typeof Flags> = {
  Nigeria: "NG",
  "United States": "US",
  "United Kingdom": "GB",
  Germany: "DE",
  Canada: "CA",
  France: "FR",
  Japan: "JP",
  India: "IN",
  Brazil: "BR",
  Australia: "AU",
  Netherlands: "NL",
  Spain: "ES",
  Italy: "IT",
  Ghana: "GH",
  Kenya: "KE",
  SouthAfrica: "ZA",
  "South Africa": "ZA",
  NG: "NG",
  US: "US",
  GB: "GB",
  DE: "DE",
  CA: "CA",
  FR: "FR",
  JP: "JP",
  IN: "IN",
  BR: "BR",
  AU: "AU",
  NL: "NL",
  ES: "ES",
  IT: "IT",
};

interface CountryFlagProps {
  country: string;
  className?: string;
}

export default function CountryFlag({ country, className = "w-4 h-3 rounded-xs inline-block shrink-0" }: CountryFlagProps) {
  const code = countryCodeMap[country] || "US";
  const FlagComponent = Flags[code];

  if (!FlagComponent) {
    return (
      <span className="w-4 h-3 bg-neutral-200 rounded-xs inline-block shrink-0" />
    );
  }

  return <FlagComponent className={className} />;
}
