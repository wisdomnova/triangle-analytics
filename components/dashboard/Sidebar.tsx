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
  IconX,
} from "@tabler/icons-react";
import { useDomain } from "@/context/DomainContext";
import { getStoredUser, api, User } from "@/lib/api";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { domains, currentDomain, setCurrentDomainId } = useDomain();
  const [profile, setProfile] = useState<User | null>(null);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setProfile(user);
    } else {
      api.auth
        .getMe()
        .then((res) => {
          if (res?.user) setProfile(res.user);
        })
        .catch(() => {});
    }
  }, []);

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
    <aside
      className={`bg-[#FAF8F5] border-r border-[#EAE5D9] flex flex-col py-6 sm:py-8 gap-6 sm:gap-8 shrink-0 select-none overflow-y-auto ${
        isMobile ? "w-full h-full" : "w-64 h-screen sticky top-0"
      }`}
    >
      {/* Top Header & Workspace Info */}
      <div className="flex flex-col px-6 gap-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo-solid-plain.png"
              alt="Triangle Analytics Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            {isMobile && (
              <span className="text-sm font-semibold text-[#1E1E1C]">
                Analytics
              </span>
            )}
          </div>

          {isMobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white border border-[#EAE5D9] flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <IconX size={18} stroke={2} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-0.5 border-b border-[#EAE5D9] pb-6">
          <span className="text-sm font-semibold text-[#1E1E1C] truncate">
            Triangle Analytics
          </span>
          <span className="text-xs text-neutral-400 truncate">
            {profile?.name || "Workspace Member"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col w-full relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onClose?.()}
              className={`w-full py-3.5 sm:py-4 px-6 flex items-center gap-4 transition-colors duration-200 cursor-pointer relative ${
                isActive
                  ? "text-[#1E1E1C] font-semibold border-l-2 border-orange-500 bg-neutral-50/50"
                  : "text-neutral-500 hover:text-[#1E1E1C] border-l-2 border-transparent"
              }`}
            >
              <Icon size={20} stroke={1.8} className="shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section: Domain Switcher & Beta Badge */}
      <div className="px-6 mt-auto flex flex-col gap-4 pt-4">
        <div ref={switcherRef} className="relative w-full">
          <button
            type="button"
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className="w-full text-left p-2.5 rounded-xl hover:bg-neutral-200/50 transition-colors flex items-center justify-between cursor-pointer outline-none group"
          >
            <div className="flex flex-col gap-0.5 min-w-0 pr-2">
              <span className="text-xs font-normal text-neutral-400">Domain</span>
              <span className="text-xs font-medium text-neutral-900 truncate">
                {currentDomain ? currentDomain.domain : "No domain connected"}
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
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-2xl py-2 z-40 flex flex-col gap-1 border border-[#EAE5D9] shadow-lg">
              <div className="px-4 py-1.5 flex items-center justify-between">
                <span className="text-[11px] font-normal tracking-wide text-neutral-400 uppercase">
                  Switch Domain
                </span>
                <span className="text-[11px] font-normal text-neutral-400">
                  {domains.length} total
                </span>
              </div>

              {domains.length === 0 ? (
                <div className="px-4 py-3 text-center flex flex-col gap-1">
                  <span className="text-xs text-neutral-500 font-light">No connected domains</span>
                  <span className="text-[10px] text-neutral-400">Connect a domain to track data</span>
                </div>
              ) : (
                <div className="flex flex-col max-h-56 overflow-y-auto">
                  {domains.map((d) => {
                    const isSelected = currentDomain && (d.siteId === currentDomain.siteId || d.id === currentDomain.id);
                    return (
                      <button
                        key={d.siteId || d.id}
                        type="button"
                        onClick={() => {
                          setCurrentDomainId(d.siteId || d.id);
                          setIsSwitcherOpen(false);
                          onClose?.();
                        }}
                        className={`flex items-center justify-between px-4 py-2.5 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-neutral-100 text-neutral-900 font-medium"
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
              )}

              <div className="pt-1 mt-1 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsSwitcherOpen(false);
                    onClose?.();
                    router.push("/domains");
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-normal text-[#0B63E5] hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <IconPlus size={14} stroke={1.6} />
                  <span>{domains.length === 0 ? "Add your first domain" : "Add or manage domains"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <span className="bg-rose-500 text-[#FAF6EE] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full select-none">
            Beta
          </span>
        </div>
      </div>
    </aside>
  );
}
