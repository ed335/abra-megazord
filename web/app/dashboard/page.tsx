'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { clearToken, fetchWithAuth, getToken } from '@/lib/auth';

type MeResponse = {
  user: {
    userId: string;
    email: string;
    role: string;
  };
};

export default function DashboardPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'auth' | 'no-auth'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<MeResponse['user'] | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('no-auth');
      return;
    }

    setStatus('loading');
    fetchWithAuth<MeResponse>('/auth/me')
      .then((data) => {
        setMe(data.user);
        setStatus('auth');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('no-auth');
      });
  }, []);

  const handleLogout = () => {
    clearToken();
    setMe(null);
    setStatus('no-auth');
  };

  if (status === 'no-auth') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-cinza-escuro mb-4">
            Você precisa entrar
          </h1>
          {error && (
            <p className="text-sm text-erro bg-erro/10 border border-erro/30 rounded-lg px-4 py-3 mb-4">
              {error}
            </p>
          )}
          <p className="text-cinza-medio mb-6">
            Faça login ou crie uma conta para acessar o dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => (window.location.href = '/login')}>
              Ir para Login
            </Button>
            <Button variant="secondary" onClick={() => (window.location.href = '/cadastro')}>
              Criar conta
            </Button>
            <Link href="/" className="text-sm text-verde-oliva underline">
              Voltar para a home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-off-white">
        <p className="text-cinza-medio">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-verde-oliva font-medium">AbraCann Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro">
              Sessão autenticada
            </h1>
            <p className="text-cinza-medio mt-2">
              Este é um placeholder para o painel; a sessão está válida.
            </p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {me && (
          <div className="border border-cinza-claro rounded-lg p-4 bg-cinza-muito-claro">
            <p className="text-sm text-cinza-medio">Usuário</p>
            <p className="text-lg font-semibold text-cinza-escuro">{me.email}</p>
            <p className="text-sm text-cinza-medio mt-1">Role: {me.role}</p>
            <p className="text-sm text-cinza-medio">ID: {me.userId}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-cinza-claro rounded-lg p-4">
            <h3 className="text-lg font-semibold text-cinza-escuro mb-2">Próximos passos</h3>
            <ul className="list-disc list-inside text-cinza-medio space-y-1 text-sm">
              <li>Adicionar formulários de paciente/prescritor</li>
              <li>Conectar com fluxo de prescrição</li>
              <li>Dashboard com cards reais</li>
            </ul>
          </div>
          <div className="border border-cinza-claro rounded-lg p-4">
            <h3 className="text-lg font-semibold text-cinza-escuro mb-2">Status da sessão</h3>
            <p className="text-sm text-cinza-medio">
              Token armazenado localmente. Use este espaço para exibir métricas ou atalhos.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
