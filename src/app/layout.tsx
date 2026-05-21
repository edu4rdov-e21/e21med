import type { Metadata } from "next";
import { Source_Serif_4, DM_Sans } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif-display",
  weight: ["400", "600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://e21med.vercel.app";
const SITE_TITLE = "E21 MED · Construindo autoridade para médicos de alto padrão";
const SITE_DESCRIPTION =
  "O E21 constrói uma audiência composta por pacientes prontos para adquirir seus serviços. Estúdio próprio, equipe dedicada, resultado real.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "E21 MED",
    images: [
      {
        url: "/images/studio-geral.jpg",
        width: 1200,
        height: 630,
        alt: "Estúdio E21 MED",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/studio-geral.jpg"],
  },
  themeColor: "#0F2440",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sourceSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy focus:text-cream focus:rounded"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
