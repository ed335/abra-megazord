'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { getToken } from '@/lib/auth';
import { Calendar, Clock, Video, MapPin, ArrowLeft, Phone, CreditCard, Check, Loader2, ArrowRight } from 'lucide-react';

interface Assinatura {
  id: string;
  status: string;
  plano: {
    nome: string;
  };
}

export default function AgendarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [assinatura, setAssinatura] = useState<Assinatura | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    fetch('/api/assinatura', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.assinatura && data.assinatura.status === 'ATIVA') {
          setAssinatura(data.assinatura);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-verde-oliva animate-spin" />
      </main>
    );
  }

  if (!assinatura) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm text-cinza-medio hover:text-verde-oliva transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-verde-oliva/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-verde-oliva" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro mb-3">
              Para agendar, torne-se associado
            </h1>
            <p className="text-cinza-medio max-w-md mx-auto">
              Associados ABRACANM têm acesso a consultas com desconto, 
              suporte contínuo e acompanhamento completo do tratamento.
            </p>
          </div>

          <div className="bg-verde-claro/5 border border-verde-oliva/20 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-cinza-escuro mb-4">Ao se tornar associado você ganha:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                <span><strong>Primeira consulta por R$ 99</strong> (economia de R$ 50)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                <span>Suporte contínuo via WhatsApp</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                <span>Acompanhamento do tratamento</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                <span>Orientação jurídica sobre importação</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/planos"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-verde-oliva text-white rounded-xl font-medium hover:bg-verde-oliva/90 transition text-lg"
            >
              Ver Planos e Preços
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-center text-sm text-cinza-medio">
              Ou, se preferir, faça uma{' '}
              <Link href="/checkout?tipo=CONSULTA" className="text-verde-oliva underline">
                consulta avulsa por R$ 149
              </Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-cinza-medio hover:text-verde-oliva transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </Link>

        <div className="bg-verde-claro/10 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Check className="w-5 h-5 text-verde-oliva" />
          <span className="text-sm text-cinza-escuro">
            Você é associado <strong>{assinatura.plano.nome}</strong> - aproveite o desconto na primeira consulta!
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro mb-2">
            Agendar Consulta
          </h1>
          <p className="text-cinza-medio">
            Escolha a modalidade de atendimento que prefere
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-6 border-2 border-verde-oliva rounded-xl bg-verde-claro/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-verde-oliva" />
              </div>
              <div>
                <h2 className="font-semibold text-cinza-escuro">Teleconsulta</h2>
                <p className="text-sm text-cinza-medio">Atendimento online</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-verde-oliva">R$ 99</span>
                <span className="text-sm text-cinza-medio line-through">R$ 149</span>
              </div>
              <p className="text-xs text-verde-oliva">Preço de associado</p>
            </div>

            <ul className="space-y-2 mb-4 text-sm text-cinza-escuro">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-verde-oliva" />
                Consultas de 30-60 minutos
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-verde-oliva" />
                Horários flexíveis
              </li>
            </ul>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Sou associado ABRACANM e gostaria de agendar uma teleconsulta."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-verde-oliva text-white rounded-lg font-medium hover:bg-verde-oliva/90 transition"
            >
              <Phone className="w-5 h-5" />
              Agendar via WhatsApp
            </a>
          </div>

          <div className="p-6 border border-cinza-claro rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cinza-muito-claro rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-cinza-medio" />
              </div>
              <div>
                <h2 className="font-semibold text-cinza-escuro">Presencial</h2>
                <p className="text-sm text-cinza-medio">Em uma clínica parceira</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-cinza-escuro">R$ 99</span>
                <span className="text-sm text-cinza-medio line-through">R$ 149</span>
              </div>
              <p className="text-xs text-verde-oliva">Preço de associado</p>
            </div>

            <ul className="space-y-2 mb-4 text-sm text-cinza-escuro">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cinza-medio" />
                Consultas de 45-90 minutos
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cinza-medio" />
                Conforme disponibilidade local
              </li>
            </ul>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Sou associado ABRACANM e gostaria de agendar uma consulta presencial."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-cinza-claro text-cinza-escuro rounded-lg font-medium hover:border-verde-oliva hover:text-verde-oliva transition"
            >
              <Phone className="w-5 h-5" />
              Solicitar Agendamento
            </a>
          </div>
        </div>

        <div className="p-4 bg-cinza-muito-claro/50 rounded-xl text-center">
          <p className="text-sm text-cinza-medio">
            Dúvidas? Entre em contato pelo email{' '}
            <a href="mailto:ouvidoria@abracanm.org.br" className="text-verde-oliva underline">
              ouvidoria@abracanm.org.br
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
