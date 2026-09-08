"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IconChartBar,
  IconUsers,
  IconActivity,
  IconWorld,
  IconUser,
  IconSelector,
  IconCheck,
  IconPlus,
} from "@tabler/icons-react";
import { useDomain } from "@/context/DomainContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { domains, currentDomain, setCurrentDomainId } = useDomain();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

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
      href: "/domains",
      label: "Domains",
      icon: IconWorld,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: IconUser,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        setIsSwitcherOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#FAF8F5] flex flex-col py-8 px-6 gap-8 shrink-0 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-2">
        <img
          src="/images/logo-solid-plain.png"
          alt="Triangle Analytics Logo"
          className="w-7 h-7 object-contain"
        />
        <span className="text-sm font-semibold text-neutral-900">
          Triangle Analytics
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 w-full mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm transition-colors ${
                isActive
                  ? "bg-neutral-200/70 text-neutral-900 font-bold"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60 font-semibold"
              }`}
            >
              <Icon size={18} stroke={1.8} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Switchable Domain Section at Bottom */}
      <div ref={switcherRef} className="mt-auto relative w-full pt-6">
        <button
          type="button"
          onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
          className="w-full text-left px-3 py-2.5 rounded-2xl hover:bg-neutral-200/50 transition-colors flex items-center justify-between cursor-pointer outline-none group"
        >
          <div className="flex flex-col gap-0.5 min-w-0 pr-2">
            <span className="text-xs font-normal text-neutral-400">Domain</span>
            <span className="text-xs font-medium text-neutral-900 truncate">
              {currentDomain.domain}
            </span>
          </div>
          <IconSelector
            size={16}
            stroke={1.6}
            className="text-neutral-400 group-hover:text-neutral-700 shrink-0 transition-colors"
          />
        </button>

        {/* Popover Menu for Multi-Domain Switching */}
        {isSwitcherOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl py-2 z-40 flex flex-col gap-1">
            <div className="px-4 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-normal tracking-wide text-neutral-400 uppercase">
                Switch Domain
              </span>
              <span className="text-[11px] font-normal text-neutral-400">
                {domains.length} total
              </span>
            </div>

            <div className="flex flex-col max-h-56 overflow-y-auto">
              {domains.map((d) => {
                const isSelected = d.id === currentDomain.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setCurrentDomainId(d.id);
                      setIsSwitcherOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-2.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          d.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-amber-400"
                        }`}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-neutral-900 truncate">
                          {d.domain}
                        </span>
                        <span className="text-[11px] font-light text-neutral-400 truncate">
                          {d.name}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <IconCheck
                        size={14}
                        stroke={1.8}
                        className="text-neutral-900 shrink-0 ml-2"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-1 mt-1">
              <button
                type="button"
                onClick={() => {
                  setIsSwitcherOpen(false);
                  router.push("/domains");
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-normal text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <IconPlus size={14} stroke={1.6} />
                <span>Add or manage domains</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
