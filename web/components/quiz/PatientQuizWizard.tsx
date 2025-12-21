'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Heart,
  Moon,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  Users,
  MapPin,
  Sun,
  Sunset,
} from 'lucide-react';
import Button from '@/components/shared/Button';
import { fetchWithAuth } from '@/lib/auth';

type PerfilIntake = 'PACIENTE_NOVO' | 'EM_TRATAMENTO' | 'CUIDADOR';

type PreAnamneseForm = {
  perfil: PerfilIntake;
  objetivoPrincipal: string;
  gravidade: number;
  tratamentosPrevios: string[];
  comorbidades: string[];
  notas: string;
  preferenciaAcompanhamento: string;
  melhorHorario: string;
  consentiu: boolean;
};

const initialState: PreAnamneseForm = {
  perfil: 'PACIENTE_NOVO',
  objetivoPrincipal: '',
  gravidade: 3,
  tratamentosPrevios: [],
  comorbidades: [],
  notas: '',
  preferenciaAcompanhamento: '',
  melhorHorario: '',
  consentiu: false,
};

const quizSteps = [
  {
    key: 'perfil',
    title: 'Quem está respondendo?',
    description: 'Conte para nós o seu contexto. Vamos personalizar o cuidado.',
  },
  {
    key: 'objetivo',
    title: 'Qual é o principal objetivo do seu cuidado?',
    description: 'Selecione o motivo central para buscarmos o prescritor certo.',
  },
  {
    key: 'gravidade',
    title: 'Como você descreveria a intensidade dos sintomas?',
    description: 'Use uma escala simples para entendermos a urgência.',
  },
  {
    key: 'tratamentos',
    title: 'O que você já tentou até agora?',
    description: 'Isso ajuda a evitar repetições e direcionar melhor o tratamento.',
  },
  {
    key: 'comorbidades',
    title: 'Há algo importante para considerarmos?',
    description: 'Comorbidades e informações de segurança são essenciais.',
  },
  {
    key: 'preferencias',
    title: 'Como prefere ser acompanhado?',
    description: 'Escolha seu formato de atendimento preferido.',
  },
  {
    key: 'horario',
    title: 'Qual o melhor horário para contato?',
    description: 'Escolha o período em que você está mais disponível.',
  },
];

const pillBase =
  'flex items-center gap-3 w-full text-left border rounded-xl px-4 py-3 transition-all duration-200';

interface DiagnosticoResult {
  titulo: string;
  resumo: string;
  nivelUrgencia: 'baixa' | 'moderada' | 'alta';
  indicacoes: string[];
  contraindicacoes: string[];
  observacoes: string;
  recomendacoes: string[];
  proximoPasso: string;
  scorePrioridade: number;
}

interface Props {
  onComplete?: (diagnostico: DiagnosticoResult) => void;
}

