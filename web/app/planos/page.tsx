'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { Check, ArrowRight, Loader2 } from 'lucide-react';

interface Plano {
  id: string;
  nome: string;
  descricao: string;
  tipo: string;
  valorMensalidade: number;
  valorConsulta: number;
  valorPrimeiraConsulta: number;
  beneficios: string[];
  ativo: boolean;
}

export default function PlanosPage() {
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/planos')
      .then(res => res.json())
      .then(data => {
        setPlanos(data.planos || []);
        setLoading(false);
      })
      .catch(() => {
        setPlanos([{
          id: 'default',
          nome: 'Essencial',
          descricao: 'Acesso completo à plataforma ABRACANM',
          tipo: 'MENSAL',
          valorMensalidade: 39.90,
          valorConsulta: 149.00,
          valorPrimeiraConsulta: 99.00,
          beneficios: [
            'Acesso à plataforma',
            'Conteúdo educativo',
            'Suporte via WhatsApp',
            'Acompanhamento personalizado',
          ],
          ativo: true,
        }]);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
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

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro mb-3">
            Nossos Planos
          </h1>
          <p className="text-cinza-medio max-w-xl mx-auto">
            Escolha o plano ideal para sua jornada com a cannabis medicinal. 
            Todos incluem acesso completo à plataforma e suporte especializado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className="relative border-2 border-verde-oliva rounded-2xl p-6 bg-verde-claro/5"
            >
              <div className="absolute -top-3 left-6 bg-verde-oliva text-white text-xs font-medium px-3 py-1 rounded-full">
                Recomendado
              </div>
              
              <h2 className="text-xl font-bold text-cinza-escuro mb-1">{plano.nome}</h2>
              <p className="text-sm text-cinza-medio mb-4">{plano.descricao}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-verde-oliva">
                    {formatCurrency(plano.valorMensalidade)}
                  </span>
                  <span className="text-cinza-medio">/mês</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plano.beneficios.map((beneficio, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-cinza-escuro">
                    <Check className="w-4 h-4 text-verde-oliva flex-shrink-0" />
                    {beneficio}
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-4 border-t border-cinza-claro">
                <div className="flex justify-between text-sm">
                  <span className="text-cinza-medio">Consulta Médica</span>
                  <span className="font-medium text-cinza-escuro">{formatCurrency(plano.valorConsulta)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cinza-medio">Primeira Consulta</span>
                  <span className="font-medium text-verde-oliva">{formatCurrency(plano.valorPrimeiraConsulta)}</span>
                </div>
              </div>

              <Link
                href={`/checkout?plano=${plano.id}&tipo=MENSALIDADE`}
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-verde-oliva text-white rounded-xl font-medium hover:bg-verde-oliva/90 transition"
              >
                Assinar Agora
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}

          <div className="border border-cinza-claro rounded-2xl p-6">
            <h2 className="text-xl font-bold text-cinza-escuro mb-1">Consulta Avulsa</h2>
            <p className="text-sm text-cinza-medio mb-4">
              Sem compromisso mensal. Pague apenas pela consulta.
            </p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-cinza-escuro">
                  {formatCurrency(149.00)}
                </span>
                <span className="text-cinza-medio">/consulta</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-cinza-escuro">
                <Check className="w-4 h-4 text-cinza-medio flex-shrink-0" />
                Consulta com médico prescritor
              </li>
              <li className="flex items-center gap-2 text-sm text-cinza-escuro">
                <Check className="w-4 h-4 text-cinza-medio flex-shrink-0" />
                Receita digital se indicado
              </li>
              <li className="flex items-center gap-2 text-sm text-cinza-escuro">
                <Check className="w-4 h-4 text-cinza-medio flex-shrink-0" />
                Orientações personalizadas
              </li>
            </ul>

            <Link
              href="/checkout?tipo=CONSULTA"
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 border border-cinza-claro text-cinza-escuro rounded-xl font-medium hover:border-verde-oliva hover:text-verde-oliva transition"
            >
              Agendar Consulta
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="text-center">
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
