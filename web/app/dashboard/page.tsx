'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken, fetchWithAuth } from '@/lib/auth';
import { 
  Leaf, 
  LogOut, 
  CheckCircle2, 
  ClipboardList, 
  Stethoscope, 
  FileText, 
  BookOpen, 
  MessageCircle, 
  Heart,
  ArrowRight,
  Loader2,
  AlertCircle,
  Calendar,
  Activity,
  AlertTriangle,
  Target
} from 'lucide-react';

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
  icon: React.ReactNode;
};

interface Diagnostico {
  titulo: string;
  resumo: string;
  nivelUrgencia: 'baixa' | 'moderada' | 'alta';
  indicacoes: string[];
  contraindicacoes: string[];
  observacoes: string;
}

interface PreAnamneseData {
  id: string;
  perfil: string;
  objetivoPrincipal: string;
  gravidade: number;
  diagnostico: Diagnostico;
  recomendacoes: string[];
  proximosPasso: string;
  scorePrioridade: number;
  criadoEm: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preAnamnese, setPreAnamnese] = useState<PreAnamneseData | null>(null);
  const [preAnamneseCompleted, setPreAnamneseCompleted] = useState(false);

  useEffect(() => {
    const token = getToken();
    
    if (!token) {
      router.replace('/login');
      return;
    }

    Promise.all([
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      }).then(async (res) => {
        if (!res.ok) throw new Error('Sessão inválida');
        return res.json();
      }),
      fetchWithAuth<{ completed: boolean; preAnamnese?: PreAnamneseData }>('/api/pre-anamnese')
        .catch(() => ({ completed: false, preAnamnese: undefined }))
    ])
      .then(([userData, preAnamneseData]) => {
        setUser(userData);
        if (preAnamneseData.completed && preAnamneseData.preAnamnese) {
          setPreAnamnese(preAnamneseData.preAnamnese);
          setPreAnamneseCompleted(true);
        }
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-off-white to-cinza-muito-claro">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-verde-oliva animate-spin mx-auto" />
          <p className="mt-4 text-cinza-medio">Carregando sua área...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 py-16">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-erro/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-erro" />
          </div>
          <h1 className="text-2xl font-bold text-cinza-escuro mb-2">Sessão expirada</h1>
          <p className="text-cinza-medio mb-6">{error || 'Faça login para continuar.'}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 bg-verde-oliva text-white rounded-lg font-medium hover:bg-verde-claro transition"
            >
              Fazer login
            </button>
            <button
              onClick={() => router.push('/cadastro')}
              className="px-6 py-3 border border-verde-oliva text-verde-oliva rounded-lg font-medium hover:bg-verde-claro/10 transition"
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
      href: '#',
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      id: 'pre-anamnese',
      title: 'Pré-Anamnese',
      description: preAnamneseCompleted 
        ? 'Diagnóstico ABRACANM gerado' 
        : 'Conte-nos sobre sua saúde para melhor atendimento',
      status: preAnamneseCompleted ? 'completed' : 'current',
      href: '/pre-anamnese',
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      id: 'consulta',
      title: 'Consulta Médica',
      description: preAnamneseCompleted 
        ? 'Agende sua consulta com um médico prescritor'
        : 'Em breve - Atendimento humanizado com especialistas',
      status: preAnamneseCompleted ? 'current' : 'pending',
      href: '#',
      icon: <Stethoscope className="w-5 h-5" />,
    },
    {
      id: 'prescricao',
      title: 'Prescrição',
      description: 'Em breve - Tratamento personalizado para você',
      status: 'pending',
      href: '#',
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const currentStep = journeySteps.find(s => s.status === 'current');
  const completedCount = journeySteps.filter(s => s.status === 'completed').length;
  const progress = (completedCount / journeySteps.length) * 100;

  const urgencyConfig = {
    baixa: { color: 'text-sucesso', bg: 'bg-sucesso/10', label: 'Baixa prioridade' },
    moderada: { color: 'text-dourado', bg: 'bg-dourado/10', label: 'Prioridade moderada' },
    alta: { color: 'text-erro', bg: 'bg-erro/10', label: 'Alta prioridade' },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-verde-oliva">ABRACANM</span>
            <span className="text-sm text-cinza-claro">|</span>
            <span className="text-sm text-cinza-medio">Minha Área</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-cinza-medio hover:text-cinza-escuro transition"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-verde-claro/20 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-verde-oliva" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-cinza-escuro">
                Olá, {user.nome || 'Associado'}!
              </h1>
              <p className="text-cinza-medio mt-1">
                Estamos aqui para ajudar você a encontrar mais qualidade de vida através da medicina canábica.
              </p>
            </div>
          </div>

          <div className="bg-verde-claro/10 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-verde-oliva">Sua jornada</span>
              <span className="text-sm text-verde-oliva">{completedCount} de {journeySteps.length} etapas</span>
            </div>
            <div className="h-2 bg-verde-claro/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-verde-oliva rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {currentStep && (
            <div className="bg-gradient-to-r from-verde-oliva to-verde-claro rounded-xl p-5 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {currentStep.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-sm mb-1">Próximo passo</p>
                  <h3 className="text-xl font-bold mb-1">{currentStep.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{currentStep.description}</p>
                  <Link
                    href={currentStep.href}
                    className="inline-flex items-center gap-2 bg-white text-verde-oliva px-5 py-2.5 rounded-lg font-medium hover:bg-off-white transition"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {preAnamnese && preAnamnese.diagnostico && (
          <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8 border-2 border-verde-oliva/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-verde-oliva" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-cinza-escuro">Seu Diagnóstico ABRACANM</h2>
                <p className="text-sm text-cinza-medio">Análise personalizada baseada na sua pré-anamnese</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-verde-claro/10 rounded-xl p-4">
                  <h3 className="font-semibold text-verde-oliva mb-2">{preAnamnese.diagnostico.titulo}</h3>
                  <p className="text-sm text-cinza-escuro">{preAnamnese.diagnostico.resumo}</p>
                </div>

                <div className={`rounded-xl p-4 ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`w-5 h-5 ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].color}`} />
                    <span className={`font-semibold ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].color}`}>
                      {urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].label}
                    </span>
                  </div>
                  <p className="text-sm text-cinza-escuro">{preAnamnese.diagnostico.observacoes}</p>
                </div>

                {preAnamnese.diagnostico.indicacoes.length > 0 && (
                  <div className="bg-info/10 rounded-xl p-4">
                    <h4 className="font-semibold text-info mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Indicações identificadas
                    </h4>
                    <ul className="space-y-1">
                      {preAnamnese.diagnostico.indicacoes.map((indicacao, idx) => (
                        <li key={idx} className="text-sm text-cinza-escuro flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
                          {indicacao}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {preAnamnese.diagnostico.contraindicacoes.length > 0 && (
                  <div className="bg-erro/10 rounded-xl p-4">
                    <h4 className="font-semibold text-erro mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Pontos de atenção
                    </h4>
                    <ul className="space-y-1">
                      {preAnamnese.diagnostico.contraindicacoes.map((contra, idx) => (
                        <li key={idx} className="text-sm text-cinza-escuro flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-erro flex-shrink-0 mt-0.5" />
                          {contra}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-dourado/10 rounded-xl p-4">
                  <h4 className="font-semibold text-dourado mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Próximo passo
                  </h4>
                  <p className="text-sm text-cinza-escuro mb-4">{preAnamnese.proximosPasso}</p>
                  <button className="w-full bg-verde-oliva text-white px-4 py-3 rounded-lg font-medium hover:bg-verde-claro transition flex items-center justify-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Agendar Consulta
                  </button>
                </div>

                <div className="bg-off-white rounded-xl p-4">
                  <h4 className="font-semibold text-cinza-escuro mb-3">Recomendações</h4>
                  <ul className="space-y-2">
                    {preAnamnese.recomendacoes.map((rec, idx) => (
                      <li key={idx} className="text-sm text-cinza-escuro flex items-start gap-2">
                        <span className="w-5 h-5 bg-verde-oliva/10 rounded-full flex items-center justify-center text-verde-oliva text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-cinza-muito-claro rounded-xl p-4 text-center">
                  <p className="text-xs text-cinza-medio mb-1">Score de prioridade</p>
                  <div className="text-3xl font-bold text-verde-oliva">{preAnamnese.scorePrioridade}</div>
                  <p className="text-xs text-cinza-medio">de 100</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-cinza-escuro mb-4">Etapas da sua jornada</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {journeySteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-info" />
              </div>
              <h3 className="font-semibold text-cinza-escuro">Educação</h3>
            </div>
            <p className="text-cinza-medio text-sm mb-4">
              Conheça mais sobre a medicina canábica com artigos científicos e informativos.
            </p>
            <Link href="/educacao" className="text-verde-oliva font-medium text-sm hover:underline inline-flex items-center gap-1">
              Acessar conteúdos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-dourado/10 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-dourado" />
              </div>
              <h3 className="font-semibold text-cinza-escuro">Suporte</h3>
            </div>
            <p className="text-cinza-medio text-sm mb-4">
              Tem dúvidas? Nossa equipe de acolhimento está pronta para ajudar você.
            </p>
            <a 
              href="mailto:ouvidoria@abracanm.org.br" 
              className="text-verde-oliva font-medium text-sm hover:underline inline-flex items-center gap-1"
            >
              Falar com a ouvidoria
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-verde-claro/10 border border-verde-claro/30 rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-verde-oliva" />
              </div>
              <h3 className="font-semibold text-verde-oliva">Apoie a ABRACANM</h3>
            </div>
            <p className="text-cinza-medio text-sm mb-4">
              Sua contribuição ajuda a manter nosso trabalho de acolhimento.
            </p>
            <Link href="/doacoes" className="text-verde-oliva font-medium text-sm hover:underline inline-flex items-center gap-1">
              Fazer uma doação
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        <section className="bg-cinza-escuro rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">
            Juntos pela sua qualidade de vida
          </h3>
          <p className="text-off-white/70 text-sm max-w-lg mx-auto">
            A ABRACANM está ao seu lado em cada etapa. A medicina canábica pode transformar vidas 
            com ciência, segurança e humanidade.
          </p>
        </section>
      </div>
    </main>
  );
}

function StepCard({ step }: { step: JourneyStep }) {
  const statusStyles = {
    completed: {
      bg: 'bg-verde-claro/10 border-verde-claro/30',
      icon: 'bg-sucesso text-white',
      text: 'text-verde-oliva',
      badge: 'bg-sucesso/10 text-sucesso',
    },
    current: {
      bg: 'bg-white border-verde-oliva shadow-md',
      icon: 'bg-verde-oliva text-white',
      text: 'text-cinza-escuro',
      badge: 'bg-verde-oliva text-white',
    },
    pending: {
      bg: 'bg-cinza-muito-claro border-cinza-claro',
      icon: 'bg-cinza-claro text-cinza-medio',
      text: 'text-cinza-medio',
      badge: 'bg-cinza-claro text-cinza-medio',
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
      className={`block rounded-xl border p-5 transition hover:shadow-lg ${styles.bg}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${styles.icon}`}>
          {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold ${styles.text}`}>{step.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
              {statusLabels[step.status]}
            </span>
          </div>
          <p className="text-cinza-medio text-sm">{step.description}</p>
        </div>
      </div>
    </Link>
  );
}
