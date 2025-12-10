'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';

const roles = [
  { value: 'paciente', label: 'Paciente' },
  { value: 'prescritor', label: 'Prescritor' },
  { value: 'admin', label: 'Admin (demo)' },
];

export default function CadastroPage() {
  const [role, setRole] = useState('paciente');

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-2">AbraCann</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro">
              Crie sua conta
            </h1>
            <p className="text-cinza-medio mt-2">
              Preencha os dados para começarmos seu onboarding seguro.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-cinza-escuro">
                Documento (CPF / CRM)
              </span>
              <input
                type="text"
                name="documento"
                className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
                placeholder="000.000.000-00"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-cinza-escuro">
                Telefone
              </span>
              <input
                type="tel"
                name="telefone"
                className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
                placeholder="(00) 00000-0000"
              />
            </label>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium text-cinza-escuro">
              Tipo de conta
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`rounded-lg border px-4 py-3 text-left transition ${
                    role === r.value
                      ? 'border-verde-oliva bg-verde-claro/10 text-verde-oliva'
                      : 'border-cinza-claro text-cinza-escuro hover:border-verde-oliva'
                  }`}
                >
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-cinza-escuro">
              Observações / necessidades
            </span>
            <textarea
              name="observacoes"
              rows={4}
              className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
              placeholder="Conte-nos brevemente sobre seu caso para direcionarmos o atendimento."
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <label className="flex items-start gap-2 text-sm text-cinza-medio">
              <input type="checkbox" className="mt-1 rounded border-cinza-claro" />
              <span>
                Concordo com os termos de uso e política de privacidade (LGPD).
              </span>
            </label>
            <Button type="submit" variant="primary" size="md">
              Enviar cadastro
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