export default function PatientQuizWizard({ onComplete }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PreAnamneseForm>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [diagnostico, setDiagnostico] = useState<DiagnosticoResult | null>(null);
  const [showConsentError, setShowConsentError] = useState(false);

  const totalSteps = quizSteps.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const updateForm = <K extends keyof PreAnamneseForm>(key: K, value: PreAnamneseForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: 'tratamentosPrevios' | 'comorbidades', value: string) => {
    setForm((prev) => {
      const exists = prev[key].includes(value);
      const nextValues = exists ? prev[key].filter((v) => v !== value) : [...prev[key], value];
      return { ...prev, [key]: nextValues };
    });
  };

  const canContinue = useMemo(() => {
    if (step === 0) return form.consentiu;
    if (step === 1) return Boolean(form.objetivoPrincipal);
    if (step === 5) return Boolean(form.preferenciaAcompanhamento);
    if (step === 6) return Boolean(form.melhorHorario);
    return true;
  }, [form.consentiu, form.objetivoPrincipal, form.preferenciaAcompanhamento, form.melhorHorario, step]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await fetchWithAuth<{ success: boolean; diagnostico: DiagnosticoResult }>('/api/pre-anamnese', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setDiagnostico(result.diagnostico);
      setFeedback({
        type: 'success',
        message: 'Recebemos suas respostas! Seu diagnóstico ABRACANM está pronto.',
      });

      if (onComplete) {
        onComplete(result.diagnostico);
      }

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Não conseguimos enviar agora. Tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goNext = () => {
    if (step === 0 && !form.consentiu) {
      setShowConsentError(true);
      return;
    }
    setShowConsentError(false);
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const renderPerfil = () => {
    const options = [
      {
        value: 'PACIENTE_NOVO',
        title: 'Sou paciente e estou começando',
        description: 'Quero entender se a cannabis medicinal pode ajudar.',
        icon: Users,
      },
      {
        value: 'EM_TRATAMENTO',
        title: 'Já estou em tratamento',
        description: 'Preciso organizar documentos e acompanhamento.',
        icon: Stethoscope,
      },
      {
        value: 'CUIDADOR',
        title: 'Sou cuidador/familiar',
        description: 'Quero apoiar alguém com orientação segura.',
        icon: User,
      },
    ] as const;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const Icon = option.icon;
          const active = form.perfil === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => updateForm('perfil', option.value)}
              className={`${pillBase} ${active ? 'border-verde-oliva bg-verde-claro/10 shadow-sm' : 'border-cinza-claro bg-white hover:border-verde-oliva/60'}`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-verde-claro/20 text-verde-oliva">
                <Icon className="w-5 h-5" />
              </span>
              <span className="flex-1">
                <p className="font-semibold text-cinza-escuro">{option.title}</p>
                <p className="text-sm text-cinza-medio">{option.description}</p>
              </span>
              {active && <CheckCircle2 className="w-5 h-5 text-verde-oliva" />}
            </button>
          );
        })}
        <label className={`flex items-center gap-3 px-4 py-3 rounded-xl md:col-span-3 transition-all ${
          showConsentError && !form.consentiu 
            ? 'bg-red-50 border-2 border-red-400' 
            : 'bg-off-white border border-cinza-claro'
        }`}>
          <input
            type="checkbox"
            className={`h-5 w-5 rounded focus:ring-verde-oliva ${
              showConsentError && !form.consentiu 
                ? 'border-red-500 text-red-500' 
                : 'border-cinza-medio text-verde-oliva'
            }`}
            checked={form.consentiu}
            onChange={(e) => {
              updateForm('consentiu', e.target.checked);
              if (e.target.checked) setShowConsentError(false);
            }}
          />
          <span className={`text-sm ${showConsentError && !form.consentiu ? 'text-red-600 font-medium' : 'text-cinza-escuro'}`}>
            Concordo em compartilhar dados para triagem inicial conforme LGPD. *
          </span>
        </label>
        {showConsentError && !form.consentiu && (
          <p className="text-xs text-red-500 md:col-span-3 -mt-2">
            Por favor, aceite os termos para continuar.
          </p>
        )}
      </div>
    );
  };

  const renderObjetivo = () => {
    const options = [
      { value: 'Dor crônica', icon: Heart },
      { value: 'Ansiedade / sono', icon: Moon },
      { value: 'Epilepsia / TEA', icon: Brain },
      { value: 'Outros', icon: Sparkles },
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            const active = form.objetivoPrincipal.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateForm('objetivoPrincipal', option.value)}
                className={`${pillBase} ${active ? 'border-verde-oliva bg-verde-claro/10' : 'border-cinza-claro bg-white hover:border-verde-oliva/60'}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-verde-claro/20 text-verde-oliva">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="flex-1">
                  <p className="font-semibold text-cinza-escuro">{option.value}</p>
                </span>
                {active && <CheckCircle2 className="w-5 h-5 text-verde-oliva" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderGravidade = () => {
    const scale = [1, 2, 3, 4, 5];
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-3">
          {scale.map((value) => {
            const active = form.gravidade === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => updateForm('gravidade', value)}
                className={`flex flex-col items-center justify-center rounded-xl border px-3 py-4 transition-all ${active ? 'border-verde-oliva bg-verde-claro/10 text-verde-oliva shadow-sm' : 'border-cinza-claro bg-white hover:border-verde-oliva/60 text-cinza-escuro'}`}
              >
                <span className="text-lg font-semibold">{value}</span>
                <span className="text-xs text-cinza-medio">Nível</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-cinza-medio">
          1 = sintomas leves | 3 = moderados | 5 = intensos/limitantes. Isso não substitui avaliação médica.
        </p>
      </div>
    );
  };

  const renderTratamentos = () => {
    const options = ['Nenhum', 'Ansiolíticos', 'Anticonvulsivantes', 'Fisioterapia', 'Psicoterapia', 'Outros'];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => {
            const active = form.tratamentosPrevios.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleArrayValue('tratamentosPrevios', option)}
                className={`${pillBase} ${active ? 'border-verde-oliva bg-verde-claro/10' : 'border-cinza-claro bg-white hover:border-verde-oliva/60'}`}
              >
                <Stethoscope className="w-5 h-5 text-verde-oliva" />
                <span className="flex-1">{option}</span>
                {active && <CheckCircle2 className="w-5 h-5 text-verde-oliva" />}
              </button>
            );
          })}
        </div>
        <textarea
          value={form.notas}
          onChange={(e) => updateForm('notas', e.target.value)}
          className="w-full rounded-xl border border-cinza-claro bg-white px-4 py-3 text-sm text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva"
          rows={3}
          placeholder="Se quiser, detalhe como seu corpo respondeu aos tratamentos anteriores."
        />
      </div>
    );
  };

  const renderComorbidades = () => {
    const options = ['Hipertensão', 'Diabetes', 'Histórico psiquiátrico', 'Gestação/planejamento', 'Outros'];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => {
            const active = form.comorbidades.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleArrayValue('comorbidades', option)}
                className={`${pillBase} ${active ? 'border-verde-oliva bg-verde-claro/10' : 'border-cinza-claro bg-white hover:border-verde-oliva/60'}`}
              >
                <ShieldCheck className="w-5 h-5 text-verde-oliva" />
                <span className="flex-1">{option}</span>
                {active && <CheckCircle2 className="w-5 h-5 text-verde-oliva" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPreferencias = () => {
    const options = [
      { value: 'Online', icon: Sparkles, desc: 'Teleconsulta de qualquer lugar' },
      { value: 'Presencial', icon: MapPin, desc: 'Atendimento na clínica' },
      { value: 'Híbrido', icon: Heart, desc: 'Primeira presencial, depois online' },
    ];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            const active = form.preferenciaAcompanhamento === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateForm('preferenciaAcompanhamento', option.value)}
                className={`${pillBase} flex-col items-center text-center ${active ? 'border-verde-oliva bg-verde-claro/10' : 'border-cinza-claro bg-white hover:border-verde-oliva/60'}`}
              >
                <Icon className="w-6 h-6 text-verde-oliva mb-2" />
                <span className="font-semibold text-cinza-escuro">{option.value}</span>
                <span className="text-xs text-cinza-medio">{option.desc}</span>
                {active && <CheckCircle2 className="w-5 h-5 text-verde-oliva mt-2" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHorario = () => {
    const options = [
      { value: 'Manhã', icon: Sun, desc: '8h às 12h' },
      { value: 'Tarde', icon: Sunset, desc: '12h às 18h' },
      { value: 'Noite', icon: Moon, desc: '18h às 21h' },
    ];
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            const active = form.melhorHorario === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateForm('melhorHorario', option.value)}
                className={`${pillBase} flex-col items-center text-center ${active ? 'border-verde-oliva bg-verde-claro/10' : 'border-cinza-claro bg-white hover:border-verde-oliva/60'}`}
              >
                <Icon className="w-6 h-6 text-verde-oliva mb-2" />
                <span className="font-semibold text-cinza-escuro">{option.value}</span>
                <span className="text-xs text-cinza-medio">{option.desc}</span>
                {active && <CheckCircle2 className="w-5 h-5 text-verde-oliva mt-2" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return renderPerfil();
      case 1:
        return renderObjetivo();
      case 2:
        return renderGravidade();
      case 3:
        return renderTratamentos();
      case 4:
        return renderComorbidades();
      case 5:
        return renderPreferencias();
      case 6:
        return renderHorario();
      default:
        return null;
    }
  };

  if (diagnostico) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-md border border-cinza-claro/60 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <CheckCircle2 className="w-16 h-16 text-verde-oliva mx-auto" />
          <h2 className="text-2xl font-semibold text-cinza-escuro">Pré-anamnese Concluída!</h2>
          <p className="text-cinza-medio">
            Seu diagnóstico ABRACANM está disponível no dashboard.
          </p>
        </div>
        <div className="bg-verde-claro/10 border border-verde-oliva/20 rounded-xl p-4">
          <h3 className="font-semibold text-verde-oliva">{diagnostico.titulo}</h3>
          <p className="text-sm text-cinza-escuro mt-2">{diagnostico.resumo}</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push('/dashboard')}
        >
          Ver Meu Diagnóstico Completo
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md border border-cinza-claro/60 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-verde-oliva font-semibold">Pré-anamnese ABRACANM</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-cinza-escuro">
            Vamos entender seu contexto para um cuidado personalizado
          </h1>
          <p className="text-sm text-cinza-medio mt-1">
            Suas informações de cadastro já estão salvas. Responda apenas o necessário para direcionar seu atendimento.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-verde-oliva">
          <Clock3 className="w-4 h-4" />
          <span>{step + 1} / {totalSteps}</span>
        </div>
      </div>

      <div className="h-2 w-full rounded-full bg-cinza-claro/60 overflow-hidden">
        <div
          className="h-full bg-verde-oliva transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-cinza-escuro">{quizSteps[step].title}</h2>
        <p className="text-sm text-cinza-medio">{quizSteps[step].description}</p>
      </div>

      <div className="space-y-4">{renderStep()}</div>

      {feedback && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
            feedback.type === 'success'
              ? 'border-verde-oliva/50 bg-verde-claro/10 text-verde-oliva'
              : 'border-erro/40 bg-red-50 text-erro'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{feedback.message}</p>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
        <Button
          variant="secondary"
          size="md"
          className="w-full sm:w-auto"
          onClick={goBack}
          disabled={step === 0 || isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="hidden sm:flex flex-1" />

        <Button
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
          onClick={goNext}
          disabled={!canContinue || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : step === totalSteps - 1 ? 'Enviar e Ver Diagnóstico' : 'Próximo'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
