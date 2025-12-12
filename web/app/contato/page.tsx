'use client';

import Link from 'next/link';
import Button from '@/components/shared/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato | Abracanm - Associação Brasileira de Cannabis Medicinal',
  description:
    'Fale com a Abracanm sobre cadastro, prescritores e dúvidas de cannabis medicinal. Resposta em até 1 dia útil.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-2">AbraCann</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro">
              Fale com a gente
            </h1>
            <p className="text-cinza-medio mt-2">
              Tire dúvidas sobre cadastro, prescrições ou parceria com prescritores.
            </p>
          </div>
          <Link href="/" className="text-sm text-verde-oliva hover:underline">
            Voltar
          </Link>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-cinza-escuro">
                Nome completo
              </span>
              <input
                type="text"
                name="nome"
                className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
                placeholder="Seu nome"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-cinza-escuro">E-mail</span>
              <input
                type="email"
                name="email"
                className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
                placeholder="voce@email.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cinza-escuro">
              Assunto
            </span>
            <input
              type="text"
              name="assunto"
              className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
              placeholder="Ex: Dúvida sobre prescrição"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cinza-escuro">
              Mensagem
            </span>
            <textarea
              name="mensagem"
              rows={5}
              className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
              placeholder="Como podemos ajudar?"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-sm text-cinza-medio">
              Responderemos em até 1 dia útil. Dados protegidos conforme LGPD.
            </p>
            <Button type="submit" variant="primary" size="md">
              Enviar mensagem
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
