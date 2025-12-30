'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getToken, clearToken, fetchWithAuth } from '@/lib/auth';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  ClipboardList, 
  Calendar,
  CreditCard,
  User,
  MessageCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Pill,
  FileText,
  Activity,
  Wallet,
  Star,
  Shield,
  Sparkles,
  Crown,
  Video,
  HeartPulse,
  Gift
} from 'lucide-react';
import CannabisLeaf from '@/components/icons/CannabisLeaf';

type PlanoAtivo = {
  id: string;
  nome: string;
  tipo: string;
  beneficios: string[];
};

type AssinaturaAtiva = {
  id: string;
  status: string;
  dataInicio: string | null;
  dataFim: string | null;
  proximaCobranca: string | null;
};

type UserData = {
  id: string;
  email: string;
  role: string;
  nome: string;
  planoAtivo: PlanoAtivo | null;
  assinaturaAtiva: AssinaturaAtiva | null;
};

interface Diagnostico {
  titulo: string;
  resumo: string;
  nivelUrgencia: 'baixa' | 'moderada' | 'alta';
  indicacoes: string[];
  observacoes: string;
}

interface PreAnamneseData {
  id: string;
  diagnostico: Diagnostico;
  scorePrioridade: number;
  criadoEm: string;
}

function DashboardSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3FA174]/10 mb-4">
          <div className="w-5 h-5 border-2 border-[#3FA174] border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-gray-500">Carregando...</p>
      </div>
    </div>
  );
}

