'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { getToken, clearToken } from '@/lib/auth';

type User = {
  id: string;
  email: string;
  role: string;
  nome: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    
    if (!token) {
      router.replace('/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Sessão inválida');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        clearToken();
      });
  }, [router]);

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sessão expirada</h1>
          <p className="text-gray-600 mb-6">{error || 'Faça login para continuar.'}</p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" onClick={() => router.push('/login')}>
              Fazer login
            </Button>
            <Button variant="secondary" onClick={() => router.push('/cadastro')}>
              Criar conta
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-green-600 font-medium">ABRACANM</p>
              <h1 className="text-2xl font-bold text-gray-800">
                Bem-vindo(a), {user.nome || user.email}!
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {user.role === 'PACIENTE' ? 'Associado' : user.role} - {user.email}
              </p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Meus Dados"
            description="Visualize e atualize suas informações"
            href="/perfil"
          />
          <DashboardCard
            title="Pré-Anamnese"
            description="Responda o questionário para sua consulta"
            href="/pre-anamnese"
          />
          <DashboardCard
            title="Agendar Consulta"
            description="Marque uma consulta com especialistas"
            href="/agendamento"
          />
          <DashboardCard
            title="Minhas Prescrições"
            description="Acesse suas prescrições médicas"
            href="/prescricoes"
          />
          <DashboardCard
            title="Educação"
            description="Artigos sobre cannabis medicinal"
            href="/educacao"
          />
          <DashboardCard
            title="Suporte"
            description="Entre em contato conosco"
            href="mailto:ouvidoria@abracanm.org.br"
            external
          />
        </div>
      </div>
    </main>
  );
}

function DashboardCard({ 
  title, 
  description, 
  href, 
  external 
}: { 
  title: string; 
  description: string; 
  href: string; 
  external?: boolean;
}) {
  const content = (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );

  if (external) {
    return <a href={href}>{content}</a>;
  }

  return <Link href={href}>{content}</Link>;
}
