'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken, fetchWithAuth } from '@/lib/auth';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  Calendar,
  CreditCard,
  FileText,
  User,
  MessageCircle,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  Pill
} from 'lucide-react';

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
      });
  }, [router]);

  if (loading) {
    return (
      <AppLayout title="Início">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-6 h-6 text-verde-oliva animate-spin" />
        </div>
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout title="Início">
        <div className="text-center py-16">
          <AlertCircle className="w-10 h-10 text-erro mx-auto mb-4" />
          <p className="text-cinza-escuro mb-4">Sessão expirada</p>
          <Button onClick={() => router.push('/login')}>Entrar</Button>
        </div>
      </AppLayout>
    );
  }

  const firstName = user.nome?.split(' ')[0] || 'Associado';
  const hasPreAnamnese = !!preAnamnese;

  const quickActions = [
    { 
      href: '/pre-anamnese', 
      icon: ClipboardList, 
      label: 'Pré-Anamnese',
      done: hasPreAnamnese
    },
    { 
      href: '/agendar', 
      icon: Calendar, 
      label: 'Agendar Consulta',
      done: false
    },
    { 
      href: '/planos', 
      icon: CreditCard, 
      label: 'Planos',
      done: false
    },
    { 
      href: '/perfil', 
      icon: User, 
      label: 'Meu Perfil',
      done: false
    },
  ];

  return (
    <AppLayout title="Início">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-medium text-cinza-escuro">
            Olá, {firstName}
          </h1>
          <p className="text-sm text-cinza-medio">O que você precisa hoje?</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <div className="bg-white border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/40 transition-colors h-full">
                <div className="flex items-center justify-between mb-3">
                  <action.icon className="w-5 h-5 text-verde-oliva" />
                  {action.done && (
                    <CheckCircle2 className="w-4 h-4 text-sucesso" />
                  )}
                </div>
                <p className="text-sm font-medium text-cinza-escuro">{action.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {!hasPreAnamnese && (
          <div className="bg-verde-oliva/5 border border-verde-oliva/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-verde-oliva/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-5 h-5 text-verde-oliva" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cinza-escuro">Complete sua pré-anamnese</p>
                <p className="text-sm text-cinza-medio mt-0.5">
                  Precisamos de algumas informações para preparar sua consulta
                </p>
                <Link href="/pre-anamnese">
                  <Button size="sm" className="mt-3">
                    Começar agora
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {preAnamnese && (
          <div className="bg-white border border-cinza-claro rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-cinza-claro flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-verde-oliva" />
                <span className="text-sm font-medium text-cinza-escuro">Sua avaliação</span>
              </div>
              <UrgencyBadge level={preAnamnese.diagnostico.nivelUrgencia} />
            </div>
            <div className="p-4">
              <p className="font-medium text-cinza-escuro">{preAnamnese.diagnostico.titulo}</p>
              <p className="text-sm text-cinza-medio mt-1 line-clamp-2">{preAnamnese.diagnostico.resumo}</p>
              
              {preAnamnese.diagnostico.indicacoes?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-cinza-claro">
                  <p className="text-xs text-cinza-medio mb-2">Indicações:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {preAnamnese.diagnostico.indicacoes.slice(0, 3).map((item, i) => (
                      <span key={i} className="text-xs bg-verde-oliva/10 text-verde-escuro px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-cinza-medio">
                  <Clock className="w-3.5 h-3.5" />
                  Próximo: agendar consulta
                </div>
                <Link href="/agendar">
                  <Button size="sm" variant="outline">
                    Agendar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/educacao">
            <div className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/40 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-verde-oliva" />
                <div>
                  <p className="text-sm font-medium text-cinza-escuro">Educação</p>
                  <p className="text-xs text-cinza-medio">Artigos sobre cannabis medicinal</p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/contato">
            <div className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/40 transition-colors">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-verde-oliva" />
                <div>
                  <p className="text-sm font-medium text-cinza-escuro">Suporte</p>
                  <p className="text-xs text-cinza-medio">Fale com nossa equipe</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

function UrgencyBadge({ level }: { level: 'baixa' | 'moderada' | 'alta' }) {
  const config = {
    baixa: { bg: 'bg-sucesso/10', text: 'text-sucesso', label: 'Baixa' },
    moderada: { bg: 'bg-aviso/10', text: 'text-aviso', label: 'Moderada' },
    alta: { bg: 'bg-erro/10', text: 'text-erro', label: 'Alta' },
  };
  const { bg, text, label } = config[level];
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded ${bg} ${text}`}>
      {label}
    </span>
  );
}
