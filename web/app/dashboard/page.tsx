'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, clearToken, fetchWithAuth } from '@/lib/auth';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  ClipboardList, 
  Stethoscope, 
  FileText, 
  Loader2,
  AlertCircle,
  AlertTriangle,
  Calendar,
  ChevronRight
} from 'lucide-react';

type User = {
  id: string;
  email: string;
  role: string;
  nome: string;
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
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-6 h-6 text-verde-oliva animate-spin" />
        </div>
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout title="Início">
        <div className="max-w-sm mx-auto text-center py-16">
          <AlertCircle className="w-10 h-10 text-erro mx-auto mb-4" />
          <p className="text-cinza-escuro mb-4">Sua sessão expirou</p>
          <Button onClick={() => router.push('/login')}>Entrar novamente</Button>
        </div>
      </AppLayout>
    );
  }

  const firstName = user.nome?.split(' ')[0] || 'Associado';
  const completedSteps = preAnamneseCompleted ? 2 : 1;

  return (
    <AppLayout title="Início">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-cinza-escuro">
            Olá, {firstName}
          </h1>
          <p className="text-cinza-medio mt-1">
            Veja como está sua jornada na ABRACANM
          </p>
        </div>

        <div className="bg-white border border-cinza-claro rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-cinza-medio">Seu progresso</span>
            <span className="text-sm font-medium text-cinza-escuro">{completedSteps} de 4</span>
          </div>
          
          <div className="flex items-center gap-2">
            <StepIndicator 
              icon={CheckCircle2} 
              label="Cadastro" 
              status="done" 
            />
            <div className="flex-1 h-px bg-cinza-claro" />
            <StepIndicator 
              icon={ClipboardList} 
              label="Pré-Anamnese" 
              status={preAnamneseCompleted ? "done" : "current"} 
              href={preAnamneseCompleted ? undefined : "/pre-anamnese"}
            />
            <div className="flex-1 h-px bg-cinza-claro" />
            <StepIndicator 
              icon={Stethoscope} 
              label="Consulta" 
              status={preAnamneseCompleted ? "current" : "pending"} 
              href={preAnamneseCompleted ? "/agendar" : undefined}
            />
            <div className="flex-1 h-px bg-cinza-claro" />
            <StepIndicator 
              icon={FileText} 
              label="Prescrição" 
              status="pending" 
            />
          </div>
        </div>

        {!preAnamneseCompleted && (
          <Link href="/pre-anamnese">
            <div className="bg-verde-oliva/5 border border-verde-oliva/20 rounded-lg p-5 mb-6 hover:bg-verde-oliva/10 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-cinza-escuro">Próximo passo: Pré-Anamnese</p>
                  <p className="text-sm text-cinza-medio mt-1">
                    Responda algumas perguntas para que possamos entender melhor suas necessidades
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-verde-oliva flex-shrink-0" />
              </div>
            </div>
          </Link>
        )}

        {preAnamneseCompleted && preAnamnese && (
          <Link href="/agendar">
            <div className="bg-verde-oliva/5 border border-verde-oliva/20 rounded-lg p-5 mb-6 hover:bg-verde-oliva/10 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-cinza-escuro">Próximo passo: Agendar consulta</p>
                  <p className="text-sm text-cinza-medio mt-1">
                    Sua pré-anamnese foi concluída. Agora você pode agendar sua consulta médica
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-verde-oliva flex-shrink-0" />
              </div>
            </div>
          </Link>
        )}

        {preAnamnese && preAnamnese.diagnostico && (
          <div className="bg-white border border-cinza-claro rounded-lg overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-cinza-claro">
              <h2 className="font-medium text-cinza-escuro">Resultado da sua pré-anamnese</h2>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-medium text-cinza-escuro mb-2">
                {preAnamnese.diagnostico.titulo}
              </h3>
              <p className="text-cinza-medio text-sm mb-4">
                {preAnamnese.diagnostico.resumo}
              </p>

              <UrgencyBadge level={preAnamnese.diagnostico.nivelUrgencia} />

              {preAnamnese.diagnostico.observacoes && (
                <p className="text-sm text-cinza-escuro mt-4 p-3 bg-off-white rounded">
                  {preAnamnese.diagnostico.observacoes}
                </p>
              )}

              {(preAnamnese.diagnostico.indicacoes || []).length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-cinza-escuro mb-2">O que pode ajudar:</p>
                  <ul className="space-y-1">
                    {preAnamnese.diagnostico.indicacoes.map((item, i) => (
                      <li key={i} className="text-sm text-cinza-medio flex items-start gap-2">
                        <span className="text-sucesso mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(preAnamnese.diagnostico.contraindicacoes || []).length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-cinza-escuro mb-2">Pontos de atenção:</p>
                  <ul className="space-y-1">
                    {preAnamnese.diagnostico.contraindicacoes.map((item, i) => (
                      <li key={i} className="text-sm text-cinza-medio flex items-start gap-2">
                        <span className="text-aviso mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(preAnamnese.recomendacoes || []).length > 0 && (
                <div className="mt-5 pt-5 border-t border-cinza-claro">
                  <p className="text-sm font-medium text-cinza-escuro mb-3">Recomendações:</p>
                  <div className="space-y-2">
                    {preAnamnese.recomendacoes.map((rec, i) => (
                      <div key={i} className="text-sm text-cinza-medio p-3 bg-off-white rounded flex gap-3">
                        <span className="text-verde-oliva font-medium">{i + 1}.</span>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-cinza-claro flex items-center justify-between">
                <div>
                  <p className="text-xs text-cinza-medio">Score de prioridade</p>
                  <p className="text-2xl font-semibold text-verde-oliva">
                    {preAnamnese.scorePrioridade}<span className="text-sm font-normal text-cinza-medio">/100</span>
                  </p>
                </div>
                <Link href="/agendar">
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar consulta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/planos">
            <div className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/30 transition-colors">
              <p className="font-medium text-cinza-escuro">Planos de associação</p>
              <p className="text-sm text-cinza-medio mt-1">Conheça os benefícios</p>
            </div>
          </Link>
          <Link href="/contato">
            <div className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/30 transition-colors">
              <p className="font-medium text-cinza-escuro">Precisa de ajuda?</p>
              <p className="text-sm text-cinza-medio mt-1">Fale com nossa equipe</p>
            </div>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

function StepIndicator({ 
  icon: Icon, 
  label, 
  status,
  href 
}: { 
  icon: React.ElementType; 
  label: string; 
  status: 'done' | 'current' | 'pending';
  href?: string;
}) {
  const content = (
    <div className={`flex flex-col items-center gap-1.5 ${href ? 'cursor-pointer' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        status === 'done' 
          ? 'bg-sucesso text-white' 
          : status === 'current' 
          ? 'bg-verde-oliva text-white' 
          : 'bg-cinza-claro text-cinza-medio'
      }`}>
        {status === 'done' ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <Icon className="w-4 h-4" />
        )}
      </div>
      <span className={`text-xs ${
        status === 'pending' ? 'text-cinza-medio' : 'text-cinza-escuro'
      }`}>
        {label}
      </span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  
  return content;
}

function UrgencyBadge({ level }: { level: 'baixa' | 'moderada' | 'alta' }) {
  const config = {
    baixa: { bg: 'bg-sucesso/10', text: 'text-sucesso', label: 'Prioridade baixa' },
    moderada: { bg: 'bg-aviso/10', text: 'text-aviso', label: 'Prioridade moderada' },
    alta: { bg: 'bg-erro/10', text: 'text-erro', label: 'Prioridade alta' },
  };
  
  const { bg, text, label } = config[level];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${bg} ${text}`}>
      <AlertTriangle className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