const planoBadgeConfig: Record<string, { bg: string; text: string; icon: React.ElementType; gradient: string }> = {
  'Essencial': { 
    bg: 'bg-emerald-100', 
    text: 'text-emerald-700', 
    icon: Shield,
    gradient: 'from-emerald-500 to-green-600'
  },
  'Premium': { 
    bg: 'bg-amber-100', 
    text: 'text-amber-700', 
    icon: Crown,
    gradient: 'from-amber-400 to-orange-500'
  },
  'VIP': { 
    bg: 'bg-violet-100', 
    text: 'text-violet-700', 
    icon: Sparkles,
    gradient: 'from-violet-500 to-purple-600'
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preAnamnese, setPreAnamnese] = useState<PreAnamneseData | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            clearToken();
            router.replace('/login');
          }
          throw new Error('Sessão inválida');
        }
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
        
        fetchWithAuth<{ completed: boolean; preAnamnese?: PreAnamneseData }>(
          '/api/pre-anamnese',
          { skipLogoutOn401: true }
        )
          .then((preAnamneseData) => {
            if (preAnamneseData.completed && preAnamneseData.preAnamnese) {
              setPreAnamnese(preAnamneseData.preAnamnese);
            }
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <AppLayout title="Início">
        <DashboardSkeleton />
      </AppLayout>
    );
  }

  if (error || !user) {
    return null;
  }

  const firstName = user.nome?.split(' ')[0] || 'Associado';
  const hasPreAnamnese = !!preAnamnese;
  const hasPlanoAtivo = !!user.planoAtivo;
  const planoNome = user.planoAtivo?.nome || 'Essencial';
  const planoConfig = planoBadgeConfig[planoNome] || planoBadgeConfig['Essencial'];
  const PlanoIcon = planoConfig.icon;

  if (hasPlanoAtivo) {
    return (
      <AppLayout title="Início">
        <div className="space-y-6">
          {/* Header Premium - Design Minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Bem-vindo de volta,</p>
                  <h1 className="text-2xl font-semibold text-gray-900 mt-0.5">{firstName}</h1>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full">
                  <PlanoIcon className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{planoNome}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#3FA174]" />
                    <span className="text-sm text-gray-600">Membro ativo</span>
                  </div>
                  {user.assinaturaAtiva?.dataFim && (
                    <span className="text-sm text-gray-400">
                      Válido até {new Date(user.assinaturaAtiva.dataFim).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
                <Link href="/carteirinha">
                  <span className="text-sm text-[#3FA174] font-medium hover:underline cursor-pointer">
                    Ver carteirinha
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Ações Rápidas - Grid Minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            <Link href="/agendar-consulta" className="group">
              <div className="bg-[#3FA174] rounded-2xl p-5 text-white transition-all hover:shadow-lg hover:scale-[1.02]">
                <Calendar className="w-6 h-6 mb-3" />
                <p className="font-medium">Agendar</p>
                <p className="text-sm text-white/70">Consulta</p>
              </div>
            </Link>
            <Link href="/pre-anamnese" className="group">
              <div className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-lg hover:scale-[1.02] ${hasPreAnamnese ? 'border-[#3FA174]' : 'border-gray-200'}`}>
                <ClipboardList className={`w-6 h-6 mb-3 ${hasPreAnamnese ? 'text-[#3FA174]' : 'text-gray-400'}`} />
                <p className="font-medium text-gray-900">Anamnese</p>
                <p className="text-sm text-gray-500">{hasPreAnamnese ? 'Concluída' : 'Pendente'}</p>
              </div>
            </Link>
            <Link href="/carteirinha" className="group">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all hover:shadow-lg hover:scale-[1.02]">
                <Wallet className="w-6 h-6 mb-3 text-gray-400" />
                <p className="font-medium text-gray-900">Carteirinha</p>
                <p className="text-sm text-gray-500">Digital</p>
              </div>
            </Link>
            <Link href="/perfil" className="group">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 transition-all hover:shadow-lg hover:scale-[1.02]">
                <User className="w-6 h-6 mb-3 text-gray-400" />
                <p className="font-medium text-gray-900">Perfil</p>
                <p className="text-sm text-gray-500">Meus dados</p>
              </div>
            </Link>
          </motion.div>

          {/* Alerta Pré-Anamnese */}
          {!hasPreAnamnese && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">Complete sua pré-anamnese</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Necessário para agendar sua consulta
                  </p>
                </div>
                <Link href="/pre-anamnese">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    Iniciar
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Card de Diagnóstico */}
          {preAnamnese && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3FA174]/10 flex items-center justify-center">
                      <Pill className="w-5 h-5 text-[#3FA174]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{preAnamnese.diagnostico.titulo}</p>
                      <p className="text-sm text-gray-500">Avaliação médica</p>
                    </div>
                  </div>
                  <PriorityBadge level={preAnamnese.diagnostico.nivelUrgencia} />
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {preAnamnese.diagnostico.resumo}
                </p>
                
                {preAnamnese.diagnostico.indicacoes?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {preAnamnese.diagnostico.indicacoes.slice(0, 3).map((item, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 px-5 py-4 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Próximo passo: agendar consulta</span>
                  <Link href="/agendar-consulta">
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                      Agendar agora
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Benefícios - Design Limpo */}
          {user.planoAtivo?.beneficios && user.planoAtivo.beneficios.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <p className="text-sm font-medium text-gray-500 mb-4">Seus benefícios</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {user.planoAtivo.beneficios.slice(0, 4).map((beneficio, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#3FA174] flex-shrink-0" />
                    <span className="text-sm text-gray-700">{beneficio}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Links Úteis - Grid Minimalista */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid sm:grid-cols-3 gap-4"
          >
            <a 
              href="https://chat.whatsapp.com/BwaiJDQWbY786aOdMckn9m" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-5 transition-all hover:shadow-md hover:border-[#3FA174]">
                <MessageCircle className="w-6 h-6 text-[#3FA174] mb-3" />
                <p className="font-medium text-gray-900">Comunidade</p>
                <p className="text-sm text-gray-500 mt-1">Grupo WhatsApp</p>
              </div>
            </a>
            <Link href="/educacao" className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 transition-all hover:shadow-md hover:border-[#3FA174]">
                <FileText className="w-6 h-6 text-gray-400 mb-3 group-hover:text-[#3FA174] transition-colors" />
                <p className="font-medium text-gray-900">Educação</p>
                <p className="text-sm text-gray-500 mt-1">Artigos e vídeos</p>
              </div>
            </Link>
            <Link href="/contato" className="group">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 transition-all hover:shadow-md hover:border-[#3FA174]">
                <HeartPulse className="w-6 h-6 text-gray-400 mb-3 group-hover:text-[#3FA174] transition-colors" />
                <p className="font-medium text-gray-900">Suporte</p>
                <p className="text-sm text-gray-500 mt-1">Atendimento prioritário</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Início">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Olá, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground">O que você precisa hoje?</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickAction 
            href="/pre-anamnese" 
            icon={ClipboardList} 
            label="Pré-Anamnese"
            done={hasPreAnamnese}
          />
          <QuickAction 
            href="/agendar" 
            icon={Calendar} 
            label="Agendar"
          />
          <QuickAction 
            href="/planos" 
            icon={CreditCard} 
            label="Planos"
          />
          <QuickAction 
            href="/perfil" 
            icon={User} 
            label="Perfil"
          />
          <QuickAction 
            href="/carteirinha" 
            icon={Wallet} 
            label="Carteirinha"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Crown className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">Seja um associado Premium</p>
              <p className="text-sm text-gray-500 mt-0.5">
                Consultas com desconto e suporte prioritário
              </p>
            </div>
            <Link href="/planos">
              <Button className="bg-gray-900 hover:bg-gray-800">
                Ver planos
              </Button>
            </Link>
          </div>
        </div>

        {!hasPreAnamnese && (
          <div className="bg-accent/50 border border-accent rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">Complete sua pré-anamnese</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Precisamos de algumas informações para preparar sua consulta
                </p>
                <Link href="/pre-anamnese">
                  <Button size="sm" className="mt-3">
                    Começar
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {preAnamnese && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Sua avaliação</span>
              </div>
              <PriorityBadge level={preAnamnese.diagnostico.nivelUrgencia} />
            </div>
            
            <div className="p-4">
              <p className="font-medium text-foreground">{preAnamnese.diagnostico.titulo}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {preAnamnese.diagnostico.resumo}
              </p>
              
              {preAnamnese.diagnostico.indicacoes?.length > 0 && (
                <>
                  <Separator className="my-3" />
                  <p className="text-xs text-muted-foreground mb-2">Indicações:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {preAnamnese.diagnostico.indicacoes.slice(0, 3).map((item, i) => (
                      <span 
                        key={i} 
                        className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  Próximo: agendar consulta
                </div>
                <Link href="/agendar">
                  <Button size="sm">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    Agendar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <Separator />

        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/educacao">
            <div className="group border border-border rounded-lg p-4 hover:border-primary/30 hover:bg-accent/30 transition-all">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Educação
                  </p>
                  <p className="text-xs text-muted-foreground">Artigos sobre cannabis medicinal</p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/contato">
            <div className="group border border-border rounded-lg p-4 hover:border-primary/30 hover:bg-accent/30 transition-all">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Suporte
                  </p>
                  <p className="text-xs text-muted-foreground">Fale com nossa equipe</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

function QuickAction({ 
  href, 
  icon: Icon, 
  label, 
  done = false 
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  done?: boolean;
}) {
  return (
    <Link href={href}>
      <div className="group bg-card border border-border rounded-lg p-4 hover:border-primary/40 hover:shadow-sm transition-all h-full">
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-5 h-5 text-primary" />
          {done && <CheckCircle2 className="w-4 h-4 text-green-600" />}
        </div>
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {label}
        </p>
      </div>
    </Link>
  );
}

function PremiumQuickAction({ 
  href, 
  icon: Icon, 
  label, 
  done = false,
  highlight = false
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  done?: boolean;
  highlight?: boolean;
}) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group rounded-xl p-4 transition-all h-full ${
          highlight 
            ? 'bg-[#3FA174] text-white shadow-lg shadow-[#3FA174]/20' 
            : 'bg-white border border-gray-200 hover:border-[#3FA174]/40 hover:shadow-md'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <Icon className={`w-5 h-5 ${highlight ? 'text-white' : 'text-[#3FA174]'}`} />
          {done && <CheckCircle2 className={`w-4 h-4 ${highlight ? 'text-white' : 'text-green-600'}`} />}
        </div>
        <p className={`text-sm font-medium ${
          highlight ? 'text-white' : 'text-gray-900 group-hover:text-[#3FA174]'
        } transition-colors`}>
          {label}
        </p>
      </motion.div>
    </Link>
  );
}

function PriorityBadge({ level }: { level: 'baixa' | 'moderada' | 'alta' }) {
  const config = {
    baixa: { className: 'bg-green-100 text-green-700', label: 'Baixa' },
    moderada: { className: 'bg-yellow-100 text-yellow-700', label: 'Moderada' },
    alta: { className: 'bg-red-100 text-red-700', label: 'Alta' },
  };
  const { className, label } = config[level];
  
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded ${className}`}>
      {label}
    </span>
  );
}
