import type { Metadata } from "next";
import { Source_Serif_4, DM_Sans } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";

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

const SITE_URL = "https://e21med.com";
const SITE_TITLE_DEFAULT =
  "E21 MED, Construção de autoridade digital para médicos";
const SITE_DESCRIPTION =
  "O E21 constrói uma audiência composta por pacientes prontos para adquirir seus serviços. Programa de 6 meses para médicos que querem se tornar referência. Estúdio em Brasília.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: "%s | E21 MED",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "marketing médico",
    "marketing para médicos",
    "agência de marketing médico Brasília",
    "construção de audiência para médicos",
    "produtora de conteúdo médico",
    "autoridade digital médica",
    "Instagram para médicos",
    "marketing médico DF",
    "E21 Studio",
  ],
  authors: [{ name: "E21 Studio Ltda" }],
  creator: "E21 Studio Ltda",
  publisher: "E21 Studio Ltda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "E21 MED",
    title: SITE_TITLE_DEFAULT,
    description:
      "Programa de 6 meses para médicos se tornarem referência. Estúdio próprio em Brasília, equipe dedicada, estratégia de conteúdo, produção e tráfego.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "E21 MED, produtora de autoridade digital para médicos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_DEFAULT,
    description:
      "Programa de 6 meses para médicos se tornarem referência. Estúdio em Brasília.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Favicon usa src/app/icon.svg (auto-detectado pelo Next.js).
  // Para adicionar variantes PNG / Apple Touch, gerar com realfavicongenerator.net
  // e descomentar o bloco icons abaixo.
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  //   ],
  //   apple: [
  //     { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  //   ],
  // },
  verification: {
    // Preencher depois com o codigo do Google Search Console
    // google: "codigo-aqui",
  },
};

export const viewport = {
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
        <SchemaMarkup />
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
