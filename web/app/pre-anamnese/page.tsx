'use client';

import Header from '@/components/shared/Header';
import PatientQuizWizard from '@/components/quiz/PatientQuizWizard';

export default function PreAnamnesePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-cinza-escuro">
              Pré-Anamnese
            </h1>
            <p className="text-sm text-cinza-medio max-w-2xl mx-auto">
              Responda algumas perguntas para entendermos seu contexto e direcionar melhor seu atendimento.
            </p>
          </div>

          <PatientQuizWizard />
        </div>
      </div>
    </main>
  );
}
