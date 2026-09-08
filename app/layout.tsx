import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "material-symbols/index.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

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
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
