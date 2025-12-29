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
    <div className="relative min-h-screen w-full bg-[#FAFBFC]">
      <Header />

      {/* Hero Section - Ezcard Style EXATO */}
      <section id="inicio" className="relative w-full pt-24 pb-8 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full border border-gray-200/40" />
          <div className="absolute top-40 left-20 w-[300px] h-[300px] rounded-full border border-gray-200/30" />
          <div className="absolute -bottom-20 right-0 w-[400px] h-[200px] bg-gradient-to-l from-purple-100/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Headline - Centered like Ezcard */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-gray-900 leading-[1.1]"
            >
              Simples. <span className="text-[#3FA174]">Seguro.</span>
              <br />
              Feito para Você.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-500 text-base lg:text-lg mb-6 max-w-xl mx-auto"
            >
              Conectamos você a médicos prescritores especializados.
              Consultas por vídeo, receita digital válida em todo o Brasil.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-3 justify-center"
            >
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
            </motion.div>
          </div>

          {/* Cards Section - Like Ezcard */}
          <div className="relative max-w-5xl mx-auto mt-8">
            {/* Left Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-0 top-20 hidden lg:block z-10"
            >
              <div className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Atendimento Rápido
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-0 top-52 hidden lg:block z-10"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Limite de Consultas</p>
                <p className="text-lg font-bold text-gray-900">Ilimitado</p>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">Premium</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute left-8 bottom-8 hidden lg:block z-10"
            >
              <div className="bg-blue-500 text-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="font-medium">Consulta Realizada!</span>
              </div>
            </motion.div>

            {/* Center Card - Main Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <HeroCarteirinha />
            </motion.div>

            {/* Right Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute right-0 top-16 hidden lg:block z-10"
            >
              <div className="bg-[#3FA174] text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                100% Legal
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute right-0 top-40 hidden lg:block z-10"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Pacientes Atendidos</p>
                <p className="text-2xl font-bold text-[#3FA174]">+5.000</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute right-4 bottom-20 hidden lg:block z-10"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Satisfação</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <div className="flex gap-1 mt-1">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-xs text-green-600">↓</div>
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-xs text-purple-600">↑</div>
                </div>
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

      {/* Benefits Carousel */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a ABRACANM?
            </h2>
            <p className="text-gray-600 text-lg">
              Benefícios exclusivos para nossos associados
            </p>
          </motion.div>

          <BenefitsCarousel benefits={benefits} />
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
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ABRACANM</h3>
              <p className="text-gray-400 text-sm">
                Associação Brasileira de Cannabis Medicinal. Seu tratamento de forma legal, segura e acessível.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre nós</Link></li>
                <li><Link href="/planos" className="hover:text-white transition-colors">Planos</Link></li>
                <li><Link href="/educacao" className="hover:text-white transition-colors">Educação</Link></li>
                <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="hover:text-white transition-colors">Termos de uso</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>contato@abracanm.com.br</li>
                <li>(11) 99999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 ABRACANM. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
