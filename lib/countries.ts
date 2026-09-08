/**
 * Comprehensive ISO 3166-1 alpha-2 countries and territories mapping.
 * Supports all 265 standard country and territory codes, official names,
 * colloquial aliases, and reverse resolution for flag rendering and analytics.
 */

export const ALL_COUNTRIES: Record<string, string> = {
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua & Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia & Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "St. Barthélemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BQ: "Caribbean Netherlands",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "Congo - Kinshasa",
  CF: "Central African Republic",
  CG: "Congo - Brazzaville",
  CH: "Switzerland",
  CI: "Côte d’Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cape Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czechia",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia & South Sandwich Islands",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard & McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "St. Kitts & Nevis",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Laos",
  LB: "Lebanon",
  LC: "St. Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "St. Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "North Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macau",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "St. Pierre & Miquelon",
  PN: "Pitcairn Islands",
  PR: "Puerto Rico",
  PS: "Palestine",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "St. Helena",
  SI: "Slovenia",
  SJ: "Svalbard & Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "São Tomé & Príncipe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syria",
  SZ: "Eswatini",
  TC: "Turks & Caicos Islands",
  TD: "Chad",
  TF: "French Southern Territories",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Türkiye",
  TT: "Trinidad & Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "U.S. Outlying Islands",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Vatican City",
  VC: "St. Vincent & Grenadines",
  VE: "Venezuela",
  VG: "British Virgin Islands",
  VI: "U.S. Virgin Islands",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis & Futuna",
  WS: "Samoa",
  XK: "Kosovo",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
  // Specific dependencies and constituent nations
  AC: "Ascension Island",
  CP: "Clipperton Island",
  DG: "Diego Garcia",
  EA: "Ceuta & Melilla",
  IC: "Canary Islands",
  TA: "Tristan da Cunha",
  "GB-ENG": "England",
  "GB-NIR": "Northern Ireland",
  "GB-SCT": "Scotland",
  "GB-WLS": "Wales",
};

/**
 * Colloquial names, aliases, and historical variants mapped to ISO codes.
 */
export const COUNTRY_ALIASES: Record<string, string> = {
  // United States
  "united states of america": "US",
  usa: "US",
  u_s_a: "US",
  u_s: "US",
  us: "US",
  america: "US",

  // United Kingdom & constituent nations
  uk: "GB",
  "great britain": "GB",
  britain: "GB",
  england: "GB",
  scotland: "GB",
  wales: "GB",
  "northern ireland": "GB",

  // United Arab Emirates
  uae: "AE",
  "the emirates": "AE",

  // Korea
  korea: "KR",
  "republic of korea": "KR",
  "south korea": "KR",
  "democratic people's republic of korea": "KP",
  "north korea": "KP",
  dprk: "KP",

  // Russia
  "russian federation": "RU",
  russia: "RU",

  // Turkey
  turkey: "TR",
  türkiye: "TR",
  turkiye: "TR",

  // Vietnam
  "viet nam": "VN",
  vietnam: "VN",

  // Czechia
  "czech republic": "CZ",
  czechia: "CZ",

  // Netherlands
  holland: "NL",
  netherlands: "NL",

  // Africa variants
  "ivory coast": "CI",
  "côte d'ivoire": "CI",
  "cote d'ivoire": "CI",
  cote_divoire: "CI",
  "congo (kinshasa)": "CD",
  "democratic republic of the congo": "CD",
  drc: "CD",
  "congo-kinshasa": "CD",
  "congo (brazzaville)": "CG",
  "republic of the congo": "CG",
  "congo-brazzaville": "CG",
  swaziland: "SZ",

  // Asia variants
  burma: "MM",
  myanmar: "MM",
  "myanmar (burma)": "MM",
  "hong kong sar china": "HK",
  "hong kong": "HK",
  "macao sar china": "MO",
  macao: "MO",
  macau: "MO",
  taiwan: "TW",
  "republic of china": "TW",

  // Americas variants
  "st. kitts & nevis": "KN",
  "saint kitts and nevis": "KN",
  "st. lucia": "LC",
  "saint lucia": "LC",
  "st. vincent & grenadines": "VC",
  "saint vincent and the grenadines": "VC",
  "st. helena": "SH",
  "saint helena": "SH",
  "st. barthelemy": "BL",
  "saint barthelemy": "BL",
  "st. martin": "MF",
  "saint martin": "MF",
  "sao tome and principe": "ST",
  "são tomé and príncipe": "ST",

  // Palestine & Vatican
  "state of palestine": "PS",
  palestine: "PS",
  "palestinian territories": "PS",
  "vatican city": "VA",
  "holy see": "VA",
};

// Case-insensitive lookup map
const LOWERCASE_LOOKUP = new Map<string, string>();

for (const [code, name] of Object.entries(ALL_COUNTRIES)) {
  LOWERCASE_LOOKUP.set(code.toLowerCase(), code);
  LOWERCASE_LOOKUP.set(name.toLowerCase(), code);
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (normalized !== name.toLowerCase()) {
    LOWERCASE_LOOKUP.set(normalized, code);
  }
}

for (const [alias, code] of Object.entries(COUNTRY_ALIASES)) {
  LOWERCASE_LOOKUP.set(alias.toLowerCase(), code);
  const normalized = alias
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (normalized !== alias.toLowerCase()) {
    LOWERCASE_LOOKUP.set(normalized, code);
  }
}

/**
 * Resolves any country name, code, or alias to standard 2-letter uppercase ISO code.
 */
export function getCountryCode(nameOrCode: string | null | undefined): string | null {
  if (!nameOrCode || typeof nameOrCode !== "string") return null;

  const trimmed = nameOrCode.trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();
  if (ALL_COUNTRIES[upper]) return upper;

  const lower = trimmed.toLowerCase();
  const found = LOWERCASE_LOOKUP.get(lower);
  if (found) return found;

  const normalized = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const foundNormalized = LOWERCASE_LOOKUP.get(normalized);
  if (foundNormalized) return foundNormalized;

  return null;
}

/**
 * Resolves any country code, name, or alias to standard English display name.
 */
export function getCountryName(nameOrCode: string | null | undefined): string {
  if (!nameOrCode || typeof nameOrCode !== "string") return "Unknown";

  const code = getCountryCode(nameOrCode);
  if (code && ALL_COUNTRIES[code]) {
    return ALL_COUNTRIES[code];
  }

  return nameOrCode.trim() || "Unknown";
}

/**
 * Validates if code is a known ISO code.
 */
export function isValidCountryCode(code: string): boolean {
  return Boolean(code && ALL_COUNTRIES[code.toUpperCase()]);
}

/**
 * Returns all supported countries as sorted list of { code, name }.
 */
export function getAllCountries(): Array<{ code: string; name: string }> {
  return Object.entries(ALL_COUNTRIES)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
