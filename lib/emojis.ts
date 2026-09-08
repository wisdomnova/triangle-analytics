export const countryFlags: Record<string, string> = {
  Nigeria: "🇳🇬",
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Canada: "🇨🇦",
  France: "🇫🇷",
  Japan: "🇯🇵",
  India: "🇮🇳",
  Brazil: "🇧🇷",
  Australia: "🇦🇺",
  Netherlands: "🇳🇱",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Ghana: "🇬🇭",
  Kenya: "🇰🇪",
  SouthAfrica: "🇿🇦",
  "South Africa": "🇿🇦",
};

export function getCountryFlag(countryName: string): string {
  return countryFlags[countryName] || "🌐";
}
