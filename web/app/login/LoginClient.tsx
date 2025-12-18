'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { setToken } from '@/lib/auth';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao entrar');
      }

      const data = await response.json();
      if (data.accessToken) {
        setToken(data.accessToken);
        setStatus('success');
        setMessage('Login realizado com sucesso. Redirecionando...');
        setTimeout(() => router.push('/dashboard'), 800);
        return;
      }

      setStatus('success');
      setMessage('Login realizado.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao entrar';
      setStatus('error');
      setMessage(msg);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-2">ABRACANM</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro">
              Entrar
            </h1>
            <p className="text-cinza-medio mt-2">
              Acesse sua conta para continuar.
            </p>
          </div>
          <Link href="/" className="text-sm text-verde-oliva hover:underline">
            Voltar
          </Link>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              placeholder="Sua senha"
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-sm text-cinza-medio">
              Ainda não tem conta? <Link href="/cadastro" className="text-verde-oliva underline">Cadastre-se</Link>
            </p>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>

          {status === 'success' && (
            <p className="text-sm text-sucesso bg-sucesso/10 border border-sucesso/30 rounded-lg px-4 py-3 break-words">
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
