'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';

const roles = [
  { value: 'PACIENTE', label: 'Paciente' },
  { value: 'PRESCRITOR', label: 'Prescritor' },
  { value: 'ADMIN', label: 'Admin (demo)' },
];

export default function CadastroPage() {
  const [role, setRole] = useState<'PACIENTE' | 'PRESCRITOR' | 'ADMIN'>('PACIENTE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao cadastrar');
      }

      setStatus('success');
      setMessage('Cadastro realizado com sucesso. Verifique seu e-mail para validar.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao cadastrar';
      setStatus('error');
      setMessage(msg);
    }
  };

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
              Cadastre-se como paciente ou prescritor para acessar a plataforma.
            </p>
          </div>
          <Link href="/" className="text-sm text-verde-oliva hover:underline">
            Voltar
          </Link>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-cinza-escuro">E-mail</span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
                placeholder="voce@email.com"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-cinza-escuro">Senha</span>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-cinza-claro px-3 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
                placeholder="Min. 8 caracteres"
              />
            </label>
          </div>

          <div className="space-y-3">
            <span className="text-sm font-medium text-cinza-escuro">Tipo de conta</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value as typeof role)}
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

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-sm text-cinza-medio">
              Seus dados são protegidos conforme LGPD. Use um e-mail válido.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar cadastro'}
            </Button>
          </div>

          {status === 'success' && (
            <p className="text-sm text-sucesso bg-sucesso/10 border border-sucesso/30 rounded-lg px-4 py-3">
              {message}
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-erro bg-erro/10 border border-erro/30 rounded-lg px-4 py-3">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
