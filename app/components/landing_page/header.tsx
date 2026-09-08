"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconBrandGithub } from "@tabler/icons-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  // Fetch live GitHub stars from public repository
  useEffect(() => {
    let isMounted = true;
    fetch("https://api.github.com/repos/wisdomnova/triangle-analytics")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && typeof data?.stargazers_count === "number") {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const formattedStars =
    starCount !== null
      ? starCount >= 1000
        ? `${(starCount / 1000).toFixed(1).replace(/\.0$/, "")}k`
        : `${starCount}`
      : null;

  // Close mobile menu on ESC or window resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#docs", label: "Script & API" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 md:px-8 flex justify-center pointer-events-auto"
      >
        {/* Content-fit rounded header box containing ALL navigation and action buttons */}
        <div className="w-full sm:w-fit max-w-[calc(100vw-1.5rem)] sm:max-w-fit bg-white/90 backdrop-blur-md border border-[#EAE5D9]/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-6 md:gap-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
          {/* Logo & Brand */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 hover:opacity-85 transition-opacity shrink-0"
          >
            <img
              src="/images/logo-solid-plain.png"
              alt="Triangle Analytics Logo"
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            />
            <span className="text-sm font-semibold tracking-tight text-[#1E1E1C]">
              Analytics
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#3A3935] hover:text-[#1E1E1C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions: GitHub Star (Black) + Login + Sign Up (Black) with space before buttons */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0 ml-6 sm:ml-8 md:ml-10 lg:ml-14">
            <a
              href="https://github.com/wisdomnova/triangle-analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#1E1E1C] hover:bg-[#323230] text-white px-4 py-2 rounded-full transition-all duration-150 group cursor-pointer"
              title="Star Triangle Analytics on GitHub"
            >
              <IconBrandGithub size={16} stroke={1.8} className="text-white group-hover:scale-110 transition-transform duration-150" />
              <span className="text-white font-medium">GitHub</span>
              <span className="text-neutral-300 font-normal text-xs">
                ({formattedStars ?? "★"})
              </span>
            </a>

            <Link
              href="/auth/signin"
              className="text-xs sm:text-sm font-semibold text-[#1E1E1C] hover:text-neutral-500 px-3 py-2 transition-colors"
            >
              Login
            </Link>

            <Link
              href="/auth/join"
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-[#1E1E1C] text-[#FAF6F0] pl-4 pr-3.5 py-2 rounded-full hover:bg-[#323230] transition-colors shadow-2xs"
            >
              <span>Sign Up</span>
              <span className="material-symbols-outlined text-[15px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                arrow_outward
              </span>
            </Link>
          </div>

          {/* Mobile Right Controls: GitHub Star Link + Login + Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <a
              href="https://github.com/wisdomnova/triangle-analytics"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star on GitHub"
              className="flex items-center gap-1.5 text-xs font-medium bg-[#1E1E1C] hover:bg-[#323230] text-white px-3 py-1.5 rounded-full transition-colors"
            >
              <IconBrandGithub size={14} stroke={1.8} className="text-white" />
              <span className="text-[11px] font-semibold text-white">GitHub</span>
              <span className="text-[10px] text-neutral-300 font-normal">
                ({formattedStars ?? "★"})
              </span>
            </a>

            <Link
              href="/auth/signin"
              className="text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-[#1E1E1C] px-2.5 py-1.5 rounded-full transition-colors"
            >
              Login
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#1E1E1C] flex items-center justify-center transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <IconX size={18} stroke={2} />
              ) : (
                <IconMenu2 size={18} stroke={2} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-20 left-3 right-3 bg-white/95 backdrop-blur-xl border border-[#EAE5D9] rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
            >
              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-2">
                  Navigation
                </span>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-medium text-[#1E1E1C] hover:bg-neutral-100 px-3 py-2.5 rounded-2xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-[#EAE5D9]">
                <a
                  href="https://github.com/wisdomnova/triangle-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E1E1C] text-white rounded-2xl text-sm font-medium hover:bg-[#323230] transition-colors group"
                >
                  <IconBrandGithub size={18} stroke={1.8} className="text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">Star on GitHub</span>
                  <span className="text-neutral-300 font-normal text-xs">
                    ({formattedStars ?? "★"})
                  </span>
                </a>

                <Link
                  href="/auth/join"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#1E1E1C] rounded-2xl text-sm font-medium transition-colors"
                >
                  <span>Sign Up Free</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_outward
                  </span>
                </Link>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-neutral-600 hover:text-neutral-900 rounded-2xl text-sm font-semibold transition-colors"
                >
                  Login to Dashboard
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
