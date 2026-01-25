import type { Metadata } from "next";
import { Geist, Geist_Mono, Bitter } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll';
import "./globals.css";

export const metadata: Metadata = {
  title: "Fair Fasteners",
  description: "A fastening solutions company",
};

const geist = Geist({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={geist.className}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
