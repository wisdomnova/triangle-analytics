export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen w-full bg-[#FAF8F5] text-[#1E1E1C]">{children}</div>;
}
