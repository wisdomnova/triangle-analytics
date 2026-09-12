"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { DomainProvider, useDomain } from "@/context/DomainContext";
import { IconMenu2, IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentDomain } = useDomain();

  // Close drawer on path change or resize
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full max-w-full bg-[#FAF8F5] text-[#1E1E1C] overflow-hidden">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 h-14 bg-[#FAF8F5] shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <IconMenu2 size={20} stroke={1.8} />
          </button>

          <Link href="/overview" className="flex items-center gap-2">
            <img
              src="/images/logo-solid-plain.png"
              alt="Triangle Analytics Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-semibold tracking-tight text-[#1E1E1C]">
              Analytics
            </span>
          </Link>
        </div>

        {/* Current Domain Badge */}
        {currentDomain && (
          <Link
            href="/domains"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-medium text-neutral-700 w-fit shrink-0 whitespace-nowrap hover:bg-neutral-50 transition-colors"
          >
            <IconWorld size={14} stroke={1.8} className="text-neutral-500 shrink-0" />
            <span>{currentDomain.domain}</span>
          </Link>
        )}
      </header>

      {/* Desktop Static Sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Slide-out Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-72 max-w-[85vw] h-full bg-[#FAF8F5] shadow-2xl flex flex-col"
            >
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} isMobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 h-[calc(100vh-3.5rem)] md:h-screen overflow-y-auto overflow-x-hidden px-4 sm:px-6 md:px-8 py-6 sm:py-8 max-w-7xl w-full min-w-0">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DomainProvider>
      <DashboardShell>{children}</DashboardShell>
    </DomainProvider>
  );
}
