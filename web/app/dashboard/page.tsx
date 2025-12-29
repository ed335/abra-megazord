'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

type UserData = {
  id: string;
  email: string;
  role: string;
  nome: string;
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

  return (
    <AppLayout title="Início">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Olá, {firstName}
          </h1>
          <p className="text-sm text-muted-foreground">O que você precisa hoje?</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
