import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alphabetz — Premier Coaching Institute in Durgapur",
    template: "%s | Alphabetz",
  },
  description:
    "Alphabetz is a leading coaching institute in Durgapur, West Bengal offering JEE, NEET, WBJEE, Board Exam, WBCS, and Spoken English preparation with experienced faculty and proven results.",
  keywords: [
    "coaching institute",
    "Durgapur",
    "JEE preparation",
    "NEET preparation",
    "WBJEE coaching",
    "Board exam",
    "West Bengal",
    "Alphabetz",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
