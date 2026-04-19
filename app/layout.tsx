import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
});

import { SettingsProvider } from "@/lib/settings-context";
import SettingsSidebar from "@/components/SettingsSidebar";

export const metadata: Metadata = {
  title: "Al-Quran - Simple & Peaceful",
  description: "A simple and peaceful Quran application for reading and reflection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfaf5] text-[#3d3d3d] selection:bg-[#f4f1e9] selection:text-[#8b7355]">
        <SettingsProvider>
          {children}
          <SettingsSidebar />
        </SettingsProvider>
      </body>
    </html>
  );
}
