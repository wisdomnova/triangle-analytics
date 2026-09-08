"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChartBar,
  IconUsers,
  IconActivity,
  IconUser,
  IconCode,
  IconAdjustments,
} from "@tabler/icons-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export default function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: "/overview",
      label: "Overview",
      icon: IconChartBar,
    },
    {
      href: "/visitors",
      label: "Visitors",
      icon: IconUsers,
    },
    {
      href: "/events",
      label: "Events",
      icon: IconActivity,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: IconUser,
    },
  ];

  return (
    <aside className="w-64 bg-[#FAF8F5] flex flex-col py-8 px-6 gap-8 shrink-0 min-h-screen">
      <div className="flex items-center gap-3 px-2">
        <img
          src="/images/logo-solid-plain.png"
          alt="Triangle Analytics Logo"
          className="w-7 h-7 object-contain"
        />
        <span className="text-sm font-normal text-neutral-800">
          Triangle Analytics
        </span>
      </div>

      <nav className="flex flex-col gap-2 w-full mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-normal transition-colors ${
                isActive
                  ? "bg-neutral-200/60 text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/50"
              }`}
            >
              <Icon size={18} stroke={1.5} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 flex flex-col gap-2">
        <span className="text-xs font-light text-neutral-400">
          Domain
        </span>
        <span className="text-xs font-normal text-neutral-700 truncate">
          app.triangle.io
        </span>
      </div>
    </aside>
  );
}
