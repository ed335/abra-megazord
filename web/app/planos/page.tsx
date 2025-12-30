'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Pricing } from '@/components/ui/pricing';
import { Shield, Users, Clock, HeartPulse, FileText, MessageCircle, Stethoscope, Check, X } from 'lucide-react';

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

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
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

const FALLBACK_PLANOS: Plano[] = [
  {
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
  },
];

function convertToPricingPlans(planos: Plano[]): PricingPlan[] {
  const consultaAvulsa: PricingPlan = {
    name: 'Consulta Avulsa',
    price: '149',
    yearlyPrice: '149',
    period: 'consulta',
    features: [
      'Consulta com médico prescritor',
      'Receita digital se indicado',
      'Orientações sobre o tratamento',
    ],
    description: 'Para quem prefere pagar apenas quando precisar',
    buttonText: 'Agendar Consulta',
    href: '/checkout?tipo=CONSULTA',
    isPopular: false,
  };

  const planosConvertidos = planos.map((plano, index) => ({
    name: `Plano ${plano.nome}`,
    price: String(Math.round(plano.valorMensalidade)),
    yearlyPrice: String(Math.round(plano.valorMensalidade * 0.8)),
    period: 'mês',
    features: [
      `Primeira consulta por R$ ${plano.valorPrimeiraConsulta.toFixed(0)} (economia de R$ 50)`,
      'Suporte contínuo via WhatsApp',
      'Conteúdo educativo exclusivo',
      'Acompanhamento do tratamento',
      'Descontos em consultas de retorno',
      'Orientação jurídica e importação',
      ...plano.beneficios,
    ],
    description: 'Cancele quando quiser, sem multa',
    buttonText: 'Tornar-se Associado',
    href: `/checkout?plano=${plano.id}&tipo=MENSALIDADE`,
    isPopular: index === 0,
  }));

  return [consultaAvulsa, ...planosConvertidos];
}

export default function PlanosPage() {
  const [loading, setLoading] = useState(true);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    fetch('/api/planos')
      .then(res => res.json())
      .then(data => {
        const planosData = data.planos || FALLBACK_PLANOS;
        setPricingPlans(convertToPricingPlans(planosData));
        setLoading(false);
      })
      .catch(() => {
        setPricingPlans(convertToPricingPlans(FALLBACK_PLANOS));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fafaf8]">
        
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
            <div className="flex justify-center gap-6 pt-4">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      
      
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight"
          >
            Seu caminho para o tratamento
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#86868b] max-w-2xl mx-auto mb-8"
          >
            A ABRACANM conecta você a médicos prescritores, oferece suporte completo 
            e acompanha toda sua jornada de tratamento de forma segura e legal.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-[#86868b]"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6B7C59]/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#6B7C59]" />
              </div>
              <span>100% Legal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6B7C59]/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-[#6B7C59]" />
              </div>
              <span>+5.000 pacientes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6B7C59]/10 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#6B7C59]" />
              </div>
              <span>Atendimento em até 48h</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#fafaf8]">
        <Pricing 
          plans={pricingPlans}
          title="Escolha o plano ideal"
          description="Todos os planos incluem acesso à nossa plataforma e suporte dedicado."
        />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="mb-16 bg-white border-[#e5e5e5]">
            <CardHeader>
              <CardTitle className="text-xl text-center text-[#1d1d1f]">Compare as opções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e5e5]">
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#1d1d1f]"></th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-[#6B7C59]">Associado</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-[#86868b]">Avulso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARATIVO.map((row, idx) => (
                      <tr key={idx} className="border-b border-[#e5e5e5]/50">
                        <td className="py-3 px-4 text-sm text-[#1d1d1f]">{row.item}</td>
                        <td className="text-center py-3 px-4">
                          {row.associado ? (
                            <Check className="w-5 h-5 text-[#6B7C59] mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-[#e5e5e5] mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {row.avulso ? (
                            <Check className="w-5 h-5 text-[#86868b] mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-[#e5e5e5] mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold text-[#1d1d1f] text-center mb-10 tracking-tight"
        >
          O que você recebe como associado
        </motion.h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {BENEFICIOS_DETALHADOS.map((beneficio, idx) => {
            const Icon = beneficio.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="hover:border-[#6B7C59]/50 transition bg-white border-[#e5e5e5] h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-[#6B7C59]/10 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#6B7C59]" />
                    </div>
                    <h3 className="font-semibold mb-2 text-[#1d1d1f]">{beneficio.titulo}</h3>
                    <p className="text-sm text-[#86868b]">{beneficio.descricao}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-[#6B7C59]/5 border-[#6B7C59]/20">
            <CardContent className="py-10 text-center">
              <h2 className="text-2xl font-semibold mb-3 text-[#1d1d1f]">
                Ainda tem dúvidas?
              </h2>
              <p className="text-[#86868b] mb-6 max-w-lg mx-auto">
                Nossa equipe está pronta para ajudar você a entender se a cannabis medicinal 
                é indicada para o seu caso. Fale conosco sem compromisso.
              </p>
              <Button variant="outline" asChild className="border-[#6B7C59] text-[#6B7C59] hover:bg-[#6B7C59] hover:text-white">
                <a
                  href="https://wa.me/5561981471038?text=Olá! Gostaria de saber mais sobre os planos da ABRACANM"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar pelo WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
