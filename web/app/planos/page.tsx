'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, ArrowRight, Shield, Users, Clock, HeartPulse, FileText, MessageCircle, Stethoscope, Star, X } from 'lucide-react';

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
      <main className="min-h-screen bg-background">
        <Header />
        <section className="bg-primary/5 py-16">
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
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Seu caminho para o tratamento com cannabis medicinal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A ABRACANM conecta você a médicos prescritores, oferece suporte completo 
            e acompanha toda sua jornada de tratamento de forma segura e legal.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>100% Legal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span>+5.000 pacientes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span>Atendimento em até 48h</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          Escolha a melhor opção para você
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {planos.map((plano, index) => (
            <Card key={plano.id} className={`relative ${index === 0 ? 'border-2 border-primary bg-primary/5' : ''}`}>
              {index === 0 && (
                <Badge className="absolute -top-3 left-6 bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Mais vantajoso
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plano.nome}</CardTitle>
                <CardDescription>
                  {plano.descricao}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${index === 0 ? 'text-primary' : ''}`}>
                      {formatCurrency(plano.valorMensalidade)}
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plano.valorMensalidade > 0 ? `Menos de R$ ${(plano.valorMensalidade / 30).toFixed(2).replace('.', ',')} por dia` : 'Sem mensalidade'}
                  </p>
                </div>

                <div className={`${index === 0 ? 'bg-primary/10' : 'bg-muted'} rounded-xl p-4`}>
                  <p className={`text-sm font-medium ${index === 0 ? 'text-primary' : ''} mb-2`}>Inclui consultas com desconto:</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Primeira Consulta</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground line-through text-xs">R$ 149</span>
                      <span className={`font-bold ${index === 0 ? 'text-primary' : ''}`}>{formatCurrency(plano.valorPrimeiraConsulta)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Consultas de Retorno</span>
                    <span className="font-medium">{formatCurrency(plano.valorConsulta)}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Economia de R$ 50</strong> na primeira consulta</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Suporte contínuo via WhatsApp para dúvidas</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Conteúdo educativo sobre cannabis medicinal</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Acompanhamento do tratamento</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Orientação jurídica e sobre importação</span>
                  </li>
                </ul>

                <Button asChild size="lg" className="w-full text-lg py-6">
                  <Link href={`/checkout?plano=${plano.id}&tipo=MENSALIDADE`}>
                    Tornar-se Associado
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Cancele quando quiser, sem multa
                </p>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Consulta Avulsa</CardTitle>
              <CardDescription>
                Para quem prefere pagar apenas quando precisar
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {formatCurrency(149.00)}
                  </span>
                  <span className="text-muted-foreground">/consulta</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Sem mensalidade
                </p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span>Consulta com médico prescritor</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span>Receita digital se indicado</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span>Orientações sobre o tratamento</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                  <span>Sem suporte contínuo</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                  <span>Sem desconto na primeira consulta</span>
                </li>
              </ul>

              <Button asChild variant="outline" size="lg" className="w-full text-lg py-6">
                <Link href="/checkout?tipo=CONSULTA">
                  Agendar Consulta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-16 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-xl text-center">Compare as opções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium"></th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-primary">Associado</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Avulso</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARATIVO.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-3 px-4 text-sm">{row.item}</td>
                      <td className="text-center py-3 px-4">
                        {row.associado ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-3 px-4">
                        {row.avulso ? (
                          <Check className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          O que você recebe como associado
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {BENEFICIOS_DETALHADOS.map((beneficio, idx) => {
            const Icon = beneficio.icon;
            return (
              <Card key={idx} className="hover:border-primary/50 transition">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{beneficio.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{beneficio.descricao}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ainda tem dúvidas?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Nossa equipe está pronta para ajudar você a entender se a cannabis medicinal 
              é indicada para o seu caso. Fale conosco sem compromisso.
            </p>
            <Button variant="outline" asChild>
              <a
                href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os planos da ABRACANM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar pelo WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
