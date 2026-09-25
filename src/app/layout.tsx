import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import BrandBackdrop from "@/components/BrandBackdrop";
import { organizationJsonLd, rootMetadata } from "@/lib/seo";
import { isSiteLive } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {live ? (
          <>
            <BrandBackdrop />
            <div className="relative z-10">
              <Navbar />
              <SmoothScroll>{children}</SmoothScroll>
            </div>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
