'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken } from '@/lib/auth';

type User = {
  id: string;
  email: string;
  role: string;
  nome: string;
};

type JourneyStep = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  href: string;
  icon: string;
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
        if (!res.ok) throw new Error('Sessão inválida');
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando sua área...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-16">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sessão expirada</h1>
          <p className="text-gray-600 mb-6">{error || 'Faça login para continuar.'}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
            >
              Fazer login
            </button>
            <button
              onClick={() => router.push('/cadastro')}
              className="px-6 py-3 border border-green-700 text-green-700 rounded-lg font-medium hover:bg-green-50 transition"
            >
              Criar conta
            </button>
          </div>
        </div>
      </main>
    );
  }

  const journeySteps: JourneyStep[] = [
    {
      id: 'cadastro',
      title: 'Cadastro',
      description: 'Seus dados estão seguros conosco',
      status: 'completed',
      href: '/perfil',
      icon: '✓',
    },
    {
      id: 'pre-anamnese',
      title: 'Pré-Anamnese',
      description: 'Conte-nos sobre sua saúde para melhor atendimento',
      status: 'current',
      href: '/pre-anamnese',
      icon: '📋',
    },
    {
      id: 'consulta',
      title: 'Consulta Médica',
      description: 'Atendimento humanizado com especialistas',
      status: 'pending',
      href: '/agendamento',
      icon: '👨‍⚕️',
    },
    {
      id: 'prescricao',
      title: 'Prescrição',
      description: 'Tratamento personalizado para você',
      status: 'pending',
      href: '/prescricoes',
      icon: '📜',
    },
  ];

  const currentStep = journeySteps.find(s => s.status === 'current');
  const completedCount = journeySteps.filter(s => s.status === 'completed').length;
  const progress = (completedCount / journeySteps.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-green-800">ABRACANM</span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-600">Minha Área</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              🌿
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Olá, {user.nome || 'Associado'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Estamos aqui para ajudar você a encontrar mais qualidade de vida através da medicina canábica.
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Sua jornada</span>
              <span className="text-sm text-green-700">{completedCount} de {journeySteps.length} etapas</span>
            </div>
            <div className="h-2 bg-green-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {currentStep && (
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-5 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  {currentStep.icon}
                </div>
                <div className="flex-1">
                  <p className="text-green-100 text-sm mb-1">Próximo passo</p>
                  <h3 className="text-xl font-bold mb-1">{currentStep.title}</h3>
                  <p className="text-green-100 text-sm mb-4">{currentStep.description}</p>
                  <Link
                    href={currentStep.href}
                    className="inline-flex items-center gap-2 bg-white text-green-700 px-5 py-2.5 rounded-lg font-medium hover:bg-green-50 transition"
                  >
                    Continuar
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Etapas da sua jornada</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {journeySteps.map((step, index) => (
              <StepCard key={step.id} step={step} stepNumber={index + 1} />
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                📚
              </div>
              <h3 className="font-semibold text-gray-800">Educação</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Conheça mais sobre a medicina canábica com artigos científicos e informativos.
            </p>
            <Link href="/educacao" className="text-green-700 font-medium text-sm hover:underline">
              Acessar conteúdos →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg">
                💬
              </div>
              <h3 className="font-semibold text-gray-800">Suporte</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Tem dúvidas? Nossa equipe de acolhimento está pronta para ajudar você.
            </p>
            <a 
              href="mailto:ouvidoria@abracanm.org.br" 
              className="text-green-700 font-medium text-sm hover:underline"
            >
              Falar com a ouvidoria →
            </a>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm p-5 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-lg">
                💚
              </div>
              <h3 className="font-semibold text-green-800">Apoie a ABRACANM</h3>
            </div>
            <p className="text-green-700 text-sm mb-4">
              Sua contribuição ajuda a manter nosso trabalho de acolhimento.
            </p>
            <Link href="/doacoes" className="text-green-800 font-medium text-sm hover:underline">
              Fazer uma doação →
            </Link>
          </div>
        </section>

        <section className="bg-green-800 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">
            Juntos pela sua qualidade de vida
          </h3>
          <p className="text-green-200 text-sm max-w-lg mx-auto">
            A ABRACANM está ao seu lado em cada etapa. A medicina canábica pode transformar vidas 
            com ciência, segurança e humanidade.
          </p>
        </section>
      </div>
    </main>
  );
}

function StepCard({ step, stepNumber }: { step: JourneyStep; stepNumber: number }) {
  const statusStyles = {
    completed: {
      bg: 'bg-green-50 border-green-200',
      icon: 'bg-green-500 text-white',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
    },
    current: {
      bg: 'bg-white border-green-300 shadow-md',
      icon: 'bg-green-600 text-white',
      text: 'text-gray-800',
      badge: 'bg-green-600 text-white',
    },
    pending: {
      bg: 'bg-gray-50 border-gray-200',
      icon: 'bg-gray-300 text-gray-600',
      text: 'text-gray-500',
      badge: 'bg-gray-100 text-gray-500',
    },
  };

  const styles = statusStyles[step.status];
  const statusLabels = {
    completed: 'Concluído',
    current: 'Em andamento',
    pending: 'Pendente',
  };

  return (
    <Link 
      href={step.href}
      className={`block rounded-xl border-2 p-5 transition hover:shadow-lg ${styles.bg}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${styles.icon}`}>
          {step.status === 'completed' ? '✓' : stepNumber}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold ${styles.text}`}>{step.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
              {statusLabels[step.status]}
            </span>
          </div>
          <p className="text-gray-500 text-sm">{step.description}</p>
        </div>
      </div>
    </Link>
  );
}
