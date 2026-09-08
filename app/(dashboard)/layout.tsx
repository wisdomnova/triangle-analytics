"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { DomainProvider } from "@/context/DomainContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DomainProvider>
      <div className="flex h-screen w-full bg-[#FAF8F5] text-[#1E1E1C] overflow-hidden">
        <Sidebar />
        <main className="flex-1 h-screen overflow-y-auto px-8 py-10 max-w-7xl">
          {children}
        </main>
      </div>
    </DomainProvider>
  );
}
