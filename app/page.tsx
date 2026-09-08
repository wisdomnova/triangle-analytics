"use client";

import { useEffect } from "react";
import Header from "./components/landing_page/header";
import Hero from "./components/landing_page/hero";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#1E1E1C] flex flex-col">
      <Header />
      <main className="flex-grow w-full flex flex-col items-center justify-center pb-12">
        <Hero />
      </main>
    </div>
  );
}
