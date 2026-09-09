"use client";

import React from "react";
import {
  IconBrandChrome,
  IconBrandSafari,
  IconBrandFirefox,
  IconBrandEdge,
  IconBrandOpera,
  IconBrandApple,
  IconBrandWindows,
  IconBrandAndroid,
  IconBrandUbuntu,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceLaptop,
  IconAntenna,
  IconSatellite,
  IconWorld,
} from "@tabler/icons-react";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = "text-neutral-500 shrink-0", size = 16 }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  // Carriers & Telecom Networks
  if (normalized.includes("starlink")) return <IconSatellite size={size} stroke={1.5} className={className} />;
  if (
    normalized.includes("mtn") ||
    normalized.includes("airtel") ||
    normalized.includes("glo") ||
    normalized.includes("9mobile") ||
    normalized.includes("safaricom") ||
    normalized.includes("vodacom") ||
    normalized.includes("vodafone") ||
    normalized.includes("verizon") ||
    normalized.includes("t-mobile") ||
    normalized.includes("at&t") ||
    normalized.includes("telecom") ||
    normalized.includes("carrier") ||
    normalized.includes("asn") ||
    normalized.includes("spectranet") ||
    normalized.includes("ipnx")
  ) {
    return <IconAntenna size={size} stroke={1.5} className={className} />;
  }

  // Browsers
  if (normalized.includes("chrome")) return <IconBrandChrome size={size} stroke={1.5} className={className} />;
  if (normalized.includes("safari")) return <IconBrandSafari size={size} stroke={1.5} className={className} />;
  if (normalized.includes("firefox")) return <IconBrandFirefox size={size} stroke={1.5} className={className} />;
  if (normalized.includes("edge")) return <IconBrandEdge size={size} stroke={1.5} className={className} />;
  if (normalized.includes("opera")) return <IconBrandOpera size={size} stroke={1.5} className={className} />;

  // Operating Systems & Apple devices
  if (normalized.includes("mac") || normalized.includes("ios") || normalized.includes("apple") || normalized.includes("iphone") || normalized.includes("ipad")) {
    return <IconBrandApple size={size} stroke={1.5} className={className} />;
  }
  if (normalized.includes("windows")) return <IconBrandWindows size={size} stroke={1.5} className={className} />;
  if (normalized.includes("android")) return <IconBrandAndroid size={size} stroke={1.5} className={className} />;
  if (normalized.includes("linux") || normalized.includes("ubuntu") || normalized.includes("debian")) {
    return <IconBrandUbuntu size={size} stroke={1.5} className={className} />;
  }

  // Hardware models & Devices
  if (
    normalized.includes("samsung") ||
    normalized.includes("pixel") ||
    normalized.includes("redmi") ||
    normalized.includes("xiaomi") ||
    normalized.includes("tecno") ||
    normalized.includes("infinix") ||
    normalized.includes("oppo") ||
    normalized.includes("vivo") ||
    normalized.includes("oneplus") ||
    normalized.includes("motorola") ||
    normalized.includes("mobile") ||
    normalized.includes("phone")
  ) {
    return <IconDeviceMobile size={size} stroke={1.5} className={className} />;
  }
  if (normalized.includes("tablet") || normalized.includes("ipad")) return <IconDeviceTablet size={size} stroke={1.5} className={className} />;
  if (normalized.includes("desktop") || normalized.includes("pc")) return <IconDeviceDesktop size={size} stroke={1.5} className={className} />;
  if (normalized.includes("laptop") || normalized.includes("macbook")) return <IconDeviceLaptop size={size} stroke={1.5} className={className} />;

  return <IconWorld size={size} stroke={1.5} className={className} />;
}
