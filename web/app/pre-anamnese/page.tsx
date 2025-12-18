'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PatientQuizWizard from '@/components/quiz/PatientQuizWizard';

export default function PreAnamnesePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-verde-oliva">
            ABRACANM
          </Link>
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-verde-oliva hover:text-verde-claro transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <p className="text-sm uppercase tracking-wide text-verde-oliva font-semibold">
              Passo guiado • ABRACANM
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-cinza-escuro">
              Inicie sua pré-anamnese com segurança e acolhimento
            </h1>
            <p className="text-base text-cinza-medio max-w-3xl mx-auto">
              Responda poucas perguntas para entendermos seu contexto. Seus dados de cadastro já estão salvos - aqui você só precisa completar informações sobre seu tratamento.
            </p>
          </div>

          <PatientQuizWizard />
        </div>
      </div>
    </main>
  );
}
