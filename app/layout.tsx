import type { Metadata } from "next";
import "./globals.css";
import "material-symbols/index.css";

const outfit = {
  variable: "font-sans",
};

export const metadata: Metadata = {
  title: "Triangle Analytics — Lightweight Web Analytics",
  description: "Lightweight, privacy-friendly web analytics platform for modern applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
