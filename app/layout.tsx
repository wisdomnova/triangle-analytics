import type { Metadata, Viewport } from "next";
import "./globals.css";
import "material-symbols/index.css";

const outfit = {
  variable: "font-sans",
};

export const metadata: Metadata = {
  title: "Triangle Analytics",
  description: "Lightweight, privacy-friendly web analytics platform for modern applications.",
  openGraph: {
    title: "Triangle Analytics",
    description: "Lightweight, privacy-friendly web analytics platform for modern applications.",
  },
  twitter: {
    title: "Triangle Analytics",
    description: "Lightweight, privacy-friendly web analytics platform for modern applications.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${outfit.variable} h-full antialiased w-full max-w-full overflow-x-hidden`}
    >
      <body className="min-h-full w-full max-w-full overflow-x-hidden flex flex-col">{children}</body>
    </html>
  );
}
