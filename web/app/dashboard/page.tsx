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
  AlertCircle,
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
import { toast } from 'sonner';
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
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-border rounded-lg p-4">
            <Skeleton className="h-5 w-5 mb-3" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      <div className="bg-white border border-border rounded-lg p-5">
        <Skeleton className="h-5 w-32 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
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

    Promise.all([
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      }).then(res => {
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
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        clearToken();
        toast.error('Sessão expirada', {
          description: 'Por favor, faça login novamente.'
        });
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
    return (
      <AppLayout title="Início">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          <p className="text-foreground font-medium mb-1">Sessão expirada</p>
          <p className="text-muted-foreground text-sm mb-4">Faça login para continuar</p>
          <Button onClick={() => router.push('/login')}>Entrar</Button>
        </div>
      </AppLayout>
    );
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${planoConfig.gradient} p-6 text-white`}
          >
            <div className="absolute top-0 right-0 opacity-10">
              <CannabisLeaf size={120} className="text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-medium">Bem-vindo de volta,</p>
                  <h1 className="text-2xl font-bold">{firstName}</h1>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <PlanoIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{planoNome}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <Video className="w-5 h-5 mx-auto mb-1 opacity-90" />
                  <p className="text-xs opacity-80">Teleconsulta</p>
                  <p className="text-sm font-semibold">Ilimitada</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <HeartPulse className="w-5 h-5 mx-auto mb-1 opacity-90" />
                  <p className="text-xs opacity-80">Suporte</p>
                  <p className="text-sm font-semibold">Prioritário</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <Gift className="w-5 h-5 mx-auto mb-1 opacity-90" />
                  <p className="text-xs opacity-80">Benefícios</p>
                  <p className="text-sm font-semibold">Exclusivos</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            <PremiumQuickAction 
              href="/agendar-consulta" 
              icon={Calendar} 
              label="Agendar Consulta"
              highlight
            />
            <PremiumQuickAction 
              href="/pre-anamnese" 
              icon={ClipboardList} 
              label="Pré-Anamnese"
              done={hasPreAnamnese}
            />
            <PremiumQuickAction 
              href="/carteirinha" 
              icon={Wallet} 
              label="Carteirinha"
            />
            <PremiumQuickAction 
              href="/perfil" 
              icon={User} 
              label="Meu Perfil"
            />
          </motion.div>

          {!hasPreAnamnese && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-amber-900">Complete sua pré-anamnese</p>
                  <p className="text-sm text-amber-700 mt-0.5">
                    Importante para preparar sua consulta médica
                  </p>
                  <Link href="/pre-anamnese">
                    <Button size="sm" className="mt-3 bg-amber-500 hover:bg-amber-600">
                      Iniciar agora
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {preAnamnese && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#3FA174]" />
                  <span className="text-sm font-semibold text-gray-900">Sua Avaliação Médica</span>
                </div>
                <PriorityBadge level={preAnamnese.diagnostico.nivelUrgencia} />
              </div>
              
              <div className="p-4">
                <p className="font-medium text-gray-900">{preAnamnese.diagnostico.titulo}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {preAnamnese.diagnostico.resumo}
                </p>
                
                {preAnamnese.diagnostico.indicacoes?.length > 0 && (
                  <>
                    <Separator className="my-3" />
                    <div className="flex flex-wrap gap-1.5">
                      {preAnamnese.diagnostico.indicacoes.slice(0, 4).map((item, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-[#3FA174]/10 text-[#3FA174] px-2.5 py-1 rounded-full font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    Próximo passo: agendar consulta
                  </div>
                  <Link href="/agendar-consulta">
                    <Button size="sm" className="bg-[#3FA174] hover:bg-[#359966]">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      Agendar
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Separator className="my-2" />
            
            <div className="flex items-center gap-2 mb-3 mt-4">
              <Star className="w-4 h-4 text-[#3FA174]" />
              <span className="text-sm font-semibold text-gray-900">Benefícios do seu plano</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3">
              {user.planoAtivo?.beneficios?.slice(0, 4).map((beneficio, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-[#3FA174]/5 rounded-lg border border-[#3FA174]/20">
                  <CheckCircle2 className="w-4 h-4 text-[#3FA174] flex-shrink-0" />
                  <span className="text-sm text-gray-700">{beneficio}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-3"
          >
            <Link href="/educacao">
              <div className="group border border-gray-200 rounded-xl p-4 hover:border-[#3FA174]/40 hover:bg-[#3FA174]/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3FA174]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#3FA174]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3FA174] transition-colors">
                      Centro de Educação
                    </p>
                    <p className="text-xs text-gray-500">Artigos e vídeos exclusivos</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/contato">
              <div className="group border border-gray-200 rounded-xl p-4 hover:border-[#3FA174]/40 hover:bg-[#3FA174]/5 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3FA174]/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#3FA174]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#3FA174] transition-colors">
                      Suporte Prioritário
                    </p>
                    <p className="text-xs text-gray-500">Atendimento exclusivo</p>
                  </div>
                </div>
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

        <div className="bg-gradient-to-r from-[#3FA174]/10 to-emerald-50 border border-[#3FA174]/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3FA174] flex items-center justify-center flex-shrink-0">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">Seja um associado Premium!</p>
              <p className="text-sm text-gray-600 mt-0.5">
                Acesso a consultas com desconto, suporte prioritário e muito mais
              </p>
              <Link href="/planos">
                <Button size="sm" className="mt-3 bg-[#3FA174] hover:bg-[#359966]">
                  Ver planos
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
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
