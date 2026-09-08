"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-[#FAF8F5] text-[#1E1E1C]">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-y-auto px-8 py-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
