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
  MessageCircle,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { HeroCarteirinha } from "@/components/ui/hero-carteirinha";
import { InfiniteBenefitsCarousel } from "@/components/ui/infinite-benefits-carousel";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import Header from "@/components/shared/Header";
import { FooterSection } from "@/components/ui/footer-section";

const faqData = [
  {
    id: 1,
    question: "O tratamento com cannabis medicinal é legal no Brasil?",
    answer: "Sim! A ANVISA regulamenta o uso de produtos à base de cannabis para fins medicinais desde 2015. Com prescrição médica válida, você pode importar ou adquirir legalmente.",
    icon: "✅",
    iconPosition: "right" as const,
  },
  {
    id: 2,
    question: "Como funciona a teleconsulta?",
    answer: "A consulta é realizada por vídeo com médicos especializados em cannabis medicinal. Você recebe orientação personalizada e, se indicado, a prescrição digital válida em todo o Brasil.",
  },
  {
    id: 3,
    question: "Quanto tempo leva para começar o tratamento?",
    answer: "Após a consulta, você recebe a prescrição em até 48 horas. O processo de importação pode levar de 15 a 30 dias, dependendo do produto e fornecedor escolhido.",
    icon: "⏰",
    iconPosition: "left" as const,
  },
  {
    id: 4,
    question: "Quais condições podem ser tratadas com cannabis medicinal?",
    answer: "Diversas condições como dor crônica, epilepsia, ansiedade, insônia, fibromialgia, Parkinson, Alzheimer, autismo e muitas outras podem se beneficiar do tratamento.",
  },
  {
    id: 5,
    question: "A ABRACANM oferece suporte após a consulta?",
    answer: "Sim! Oferecemos acompanhamento contínuo via WhatsApp, orientação sobre importação, e acesso a conteúdo educativo exclusivo para nossos associados.",
    icon: "💚",
    iconPosition: "right" as const,
  },
];

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


