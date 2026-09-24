import type { Metadata } from "next";
import { Bricolage_Grotesque, Faustina } from "next/font/google";
import "./globals.css";

// Self-hosted by next/font: no external request, no layout shift on load.
// Display voice comes from the width axis at heavy weight; text from the serif.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const faustina = Faustina({
  subsets: ["latin"],
  variable: "--font-faustina",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Alphabetz Coaching Centre — Durgapur · Classes 1 to 12",
    template: "%s | Alphabetz",
  },
  description:
    "Alphabetz Coaching Centre in Durgapur, West Bengal. Coaching for classes 1 to 12 across West Bengal Board, CBSE and ICSE. Fifteen teachers, a specialist for every subject, monthly tests. Taught in Bengali, English or Hindi.",
  keywords: [
    "coaching centre Durgapur",
    "tuition classes 1 to 12",
    "West Bengal Board coaching",
    "CBSE coaching Durgapur",
    "ICSE coaching Durgapur",
    "Madhyamik preparation",
    "Higher Secondary science",
    "Alphabetz",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${faustina.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
