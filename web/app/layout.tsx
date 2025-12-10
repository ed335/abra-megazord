import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "AbraCann - Acesso Seguro à Cannabis Medicinal",
  description: "Plataforma medicinal digital para pacientes, prescritores e educação em cannabis medicinal.",
  keywords: ["cannabis medicinal", "prescrição", "saúde", "compliance LGPD"],
  authors: [{ name: "AbraCann Team" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://abracann.com",
    title: "AbraCann - Acesso Seguro à Cannabis Medicinal",
    description: "Plataforma medicinal digital para pacientes, prescritores e educação.",
    siteName: "AbraCann",
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
