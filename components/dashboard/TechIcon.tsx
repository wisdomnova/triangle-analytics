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
  IconWorld,
  IconDevices,
} from "@tabler/icons-react";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = "text-neutral-500 shrink-0", size = 16 }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  // Browsers
  if (normalized.includes("chrome")) return <IconBrandChrome size={size} stroke={1.5} className={className} />;
  if (normalized.includes("safari")) return <IconBrandSafari size={size} stroke={1.5} className={className} />;
  if (normalized.includes("firefox")) return <IconBrandFirefox size={size} stroke={1.5} className={className} />;
  if (normalized.includes("edge")) return <IconBrandEdge size={size} stroke={1.5} className={className} />;
  if (normalized.includes("opera")) return <IconBrandOpera size={size} stroke={1.5} className={className} />;

  // Operating Systems
  if (normalized.includes("mac") || normalized.includes("ios") || normalized.includes("apple")) {
    return <IconBrandApple size={size} stroke={1.5} className={className} />;
  }
  if (normalized.includes("windows")) return <IconBrandWindows size={size} stroke={1.5} className={className} />;
  if (normalized.includes("android")) return <IconBrandAndroid size={size} stroke={1.5} className={className} />;
  if (normalized.includes("linux") || normalized.includes("ubuntu") || normalized.includes("debian")) {
    return <IconBrandUbuntu size={size} stroke={1.5} className={className} />;
  }

  // Devices
  if (normalized.includes("desktop")) return <IconDeviceDesktop size={size} stroke={1.5} className={className} />;
  if (normalized.includes("mobile") || normalized.includes("phone")) return <IconDeviceMobile size={size} stroke={1.5} className={className} />;
  if (normalized.includes("tablet") || normalized.includes("ipad")) return <IconDeviceTablet size={size} stroke={1.5} className={className} />;

  return <IconWorld size={size} stroke={1.5} className={className} />;
}
