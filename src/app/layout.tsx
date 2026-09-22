import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { isSiteLive } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: isSiteLive()
    ? "Fair Fasteners"
    : "Fair Fasteners — Under development",
  description: isSiteLive()
    ? "A fastening solutions company"
    : "Fair Fasteners is under development. Contact us for quotes, specs, and supply questions.",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

/** Kept available for future use — apply via `font-geist` / CSS var */
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const live = isSiteLive();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className={`${manrope.className} font-sans antialiased`}>
        {live ? (
          <>
            <Navbar />
            <SmoothScroll>{children}</SmoothScroll>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
