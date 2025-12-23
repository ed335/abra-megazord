'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ContatoClient() {
  return (
    <main className="min-h-screen bg-off-white px-4 sm:px-6 lg:px-8 py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-verde-oliva font-medium mb-2">ABRACANM</p>
              <CardTitle className="text-2xl sm:text-3xl">Fale com a gente</CardTitle>
              <CardDescription>
                Tire dúvidas sobre cadastro, prescrições ou parceria com prescritores.
              </CardDescription>
            </div>
            <Link href="/" className="text-sm text-verde-oliva hover:underline">
              Voltar
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-cinza-escuro">
                  Nome completo
                </label>
                <input
                  type="text"
                  name="nome"
                  className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-cinza-escuro">E-mail</label>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all"
                  placeholder="voce@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cinza-escuro">
                Assunto
              </label>
              <input
                type="text"
                name="assunto"
                className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all"
                placeholder="Ex: Dúvida sobre prescrição"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cinza-escuro">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                rows={5}
                className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all resize-none"
                placeholder="Como podemos ajudar?"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-cinza-medio">
                Responderemos em até 1 dia útil. Dados protegidos conforme LGPD.
              </p>
              <Button type="submit">
                Enviar mensagem
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
