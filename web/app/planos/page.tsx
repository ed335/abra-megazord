'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { Check, ArrowRight, Loader2, Shield, Users, Clock, HeartPulse, FileText, MessageCircle, Stethoscope, Star, X } from 'lucide-react';

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

const BENEFICIOS_DETALHADOS = [
  {
    icon: Stethoscope,
    titulo: 'Consultas com Desconto',
    descricao: 'Primeira consulta por R$ 99 (economia de R$ 50) e consultas de retorno com preço especial.',
  },
  {
    icon: FileText,
    titulo: 'Receita Digital Válida',
    descricao: 'Receitas emitidas por médicos prescritores autorizados, válidas em todo território nacional.',
  },
  {
    icon: HeartPulse,
    titulo: 'Acompanhamento Contínuo',
    descricao: 'Monitoramento do seu tratamento com ajustes de dosagem conforme sua evolução.',
  },
  {
    icon: MessageCircle,
    titulo: 'Suporte via WhatsApp',
    descricao: 'Tire dúvidas sobre seu tratamento, produtos e legislação com nossa equipe.',
  },
  {
    icon: Users,
    titulo: 'Comunidade de Pacientes',
    descricao: 'Acesso a grupos exclusivos para troca de experiências com outros pacientes.',
  },
  {
    icon: Shield,
    titulo: 'Segurança Jurídica',
    descricao: 'Orientação sobre importação legal, habeas corpus preventivo e direitos do paciente.',
  },
];

