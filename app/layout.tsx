import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopee Ultimate Case Challenge | Smart COD Reliability System",
  description:
    "Strategy & system design for solving the Cash on Delivery (COD) failed delivery challenge through dynamic reliability scoring and delivery window optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-[#ee4d2d] selection:text-white">
        {children}
      </body>
    </html>
  );
}
