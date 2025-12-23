'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken, fetchWithAuth } from '@/lib/auth';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Info,
  CreditCard,
  User,
  Sparkles,
  Clock,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

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
  icon: React.ElementType;
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
      <AppLayout title="Início">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-verde-oliva/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-verde-oliva animate-spin" />
            </div>
            <p className="text-cinza-medio">Carregando seu painel...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout title="Início">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-erro/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-erro" />
            </div>
            <h1 className="text-xl font-semibold text-cinza-escuro mb-2">Sessão expirada</h1>
            <p className="text-cinza-medio text-sm mb-6">{error || 'Faça login para continuar.'}</p>
            <Button onClick={() => router.push('/login')} className="w-full">
              Fazer login
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const journeySteps: JourneyStep[] = [
    {
      id: 'cadastro',
      title: 'Cadastro',
      description: 'Concluído',
      status: 'completed',
      href: '#',
      icon: CheckCircle2,
    },
    {
      id: 'pre-anamnese',
      title: 'Pré-Anamnese',
      description: preAnamneseCompleted ? 'Concluído' : 'Pendente',
      status: preAnamneseCompleted ? 'completed' : 'current',
      href: '/pre-anamnese',
      icon: ClipboardList,
    },
    {
      id: 'consulta',
      title: 'Consulta',
      description: preAnamneseCompleted ? 'Disponível' : 'Aguardando',
      status: preAnamneseCompleted ? 'current' : 'pending',
      href: '/agendar',
      icon: Stethoscope,
    },
    {
      id: 'prescricao',
      title: 'Prescrição',
      description: 'Aguardando',
      status: 'pending',
      href: '#',
      icon: FileText,
    },
  ];

  const currentStep = journeySteps.find(s => s.status === 'current');
  const completedSteps = journeySteps.filter(s => s.status === 'completed').length;
  const progressPercent = (completedSteps / journeySteps.length) * 100;

  const urgencyConfig = {
    baixa: { color: 'text-sucesso', bg: 'bg-sucesso/10', border: 'border-sucesso/20', label: 'Prioridade Baixa' },
    moderada: { color: 'text-aviso', bg: 'bg-aviso/10', border: 'border-aviso/20', label: 'Prioridade Moderada' },
    alta: { color: 'text-erro', bg: 'bg-erro/10', border: 'border-erro/20', label: 'Prioridade Alta' },
  };

  const quickActions = [
    { href: '/planos', icon: CreditCard, label: 'Planos', desc: 'Ver opções' },
    { href: '/educacao', icon: BookOpen, label: 'Educação', desc: 'Artigos' },
    { href: '/contato', icon: MessageCircle, label: 'Suporte', desc: 'Falar conosco' },
    { href: '/doacoes', icon: Heart, label: 'Doações', desc: 'Apoiar' },
  ];

  return (
    <AppLayout title="Início">
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-verde-oliva to-verde-escuro rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/70 text-sm mb-1">Bem-vindo de volta</p>
                <h1 className="text-2xl font-bold">
                  Olá, {user.nome?.split(' ')[0] || 'Associado'}
                </h1>
              </div>
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                Ativo
              </Badge>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-white/80">Sua jornada</span>
                <span className="text-sm font-semibold">{completedSteps}/{journeySteps.length} etapas</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
          {journeySteps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id} 
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  step.status === 'completed' 
                    ? 'bg-sucesso/10 text-sucesso' 
                    : step.status === 'current' 
                    ? 'bg-verde-oliva text-white shadow-lg shadow-verde-oliva/25' 
                    : 'bg-cinza-muito-claro text-cinza-medio'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{step.title}</span>
                {step.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
              </div>
            );
          })}
        </motion.div>

        {currentStep && currentStep.href !== '#' && (
          <motion.div variants={itemVariants}>
            <Link href={currentStep.href}>
              <div className="group bg-white rounded-2xl p-5 border border-cinza-claro hover:border-verde-oliva/30 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-verde-oliva/10 rounded-xl flex items-center justify-center group-hover:bg-verde-oliva group-hover:scale-105 transition-all">
                    <Play className="w-6 h-6 text-verde-oliva group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-verde-oliva font-medium uppercase tracking-wide mb-1">Próximo passo</p>
                    <h2 className="text-lg font-semibold text-cinza-escuro">{currentStep.title}</h2>
                    <p className="text-sm text-cinza-medio">Complete para avançar na sua jornada</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-cinza-claro group-hover:text-verde-oliva group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {preAnamnese && preAnamnese.diagnostico && (
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-cinza-claro overflow-hidden">
            <div className="px-5 py-4 bg-gradient-to-r from-verde-oliva/5 to-transparent border-b border-cinza-claro flex items-center gap-3">
              <div className="w-10 h-10 bg-verde-oliva/10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-verde-oliva" />
              </div>
              <div>
                <h2 className="font-semibold text-cinza-escuro">Seu Diagnóstico ABRACANM</h2>
                <p className="text-xs text-cinza-medio">Baseado na sua pré-anamnese</p>
              </div>
            </div>
            
            <div className="p-5 space-y-5">
              <div>
                <h3 className="font-medium text-cinza-escuro text-lg">{preAnamnese.diagnostico.titulo}</h3>
                <p className="text-sm text-cinza-medio mt-1">{preAnamnese.diagnostico.resumo}</p>
              </div>

              <div className={`p-4 rounded-xl border ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].bg} ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].border}`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].color}`} />
                  <span className={`text-sm font-semibold ${urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].color}`}>
                    {urgencyConfig[preAnamnese.diagnostico.nivelUrgencia].label}
                  </span>
                </div>
                {preAnamnese.diagnostico.observacoes && (
                  <p className="text-sm text-cinza-escuro mt-2">{preAnamnese.diagnostico.observacoes}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {(preAnamnese.diagnostico.indicacoes || []).length > 0 && (
                  <div className="p-4 bg-sucesso/5 rounded-xl">
                    <h4 className="text-sm font-semibold text-sucesso mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Indicações
                    </h4>
                    <ul className="space-y-2">
                      {(preAnamnese.diagnostico.indicacoes || []).map((item, idx) => (
                        <li key={idx} className="text-sm text-cinza-escuro flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-sucesso flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(preAnamnese.diagnostico.contraindicacoes || []).length > 0 && (
                  <div className="p-4 bg-erro/5 rounded-xl">
                    <h4 className="text-sm font-semibold text-erro mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Atenção
                    </h4>
                    <ul className="space-y-2">
                      {(preAnamnese.diagnostico.contraindicacoes || []).map((item, idx) => (
                        <li key={idx} className="text-sm text-cinza-escuro flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-erro flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {(preAnamnese.recomendacoes || []).length > 0 && (
                <div className="pt-4 border-t border-cinza-claro">
                  <h4 className="text-sm font-semibold text-cinza-escuro mb-3">Recomendações</h4>
                  <div className="space-y-2">
                    {(preAnamnese.recomendacoes || []).map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-off-white rounded-lg">
                        <span className="w-6 h-6 bg-verde-oliva text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-cinza-escuro">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-cinza-claro">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-verde-oliva/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-verde-oliva" />
                    </div>
                    <div>
                      <p className="text-xs text-cinza-medio">Próximo passo</p>
                      <p className="text-sm font-medium text-cinza-escuro">{preAnamnese.proximosPasso}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <button 
                      onClick={() => setShowScoreDetails(!showScoreDetails)}
                      className="flex items-center gap-1 text-xs text-cinza-medio hover:text-verde-oliva transition mb-1"
                    >
                      <Info className="w-3 h-3" />
                      Detalhes
                      {showScoreDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    <div className="text-3xl font-bold text-verde-oliva">
                      {preAnamnese.scorePrioridade}
                      <span className="text-sm font-normal text-cinza-medio">/100</span>
                    </div>
                    <p className="text-xs text-cinza-medio">Score de Prioridade</p>
                  </div>
                </div>

                {showScoreDetails && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-off-white rounded-xl space-y-3"
                  >
                    <p className="text-xs font-semibold text-cinza-escuro">Composição do Score:</p>
                    {preAnamnese.diagnostico.scoreExplicacao && preAnamnese.diagnostico.scoreExplicacao.length > 0 ? (
                      preAnamnese.diagnostico.scoreExplicacao.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-cinza-escuro">{item.criterio}</span>
                            <p className="text-xs text-cinza-medio">{item.descricao}</p>
                          </div>
                          <span className="font-bold text-verde-oliva">+{item.pontos}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-cinza-escuro">Intensidade dos Sintomas</span>
                            <p className="text-xs text-cinza-medio">Gravidade {preAnamnese.gravidade}/5</p>
                          </div>
                          <span className="font-bold text-verde-oliva">+{preAnamnese.gravidade * 20}</span>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                <Link href="/agendar">
                  <Button className="w-full h-12 text-base" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Minha Consulta
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <h3 className="text-sm font-semibold text-cinza-escuro mb-3">Acesso rápido</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <div className="group bg-white rounded-xl p-4 border border-cinza-claro hover:border-verde-oliva/30 hover:shadow-md transition-all cursor-pointer text-center">
                    <div className="w-12 h-12 mx-auto bg-verde-oliva/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-verde-oliva group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5 text-verde-oliva group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-medium text-cinza-escuro text-sm">{action.label}</h4>
                    <p className="text-xs text-cinza-medio mt-0.5">{action.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
