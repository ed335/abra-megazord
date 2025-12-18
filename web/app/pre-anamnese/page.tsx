'use client';

import QuizWizard from '@/components/quiz/QuizWizard';

export default function PreAnamnesePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-wide text-verde-oliva font-semibold">
            Passo guiado • AbraCann
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-cinza-escuro">
            Inicie sua pré-anamnese com segurança e acolhimento
          </h1>
          <p className="text-base text-cinza-medio max-w-3xl mx-auto">
            Responda poucas perguntas para entendermos seu contexto, sempre com LGPD, clareza e foco em ciência. Você poderá finalizar seu cadastro em seguida.
          </p>
        </div>

        <QuizWizard />
      </div>
    </main>
  );
}
