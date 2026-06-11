import type { Metadata } from "next";
import { Inter } from "next/font/google";

const interV3 = Inter({
  variable: "--font-inter-v3",
  weight: ["200", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E21 MED · V3",
  description:
    "O E21 constrói uma audiência composta por pacientes prontos para adquirir seus serviços.",
  // versão experimental: não indexar; canônica é a home
  robots: { index: false, follow: false },
  alternates: { canonical: "https://e21med.com" },
};

export default function V3Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      data-theme="v3"
      className={`${interV3.variable} min-h-screen bg-void text-bone`}
      style={{ fontFamily: "var(--font-inter-v3), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
