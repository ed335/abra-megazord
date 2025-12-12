import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = new URL("https://abracanm.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Abracanm - Associação Brasileira de Cannabis Medicinal",
  description:
    "Abracanm: Associação Brasileira de Cannabis Medicinal. Informação segura, acolhimento, orientação a pacientes e prescritores, e conteúdos confiáveis sobre tratamento com cannabis.",
  keywords: [
    "Abracanm",
    "Associação Brasileira de Cannabis Medicinal",
    "cannabis medicinal",
    "tratamento com cannabis",
    "prescrição médica",
    "pacientes",
    "educação em saúde",
    "saúde integral",
    "acolhimento",
    "LGPD",
  ],
  authors: [{ name: "Abracanm" }],
  applicationName: "Abracanm",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl.toString(),
    title: "Abracanm - Associação Brasileira de Cannabis Medicinal",
    description:
      "Abracanm: informação segura, acolhimento e orientação para pacientes e prescritores sobre cannabis medicinal no Brasil.",
    siteName: "Abracanm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abracanm - Associação Brasileira de Cannabis Medicinal",
    description:
      "Associação Brasileira de Cannabis Medicinal com foco em acolhimento, orientação e conteúdo seguro para pacientes e prescritores.",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-off-white text-cinza-escuro">
        {children}
      </body>
    </html>
  );
}