export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <Header />

      {/* Hero Section com Scroll Animation e Elementos Flutuantes 3D */}
      <section id="inicio" className="relative w-full bg-gradient-to-b from-[#FAFBFC] to-white overflow-visible" style={{ perspective: "2000px" }}>
        {/* Floating Elements 3D - Nas laterais do viewport, alinhados com o tablet */}
        <div className="hidden md:block">
          {/* Esquerda - Badge Rosa */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
            className="absolute left-2 md:left-4 lg:left-8 xl:left-12 top-[55%] z-50"
            style={{ transform: "perspective(1000px) rotateY(8deg) translateZ(40px)" }}
          >
            <motion.div 
              whileHover={{ scale: 1.08, rotateY: 0 }}
              className="bg-rose-100 text-rose-600 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold shadow-[0_15px_40px_rgba(244,63,94,0.25)] flex items-center gap-2 border border-rose-200/60"
            >
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
              Atendimento Rápido
            </motion.div>
          </motion.div>

          {/* Esquerda - Card Limite */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1, type: "spring" }}
            className="absolute left-1 md:left-2 lg:left-4 xl:left-8 top-[62%] z-50"
            style={{ transform: "perspective(1000px) rotateY(10deg) translateZ(60px)" }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 3 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-3 md:p-5 border border-gray-100"
            >
              <p className="text-[10px] md:text-xs text-gray-400 mb-1">Limite de Consultas</p>
              <p className="text-sm md:text-lg font-bold text-gray-900">Ilimitado</p>
              <div className="mt-2 md:mt-3 h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden w-20 md:w-28">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 1.2, delay: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Esquerda - Card Azul Consulta */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            className="absolute left-4 md:left-6 lg:left-12 xl:left-20 top-[72%] z-50"
            style={{ transform: "perspective(1000px) rotateY(6deg) translateZ(50px)" }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl md:rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.35)] p-3 md:p-4 flex items-center gap-2 md:gap-3"
            >
              <motion.div 
                className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
              <span className="font-semibold text-xs md:text-sm">Consulta Realizada!</span>
            </motion.div>
          </motion.div>

          {/* Direita - Badge Verde */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
            className="absolute right-2 md:right-4 lg:right-8 xl:right-12 top-[54%] z-50"
            style={{ transform: "perspective(1000px) rotateY(-8deg) translateZ(40px)" }}
          >
            <motion.div 
              whileHover={{ scale: 1.08, rotateY: 0 }}
              className="bg-gradient-to-r from-[#3FA174] to-[#2D8B60] text-white px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold shadow-[0_15px_40px_rgba(63,161,116,0.35)]"
            >
              100% Legal
            </motion.div>
          </motion.div>

          {/* Direita - Card Satisfação */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.1, type: "spring" }}
            className="absolute right-1 md:right-2 lg:right-4 xl:right-8 top-[61%] z-50"
            style={{ transform: "perspective(1000px) rotateY(-10deg) translateZ(60px)" }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: -3 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-3 md:p-5 border border-gray-100"
            >
              <p className="text-[10px] md:text-xs text-gray-400 mb-1">Satisfação</p>
              <div className="flex items-center gap-1">
                <motion.span 
                  className="text-rose-500 text-sm md:text-base font-bold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >+</motion.span>
                <p className="text-xl md:text-2xl font-bold text-gray-900">98%</p>
              </div>
              <div className="flex gap-1.5 mt-2">
                <motion.div 
                  className="w-6 h-6 md:w-7 md:h-7 bg-green-100 rounded-lg flex items-center justify-center text-[10px] md:text-xs text-green-600 font-medium"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >↓</motion.div>
                <motion.div 
                  className="w-6 h-6 md:w-7 md:h-7 bg-purple-100 rounded-lg flex items-center justify-center text-[10px] md:text-xs text-purple-600 font-medium"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >↑</motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Direita - Card Pacientes */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.3, type: "spring" }}
            className="absolute right-4 md:right-6 lg:right-12 xl:right-20 top-[71%] z-50"
            style={{ transform: "perspective(1000px) rotateY(-6deg) translateZ(50px)" }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 0 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-3 md:p-5 border border-gray-100"
            >
              <p className="text-[10px] md:text-xs text-gray-400 mb-1">Pacientes Atendidos</p>
              <p className="text-lg md:text-xl font-bold text-[#3FA174]">+5.000</p>
            </motion.div>
          </motion.div>
        </div>

        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight text-gray-900 leading-[1.1]">
                Simples. <span className="text-[#3FA174]">Seguro.</span>
                <br />
                Feito para Você.
              </h1>
              
              <p className="text-gray-500 text-base lg:text-lg mb-8 max-w-xl mx-auto">
                Conectamos você a médicos prescritores especializados.
                Consultas por vídeo, receita digital válida em todo o Brasil.
              </p>
              
              <div className="flex gap-3 justify-center mb-8">
                <Button
                  asChild
                  className="bg-[#3FA174] hover:bg-[#359966] text-white px-6 py-5 text-sm font-medium rounded-full"
                >
                  <Link href="/cadastro">
                    Agendar consulta
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-5 text-sm font-medium rounded-full"
                >
                  <Link href="/planos">
                    Como funciona
                  </Link>
                </Button>
              </div>
            </div>
          }
        >
          <div className="relative h-full w-full flex items-center justify-center p-4 md:p-8">
            <HeroCarteirinha className="scale-90 md:scale-100" />
          </div>
        </ContainerScroll>

        {/* Mobile Floating Badges */}
        <div className="flex md:hidden justify-center gap-2 -mt-20 mb-8 flex-wrap px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-rose-100 text-rose-600 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg"
          >
            <Zap className="w-3 h-3" />
            Atendimento Rápido
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#3FA174] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg"
          >
            100% Legal
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg"
          >
            <CheckCircle className="w-3 h-3" />
            Consulta Realizada
          </motion.span>
        </div>
      </section>

      {/* Stats Section - Seção Exclusiva */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Números que <span className="text-[#3FA174]">inspiram confiança</span>
            </h2>
            <p className="text-gray-500">
              Resultados reais de quem cuida de você
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <motion.span 
                className="text-4xl md:text-5xl font-bold text-[#3FA174] block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >+5.000</motion.span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Pacientes Atendidos</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <motion.span 
                className="text-4xl md:text-5xl font-bold text-[#3FA174] block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >48h</motion.span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Atendimento Rápido</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <motion.span 
                className="text-4xl md:text-5xl font-bold text-[#3FA174] block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >98%</motion.span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Satisfação</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <motion.span 
                className="text-4xl md:text-5xl font-bold text-[#3FA174] block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >100%</motion.span>
              <p className="text-gray-500 mt-2 text-sm uppercase tracking-wide">Legal e Seguro</p>
            </motion.div>
          </div>
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
            {conditions.map((condition) => (
              <Link
                key={condition}
                href={`/cadastro?condicao=${encodeURIComponent(condition)}`}
                className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-[#3FA174] hover:text-white transition-all duration-200 text-sm font-medium"
              >
                {condition}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works - Timeline */}
      <section id="como-funciona" className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Em poucos passos, você inicia seu tratamento com cannabis medicinal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {journeyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#3FA174] text-white flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.id}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#3FA174] hover:bg-[#359966] text-white px-8 py-6 text-lg font-medium rounded-xl"
            >
              <Link href="/cadastro">
                Começar agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos serviços
            </h2>
            <p className="text-gray-600 text-lg">
              Tudo que você precisa para seu tratamento em um só lugar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3FA174]/10 text-[#3FA174] flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Carousel - Infinite 3D */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a ABRACANM?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Mais de 14 benefícios exclusivos para nossos associados
            </p>
          </motion.div>
        </div>
        
        <InfiniteBenefitsCarousel />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600 text-lg">
              Tire suas dúvidas sobre o tratamento com cannabis medicinal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaqAccordion 
              data={faqData}
              className="max-w-3xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos pacientes dizem
            </h2>
            <p className="text-gray-600 text-lg">
              Histórias reais de quem transformou sua qualidade de vida
            </p>
          </motion.div>

          <AnimatedTestimonials testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 bg-[#1B4332]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para começar seu tratamento?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Agende sua consulta agora e dê o primeiro passo para uma vida com mais qualidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1B4332] hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-xl"
              >
                <Link href="/cadastro">
                  Agendar consulta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-xl"
              >
                <Link href="https://wa.me/5511999999999" target="_blank">
                  <Phone className="mr-2 h-5 w-5" />
                  Falar no WhatsApp
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
