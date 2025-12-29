"use client";

import { motion } from "framer-motion";
import { 
  Leaf, 
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HeroCarteirinha } from "@/components/ui/hero-carteirinha";
import { BenefitsCarousel } from "@/components/ui/benefits-carousel";
import Header from "@/components/shared/Header";

const testimonials = [
  {
    id: 1,
    name: "Maria S.",
    role: "Paciente",
    company: "Dor Crônica",
    content: "Depois de anos sofrendo com dores, finalmente encontrei qualidade de vida. A equipe da ABRACANM me acolheu desde o primeiro contato.",
    rating: 5,
    avatar: "",
  },
  {
    id: 2,
    name: "João P.",
    role: "Paciente",
    company: "Ansiedade",
    content: "O tratamento mudou minha vida. Hoje durmo melhor, trabalho melhor e vivo melhor. Gratidão a toda equipe.",
    rating: 5,
    avatar: "",
  },
  {
    id: 3,
    name: "Ana C.",
    role: "Mãe de paciente",
    company: "Epilepsia",
    content: "Minha filha tinha crises diárias. Com o tratamento, as crises reduziram drasticamente. A ABRACANM foi fundamental nessa conquista.",
    rating: 5,
    avatar: "",
  },
  {
    id: 4,
    name: "Carlos R.",
    role: "Paciente",
    company: "Fibromialgia",
    content: "Encontrei na ABRACANM o suporte que precisava. Os médicos são atenciosos e o processo de obtenção da receita foi muito tranquilo.",
    rating: 5,
    avatar: "",
  },
];

const journeyItems = [
  {
    id: 1,
    title: "Cadastro",
    description: "Preencha seus dados e envie documentação",
    date: "Passo 1",
    icon: <FileText className="size-4" />,
  },
  {
    id: 2,
    title: "Pré-anamnese",
    description: "Responda o questionário de saúde online",
    date: "Passo 2",
    icon: <CheckCircle className="size-4" />,
  },
  {
    id: 3,
    title: "Teleconsulta",
    description: "Consulta por vídeo com médico prescritor",
    date: "Passo 3",
    icon: <Video className="size-4" />,
  },
  {
    id: 4,
    title: "Tratamento",
    description: "Receba sua receita e inicie o tratamento",
    date: "Passo 4",
    icon: <Leaf className="size-4" />,
  },
];

const conditions = [
  "Ansiedade", "Dor Crônica", "Insônia", "Depressão", "Epilepsia",
  "Fibromialgia", "Autismo", "Parkinson", "Alzheimer", "TDAH",
  "Síndrome do Pânico", "Estresse Pós-Traumático"
];

const services = [
  {
    icon: Calendar,
    title: "Agendamento Fácil",
    description: "Escolha o melhor horário para sua consulta em poucos cliques.",
  },
  {
    icon: Video,
    title: "Teleconsulta Segura",
    description: "Consulte com médicos prescritores de qualquer lugar, com total privacidade.",
  },
  {
    icon: FileText,
    title: "Receita Digital",
    description: "Prescrição emitida digitalmente, válida em todo território nacional.",
  },
  {
    icon: MessageCircle,
    title: "Suporte Contínuo",
    description: "Tire dúvidas via WhatsApp com nossa equipe especializada.",
  },
];

