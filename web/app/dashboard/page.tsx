'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken, fetchWithAuth } from '@/lib/auth';
import Header from '@/components/shared/Header';
import { 
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
  Activity,
  AlertTriangle,
  Target,
  Calendar,
  ChevronDown,
  ChevronUp,
  Info
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

interface ScoreExplanation {
  criterio: string;
  descricao: string;
  pontos: number;
}

interface Diagnostico {
  titulo: string;
  resumo: string;
  nivelUrgencia: 'baixa' | 'moderada' | 'alta';
  indicacoes: string[];
  contraindicacoes: string[];
  observacoes: string;
  scoreExplicacao?: ScoreExplanation[];
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
  const [showScoreDetails, setShowScoreDetails] = useState(false);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-verde-oliva animate-spin mx-auto" />
            <p className="mt-3 text-cinza-medio text-sm">Carregando...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-erro mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-cinza-escuro mb-2">Sessão expirada</h1>
            <p className="text-cinza-medio text-sm mb-6">{error || 'Faça login para continuar.'}</p>
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2.5 bg-verde-oliva text-white rounded-lg text-sm font-medium hover:bg-verde-oliva/90 transition"
            >
              Fazer login
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
      description: 'Concluído',
      status: 'completed',
      href: '#',
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      id: 'pre-anamnese',
      title: 'Pré-Anamnese',
      description: preAnamneseCompleted ? 'Concluído' : 'Pendente',
      status: preAnamneseCompleted ? 'completed' : 'current',
      href: '/pre-anamnese',
      icon: <ClipboardList className="w-4 h-4" />,
    },
    {
      id: 'consulta',
      title: 'Consulta',
      description: preAnamneseCompleted ? 'Disponível' : 'Aguardando',
      status: preAnamneseCompleted ? 'current' : 'pending',
      href: '#',
      icon: <Stethoscope className="w-4 h-4" />,
    },
    {
      id: 'prescricao',
      title: 'Prescrição',
      description: 'Aguardando',
      status: 'pending',
      href: '#',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const currentStep = journeySteps.find(s => s.status === 'current');

  const urgencyConfig = {
    baixa: { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
    moderada: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    alta: { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-cinza-escuro">
            Olá, {user.nome?.split(' ')[0] || 'Associado'}
          </h1>
          <p className="text-cinza-medio text-sm mt-1">
            Acompanhe sua jornada na medicina canábica
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8 pb-6 border-b border-cinza-claro">
          {journeySteps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                step.status === 'completed' ? 'bg-green-100 text-green-700' :
                step.status === 'current' ? 'bg-verde-oliva text-white' :
                'bg-cinza-muito-claro text-cinza-medio'
              }`}>
                {step.icon}
                <span className="hidden sm:inline">{step.title}</span>
              </div>
              {idx < journeySteps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 ${
                  step.status === 'completed' ? 'bg-green-300' : 'bg-cinza-claro'
                }`} />
              )}
            </div>
          ))}
        </div>

        {currentStep && currentStep.href !== '#' && (
          <div className="mb-8 p-5 border border-verde-oliva/30 rounded-xl bg-verde-oliva/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-verde-oliva font-medium mb-1">Próximo passo</p>
                <h2 className="text-lg font-semibold text-cinza-escuro">{currentStep.title}</h2>
                <p className="text-sm text-cinza-medio mt-0.5">{currentStep.description === 'Pendente' ? 'Complete para avançar na sua jornada' : currentStep.description}</p>
              </div>
              <Link
                href={currentStep.href}
                className="px-5 py-2.5 bg-verde-oliva text-white rounded-lg text-sm font-medium hover:bg-verde-oliva/90 transition flex items-center gap-2"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {preAnamnese && preAnamnese.diagnostico && (
          <div className="mb-8 border border-cinza-claro rounded-xl overflow-hidden">
            <div className="px-5 py-4 bg-cinza-muito-claro/50 border-b border-cinza-claro">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-verde-oliva" />
                <h2 className="font-semibold text-cinza-escuro">Seu Diagnóstico</h2>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <h3 className="font-medium text-cinza-escuro">{preAnamnese.diagnostico.titulo}</h3>
                <p className="text-sm text-cinza-medio mt-1">{preAnamnese.diagnostico.resumo}</p>
              </div>

              <div className={`p-3 rounded-lg border ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].bg} ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].border}`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].color}`} />
                  <span className={`text-sm font-medium ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].color}`}>
                    {preAnamnese.diagnostico.nivelUrgencia === 'baixa' ? 'Prioridade baixa' : 
                     preAnamnese.diagnostico.nivelUrgencia === 'moderada' ? 'Prioridade moderada' : 'Prioridade alta'}
                  </span>
                </div>
                {preAnamnese.diagnostico.observacoes && (
                  <p className="text-sm text-cinza-escuro mt-2">{preAnamnese.diagnostico.observacoes}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(preAnamnese.diagnostico.indicacoes || []).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-cinza-escuro mb-2 flex items-center gap-1">
                      <Target className="w-4 h-4 text-verde-oliva" />
                      Indicações
                    </h4>
                    <ul className="space-y-1">
                      {(preAnamnese.diagnostico.indicacoes || []).map((item, idx) => (
                        <li key={idx} className="text-sm text-cinza-medio flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-verde-oliva flex-shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(preAnamnese.diagnostico.contraindicacoes || []).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-cinza-escuro mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-erro" />
                      Atenção
                    </h4>
                    <ul className="space-y-1">
                      {(preAnamnese.diagnostico.contraindicacoes || []).map((item, idx) => (
                        <li key={idx} className="text-sm text-cinza-medio flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 text-erro flex-shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {(preAnamnese.recomendacoes || []).length > 0 && (
                <div className="pt-4 border-t border-cinza-claro">
                  <h4 className="text-sm font-medium text-cinza-escuro mb-2">Recomendações</h4>
                  <ul className="space-y-1">
                    {(preAnamnese.recomendacoes || []).map((rec, idx) => (
                      <li key={idx} className="text-sm text-cinza-medio flex items-start gap-2">
                        <span className="w-4 h-4 bg-verde-oliva/10 rounded-full flex items-center justify-center text-verde-oliva text-xs font-medium flex-shrink-0">
                          {idx + 1}
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-cinza-claro">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-cinza-medio">Próximo passo</p>
                    <p className="text-sm text-cinza-escuro">{preAnamnese.proximosPasso}</p>
                  </div>
                  <div className="text-right">
                    <button 
                      onClick={() => setShowScoreDetails(!showScoreDetails)}
                      className="flex items-center gap-1 text-xs text-cinza-medio hover:text-verde-oliva transition"
                    >
                      <Info className="w-3 h-3" />
                      Como calculamos
                      {showScoreDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    <p className="text-2xl font-bold text-verde-oliva">{preAnamnese.scorePrioridade}<span className="text-sm font-normal text-cinza-medio">/100</span></p>
                    <p className="text-xs text-cinza-medio">Score de Prioridade</p>
                  </div>
                </div>

                {showScoreDetails && (
                  <div className="mb-4 p-3 bg-cinza-muito-claro/50 rounded-lg space-y-2">
                    <p className="text-xs font-medium text-cinza-escuro mb-2">Composição do Score:</p>
                    {preAnamnese.diagnostico.scoreExplicacao && preAnamnese.diagnostico.scoreExplicacao.length > 0 ? (
                      preAnamnese.diagnostico.scoreExplicacao.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-medium text-cinza-escuro">{item.criterio}</span>
                            <p className="text-cinza-medio">{item.descricao}</p>
                          </div>
                          <span className="font-semibold text-verde-oliva">+{item.pontos}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-medium text-cinza-escuro">Intensidade dos Sintomas</span>
                            <p className="text-cinza-medio">Baseado na gravidade informada ({preAnamnese.gravidade}/5)</p>
                          </div>
                          <span className="font-semibold text-verde-oliva">+{preAnamnese.gravidade * 20}</span>
                        </div>
                        {preAnamnese.diagnostico.nivelUrgencia !== 'baixa' && (
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="font-medium text-cinza-escuro">Urgência Clínica</span>
                              <p className="text-cinza-medio">Nível {preAnamnese.diagnostico.nivelUrgencia}</p>
                            </div>
                            <span className="font-semibold text-verde-oliva">+{preAnamnese.diagnostico.nivelUrgencia === 'alta' ? 30 : 15}</span>
                          </div>
                        )}
                        {(preAnamnese.diagnostico.contraindicacoes || []).length > 0 && (
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="font-medium text-cinza-escuro">Atenção Especial</span>
                              <p className="text-cinza-medio">Fatores que requerem avaliação cuidadosa</p>
                            </div>
                            <span className="font-semibold text-verde-oliva">+10</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                <Link
                  href="/agendar"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-verde-oliva text-white rounded-xl font-medium hover:bg-verde-oliva/90 transition"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Minha Consulta
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/educacao" className="p-4 border border-cinza-claro rounded-xl hover:border-verde-oliva/50 transition group">
            <BookOpen className="w-5 h-5 text-verde-oliva mb-2" />
            <h3 className="font-medium text-cinza-escuro text-sm">Educação</h3>
            <p className="text-xs text-cinza-medio mt-0.5">Artigos e informações</p>
          </Link>

          <a href="mailto:ouvidoria@abracanm.org.br" className="p-4 border border-cinza-claro rounded-xl hover:border-verde-oliva/50 transition group">
            <MessageCircle className="w-5 h-5 text-verde-oliva mb-2" />
            <h3 className="font-medium text-cinza-escuro text-sm">Suporte</h3>
            <p className="text-xs text-cinza-medio mt-0.5">Fale com a ouvidoria</p>
          </a>

          <Link href="/doacoes" className="p-4 border border-cinza-claro rounded-xl hover:border-verde-oliva/50 transition group">
            <Heart className="w-5 h-5 text-verde-oliva mb-2" />
            <h3 className="font-medium text-cinza-escuro text-sm">Doações</h3>
            <p className="text-xs text-cinza-medio mt-0.5">Apoie a ABRACANM</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