const COMPARATIVO = [
  { item: 'Consulta com médico prescritor', associado: true, avulso: true },
  { item: 'Receita digital se indicado', associado: true, avulso: true },
  { item: 'Primeira consulta por R$ 99', associado: true, avulso: false },
  { item: 'Suporte via WhatsApp', associado: true, avulso: false },
  { item: 'Conteúdo educativo exclusivo', associado: true, avulso: false },
  { item: 'Acompanhamento contínuo', associado: true, avulso: false },
  { item: 'Descontos em consultas de retorno', associado: true, avulso: false },
  { item: 'Orientação jurídica', associado: true, avulso: false },
];

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
          id: 'plano-essencial',
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

  const plano = planos[0];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="bg-verde-claro/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro mb-4">
            Seu caminho para o tratamento com cannabis medicinal
          </h1>
          <p className="text-lg text-cinza-medio max-w-2xl mx-auto mb-8">
            A ABRACANM conecta você a médicos prescritores, oferece suporte completo 
            e acompanha toda sua jornada de tratamento de forma segura e legal.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-cinza-escuro">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-verde-oliva" />
              </div>
              <span>100% Legal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-verde-oliva" />
              </div>
              <span>+5.000 pacientes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-verde-oliva" />
              </div>
              <span>Atendimento em até 48h</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-cinza-escuro text-center mb-10">
          Escolha a melhor opção para você
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {plano && (
            <div className="relative border-2 border-verde-oliva rounded-2xl p-8 bg-verde-claro/5">
              <div className="absolute -top-3 left-6 bg-verde-oliva text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                Mais vantajoso
              </div>
              
              <h3 className="text-2xl font-bold text-cinza-escuro mb-2">Associado ABRACANM</h3>
              <p className="text-cinza-medio mb-6">
                Acompanhamento completo para quem busca tratamento contínuo
              </p>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-verde-oliva">
                    {formatCurrency(plano.valorMensalidade)}
                  </span>
                  <span className="text-cinza-medio">/mês</span>
                </div>
                <p className="text-sm text-cinza-medio mt-1">
                  Menos de R$ 1,33 por dia
                </p>
              </div>

              <div className="bg-verde-oliva/5 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-verde-oliva mb-2">Inclui consultas com desconto:</p>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-cinza-escuro">Primeira Consulta</span>
                  <div className="flex items-center gap-2">
                    <span className="text-cinza-medio line-through text-xs">R$ 149</span>
                    <span className="font-bold text-verde-oliva">{formatCurrency(plano.valorPrimeiraConsulta)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cinza-escuro">Consultas de Retorno</span>
                  <span className="font-medium text-cinza-escuro">{formatCurrency(plano.valorConsulta)}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                  <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                  <span><strong>Economia de R$ 50</strong> na primeira consulta</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                  <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                  <span>Suporte contínuo via WhatsApp para dúvidas</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                  <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                  <span>Conteúdo educativo sobre cannabis medicinal</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                  <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                  <span>Acompanhamento do tratamento</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                  <Check className="w-5 h-5 text-verde-oliva flex-shrink-0 mt-0.5" />
                  <span>Orientação jurídica e sobre importação</span>
                </li>
              </ul>

              <Link
                href={`/checkout?plano=${plano.id}&tipo=MENSALIDADE`}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-verde-oliva text-white rounded-xl font-medium hover:bg-verde-oliva/90 transition text-lg"
              >
                Tornar-se Associado
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <p className="text-xs text-center text-cinza-medio mt-3">
                Cancele quando quiser, sem multa
              </p>
            </div>
          )}

          <div className="border border-cinza-claro rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-cinza-escuro mb-2">Consulta Avulsa</h3>
            <p className="text-cinza-medio mb-6">
              Para quem prefere pagar apenas quando precisar
            </p>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-cinza-escuro">
                  {formatCurrency(149.00)}
                </span>
                <span className="text-cinza-medio">/consulta</span>
              </div>
              <p className="text-sm text-cinza-medio mt-1">
                Sem mensalidade
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-cinza-medio flex-shrink-0 mt-0.5" />
                <span>Consulta com médico prescritor</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-cinza-medio flex-shrink-0 mt-0.5" />
                <span>Receita digital se indicado</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-escuro">
                <Check className="w-5 h-5 text-cinza-medio flex-shrink-0 mt-0.5" />
                <span>Orientações sobre o tratamento</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-medio">
                <X className="w-5 h-5 text-cinza-claro flex-shrink-0 mt-0.5" />
                <span>Sem suporte contínuo</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-cinza-medio">
                <X className="w-5 h-5 text-cinza-claro flex-shrink-0 mt-0.5" />
                <span>Sem desconto na primeira consulta</span>
              </li>
            </ul>

            <Link
              href="/checkout?tipo=CONSULTA"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-cinza-claro text-cinza-escuro rounded-xl font-medium hover:border-verde-oliva hover:text-verde-oliva transition text-lg"
            >
              Agendar Consulta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="bg-cinza-muito-claro rounded-2xl p-8 mb-16">
          <h2 className="text-xl font-bold text-cinza-escuro text-center mb-8">
            Compare as opções
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cinza-claro">
                  <th className="text-left py-3 px-4 text-sm font-medium text-cinza-escuro"></th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-verde-oliva">Associado</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-cinza-medio">Avulso</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((row, idx) => (
                  <tr key={idx} className="border-b border-cinza-claro/50">
                    <td className="py-3 px-4 text-sm text-cinza-escuro">{row.item}</td>
                    <td className="text-center py-3 px-4">
                      {row.associado ? (
                        <Check className="w-5 h-5 text-verde-oliva mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-cinza-claro mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.avulso ? (
                        <Check className="w-5 h-5 text-cinza-medio mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-cinza-claro mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-cinza-escuro text-center mb-10">
          O que você recebe como associado
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {BENEFICIOS_DETALHADOS.map((beneficio, idx) => {
            const Icon = beneficio.icon;
            return (
              <div key={idx} className="p-6 border border-cinza-claro rounded-xl hover:border-verde-oliva/50 transition">
                <div className="w-12 h-12 bg-verde-oliva/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-verde-oliva" />
                </div>
                <h3 className="font-semibold text-cinza-escuro mb-2">{beneficio.titulo}</h3>
                <p className="text-sm text-cinza-medio">{beneficio.descricao}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-verde-oliva/5 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-cinza-escuro mb-3">
            Ainda tem dúvidas?
          </h2>
          <p className="text-cinza-medio mb-6 max-w-lg mx-auto">
            Nossa equipe está pronta para ajudar você a entender se a cannabis medicinal 
            é indicada para o seu caso. Fale conosco sem compromisso.
          </p>
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os planos da ABRACANM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-verde-oliva text-verde-oliva rounded-xl font-medium hover:bg-verde-oliva hover:text-white transition"
          >
            <MessageCircle className="w-5 h-5" />
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
