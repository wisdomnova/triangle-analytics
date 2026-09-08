"use client";

import { useEffect } from "react";
import Header from "./components/landing_page/header";
import Hero from "./components/landing_page/hero";
import Features from "./components/landing_page/features";
import DeveloperSimplicity from "./components/landing_page/developer_simplicity";
import Pricing from "./components/landing_page/pricing";
import CTA from "./components/landing_page/cta";
import Footer from "./components/landing_page/footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF8F5] text-[#1E1E1C] flex flex-col scroll-smooth">
      <Header />
      <main className="flex-grow w-full max-w-full overflow-x-hidden flex flex-col items-center justify-center pb-12">
        <Hero />
        <Features />
        <DeveloperSimplicity />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
