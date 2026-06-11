import type { Metadata } from "next";
import { Fraunces, Inter, Fragment_Mono } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const interV2 = Inter({
  variable: "--font-inter-v2",
  weight: ["300", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E21 MED · V2",
  description:
    "O E21 constrói uma audiência composta por pacientes prontos para adquirir seus serviços.",
  // versão experimental: não indexar enquanto a principal está no ar
  robots: { index: false, follow: false },
};

export default function V2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${fraunces.variable} ${interV2.variable} ${fragmentMono.variable} v2-root min-h-screen bg-parchment text-ink font-v2-sans`}
    >
      {children}
    </div>
  );
}
