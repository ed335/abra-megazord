'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { getToken, fetchWithAuth } from '@/lib/auth';
import { ArrowLeft, Copy, Check, Loader2, Clock, AlertCircle, CheckCircle2, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface CheckoutData {
  id: string;
  valor: number;
  pixCode: string;
  identifier: string;
  expiracao: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutData | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'expired'>('pending');

  const tipo = searchParams.get('tipo') || 'MENSALIDADE';
  const planoId = searchParams.get('plano');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login?redirect=/checkout');
      return;
    }
    
    const loadUserAndGeneratePayment = async () => {
      try {
        const userData = await fetchWithAuth<{ cpf?: string }>('/api/auth/me');
        
        if (!userData.cpf) {
          setError('CPF não cadastrado. Por favor, atualize seu cadastro.');
          setLoading(false);
          return;
        }
        
        const data = await fetchWithAuth<{ success: boolean; pagamento: CheckoutData; error?: string }>(
          '/api/pagamentos/checkout',
          {
            method: 'POST',
            body: JSON.stringify({
              tipo,
              planoId: planoId || undefined,
              cpf: userData.cpf,
            }),
          }
        );

        if (data.success && data.pagamento) {
          setCheckout(data.pagamento);
        } else {
          setError(data.error || 'Erro ao gerar pagamento');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    
    loadUserAndGeneratePayment();
  }, [router, tipo, planoId]);

  useEffect(() => {
    if (!checkout) return;

    const interval = setInterval(async () => {
      try {
        const data = await fetchWithAuth<{ pagamento: { status: string } }>(
          `/api/pagamentos/status?pagamentoId=${checkout.id}`
        );
        
        if (data.pagamento?.status === 'PAGO') {
          setPaymentStatus('paid');
          clearInterval(interval);
        } else if (data.pagamento?.status === 'EXPIRADO' || data.pagamento?.status === 'FALHOU') {
          setPaymentStatus('expired');
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Erro ao verificar status:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [checkout]);

  const copyPixCode = () => {
    if (checkout?.pixCode) {
      navigator.clipboard.writeText(checkout.pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getTipoLabel = () => {
    switch (tipo) {
      case 'MENSALIDADE': return 'Mensalidade';
      case 'CONSULTA': return 'Consulta Médica';
      case 'PRIMEIRA_CONSULTA': return 'Primeira Consulta';
      default: return 'Pagamento';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-verde-oliva animate-spin" />
        </div>
      </main>
    );
  }

  if (paymentStatus === 'paid') {
    const isMensalidade = tipo === 'MENSALIDADE';
    
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-verde-oliva/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <CheckCircle2 className="w-10 h-10 text-verde-oliva" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-verde-oliva" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro mb-2">
              Pagamento Confirmado!
            </h1>
            <p className="text-cinza-medio">
              {isMensalidade 
                ? 'Parabéns! Você agora é associado ABRACANM.' 
                : 'Seu pagamento foi processado com sucesso.'}
            </p>
          </div>

          {isMensalidade && (
            <div className="bg-verde-claro/10 border border-verde-oliva/20 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-cinza-escuro mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-verde-oliva" />
                Benefícios ativados:
              </h3>
              <ul className="space-y-2 text-sm text-cinza-escuro">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-verde-oliva rounded-full"></div>
                  Primeira consulta por R$ 99 (economia de R$ 50)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-verde-oliva rounded-full"></div>
                  Suporte contínuo via WhatsApp
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-verde-oliva rounded-full"></div>
                  Acompanhamento do tratamento
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-verde-oliva rounded-full"></div>
                  Orientação jurídica sobre importação
                </li>
              </ul>
            </div>
          )}

          <div className="bg-cinza-muito-claro/50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-cinza-escuro mb-4 text-center">
              Próximo passo
            </h3>
            <p className="text-sm text-cinza-medio text-center mb-4">
              {isMensalidade 
                ? 'Agende sua primeira consulta com desconto exclusivo de associado!' 
                : 'Entre em contato para agendar sua consulta.'}
            </p>
            <Link
              href="/agendar"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-verde-oliva text-white rounded-xl font-medium hover:bg-verde-oliva/90 transition text-lg"
            >
              <Calendar className="w-5 h-5" />
              Agendar Minha Consulta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="text-center">
            <Link
              href="/dashboard"
              className="text-sm text-cinza-medio hover:text-verde-oliva transition underline"
            >
              Ou ir para o Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-md mx-auto px-4 py-8">
        <Link 
          href="/planos" 
          className="inline-flex items-center gap-2 text-sm text-cinza-medio hover:text-verde-oliva transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos planos
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-cinza-escuro mb-1">
            Pague com Pix
          </h1>
          <p className="text-cinza-medio text-sm">{getTipoLabel()}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-erro/10 border border-erro/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-erro flex-shrink-0 mt-0.5" />
            <p className="text-sm text-erro">{error}</p>
          </div>
        )}

        {checkout && (
          <div className="space-y-6">
            <div className="p-6 border border-cinza-claro rounded-xl text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-cinza-medio mb-4">
                <Clock className="w-4 h-4" />
                Válido por 30 minutos
              </div>

              <div className="text-3xl font-bold text-verde-oliva mb-6">
                {formatCurrency(checkout.valor)}
              </div>

              <div className="bg-cinza-muito-claro p-4 rounded-lg mb-4">
                <p className="text-xs text-cinza-medio mb-2">Código Pix Copia e Cola:</p>
                <div className="bg-white p-3 rounded border border-cinza-claro break-all text-xs text-cinza-escuro font-mono">
                  {checkout.pixCode.slice(0, 80)}...
                </div>
              </div>

              <button
                onClick={copyPixCode}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-verde-oliva text-verde-oliva rounded-xl font-medium hover:bg-verde-oliva/5 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Código Pix
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-verde-claro/10 rounded-xl">
              <div className="flex items-center gap-2 text-sm text-verde-oliva font-medium mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Aguardando pagamento...
              </div>
              <p className="text-xs text-cinza-medio">
                Após o pagamento, esta página será atualizada automaticamente.
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-cinza-medio">
                Problemas com o pagamento?{' '}
                <a href="mailto:ouvidoria@abracanm.org.br" className="text-verde-oliva underline">
                  Entre em contato
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-verde-oliva animate-spin" />
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