const benefits = [
  { title: "Médicos especializados", description: "Profissionais experientes em cannabis medicinal" },
  { title: "Suporte contínuo", description: "Acompanhamento via WhatsApp para dúvidas" },
  { title: "Preços acessíveis", description: "Consultas com desconto exclusivo" },
  { title: "Conteúdo educativo", description: "Material científico sobre cannabis" },
  { title: "Orientação jurídica", description: "Apoio sobre legislação e importação" },
  { title: "Comunidade ativa", description: "Troca de experiências com outros pacientes" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <Header />

      {/* Hero Section - Ezcard Style */}
      <section id="inicio" className="relative w-full bg-gradient-to-b from-gray-50 via-white to-white pt-24 pb-16 overflow-hidden">
        {/* Background Decorative Curves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full border border-gray-200/50" />
          <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] rounded-full border border-gray-200/30" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#3FA174]/5" />
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-20 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight text-gray-900 leading-[1.1]"
              >
                Acesse seu tratamento{" "}
                <br className="hidden sm:block" />
                de forma <span className="text-[#3FA174]">simples.</span>{" "}
                <span className="text-[#3FA174]">segura.</span>{" "}
                <span className="text-[#3FA174]">legal.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base lg:text-lg text-gray-500 mb-8 leading-relaxed max-w-md lg:max-w-lg"
              >
                Conectamos você a médicos prescritores especializados.
                Consultas por vídeo, receita digital válida em todo o Brasil.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#3FA174] hover:bg-[#359966] text-white px-8 py-6 text-base font-medium rounded-full shadow-lg shadow-[#3FA174]/20 hover:shadow-xl hover:shadow-[#3FA174]/30 transition-all"
                >
                  <Link href="/cadastro">
                    Agendar consulta
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-base font-medium rounded-full"
                >
                  <Link href="/planos">
                    Como funciona
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Mockup with Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -left-8 top-16 z-20"
              >
                <div className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  100% Legal
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -right-4 top-24 z-20"
              >
                <div className="bg-[#3FA174] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Receita Digital
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -left-4 bottom-32 z-20"
              >
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Status</p>
                      <p className="text-sm font-bold text-gray-900">Atendimento Rápido</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute right-8 bottom-16 z-20"
              >
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-xl">
                  <p className="text-xs text-gray-400 mb-1">Pacientes atendidos</p>
                  <p className="text-2xl font-bold text-[#3FA174]">+5.000</p>
                </div>
              </motion.div>

              {/* Main Mockup */}
              <div className="flex justify-center items-center pl-8">
                <HeroCarteirinha className="w-full max-w-md" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Centered */}
      <section className="py-12 px-4 md:px-6 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-12 md:gap-20"
          >
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-[#3FA174]">+5.000</span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">pacientes atendidos</p>
            </div>
            <div className="w-px h-16 bg-gray-200" />
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-[#3FA174]">48h</span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">atendimento rápido</p>
            </div>
            <div className="w-px h-16 bg-gray-200" />
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-[#3FA174]">100%</span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">legal e seguro</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditions Section - Pill Tags */}
      <section id="condicoes" className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Para qual condição você busca tratamento?
            </h2>
            <p className="text-gray-600">
              Selecione sua condição e inicie seu tratamento com cannabis medicinal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {conditions.map((condition, index) => (
              <Link
                key={index}
                href="/cadastro"
                className="px-5 py-2.5 bg-gray-50 hover:bg-[#3FA174]/10 border border-gray-200 hover:border-[#3FA174]/30 rounded-full text-gray-700 hover:text-[#3FA174] transition-all duration-200 text-sm font-medium"
              >
                {condition}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <section id="destaque" className="py-24 px-4 md:px-6 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed"
          >
            Democratizamos o acesso a tratamentos com cannabis medicinal no Brasil, 
            conectando pacientes a médicos prescritores especializados de forma
            <span className="text-gray-900 font-semibold"> 100% legal e segura</span>.
          </motion.p>
        </div>
      </section>

      {/* Services Section - Minimal */}
      <section id="servicos" className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Como funciona
            </h2>
            <p className="text-gray-500 max-w-lg">
              Processo simples e seguro para iniciar seu tratamento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#3FA174]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="sobre" className="py-28 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-[#3FA174] font-medium text-sm uppercase tracking-wide mb-4">
              Nossa missão
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight">
              Quebrar barreiras e tabus com{" "}
              <span className="text-[#3FA174]">ciência</span>,{" "}
              <span className="text-[#3FA174]">segurança</span> e{" "}
              <span className="text-[#3FA174]">humanidade</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                number: "01",
                title: "Cuidado humanizado",
                description: "Acolhemos cada paciente de forma única, oferecendo suporte completo no acesso ao tratamento para você e sua família.",
              },
              {
                number: "02",
                title: "Ciência e educação",
                description: "Trabalhamos com base em evidências científicas, promovendo capacitação contínua e informação de qualidade.",
              },
              {
                number: "03",
                title: "Comunidade ativa",
                description: "Construímos uma rede de apoio onde pacientes compartilham experiências e se fortalecem juntos.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <span className="text-6xl font-bold text-gray-100 absolute -top-4 -left-2">
                  {item.number}
                </span>
                <div className="relative pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link 
              href="/sobre"
              className="inline-flex items-center gap-2 text-[#3FA174] font-medium hover:gap-3 transition-all"
            >
              Conheça nossa história
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section id="jornada" className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Sua jornada
            </h2>
            <p className="text-gray-500">
              4 passos simples para iniciar seu tratamento.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {journeyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[#3FA174] font-bold text-sm">{String(index + 1).padStart(2, '0')}</span>
                  {index < journeyItems.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-gray-200" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Clickable Carousel */}
      <section id="beneficios" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que a ABRACANM?
              </h2>
              <p className="text-gray-500 mb-8">
                Benefícios exclusivos para nossos associados.
              </p>
              <Button
                asChild
                className="bg-[#3FA174] hover:bg-[#359966] text-white"
              >
                <Link href="/planos">
                  Ver planos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <BenefitsCarousel benefits={benefits} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="bg-gray-50">
        <AnimatedTestimonials
          testimonials={testimonials}
          title="O que dizem nossos pacientes"
          subtitle="Histórias reais de transformação através da cannabis medicinal."
          badgeText="Depoimentos reais"
          autoRotateInterval={6000}
        />
      </section>

      {/* Contact Section - Minimal */}
      <section id="contato" className="py-24 px-4 md:px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Fale conosco
              </h2>
              <p className="text-gray-500 mb-8">
                Tire suas dúvidas sobre cannabis medicinal e tratamentos.
              </p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#3FA174] hover:bg-[#359966] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <a href="mailto:contato@abracanm.org.br" className="text-gray-900 hover:text-[#3FA174] transition-colors">
                  contato@abracanm.org.br
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Telefone</p>
                <a href="tel:+5511999999999" className="text-gray-900 hover:text-[#3FA174] transition-colors">
                  (11) 99999-9999
                </a>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Localização</p>
                <p className="text-gray-900">São Paulo, SP</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pronto para começar?
            </h2>
            <p className="text-gray-500 mb-10">
              Associe-se e tenha acesso a médicos especializados em cannabis medicinal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#3FA174] hover:bg-[#359966] text-white px-8 py-6"
              >
                <Link href="/cadastro">
                  Agendar consulta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-white px-8 py-6"
              >
                <Link href="/planos">
                  Ver planos
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-[#3FA174]" />
                <span className="text-xl font-bold text-white">ABRACANM</span>
              </div>
              <p className="text-gray-400 text-sm">
                Associação Brasileira de Cannabis Medicinal
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/planos" className="text-gray-400 hover:text-white transition-colors">Planos</Link></li>
                <li><Link href="/cadastro" className="text-gray-400 hover:text-white transition-colors">Cadastro</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Entrar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacidade" className="text-gray-400 hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contato</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>contato@abracanm.org.br</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 ABRACANM. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
