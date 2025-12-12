import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = new URL("https://abracann.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "AbraCann - Acesso Seguro à Cannabis Medicinal",
  description: "Plataforma medicinal digital para pacientes, prescritores e educação em cannabis medicinal.",
  keywords: ["cannabis medicinal", "prescrição", "saúde", "compliance LGPD"],
  authors: [{ name: "AbraCann Team" }],
  applicationName: "AbraCann",
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
    title: "AbraCann - Acesso Seguro à Cannabis Medicinal",
    description: "Plataforma medicinal digital para pacientes, prescritores e educação.",
    siteName: "AbraCann",
  },
  twitter: {
    card: "summary_large_image",
    title: "AbraCann - Acesso Seguro à Cannabis Medicinal",
    description:
      "Plataforma medicinal digital para pacientes, prescritores e educação em cannabis medicinal.",
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
