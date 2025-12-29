"use client";

import { motion } from "framer-motion";
import { 
  Leaf, 
  Shield,
  Clock,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  Users,
  Heart,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Star,
  Calendar,
  MessageCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";
import { HeroCarteirinha } from "@/components/ui/hero-carteirinha";
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

const stats = [
  { value: "+5.000", label: "Pacientes atendidos", icon: Users },
  { value: "+250", label: "Médicos parceiros", icon: Star },
  { value: "48h", label: "Tempo de atendimento", icon: Clock },
  { value: "100%", label: "Legal e seguro", icon: Shield },
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

      {/* Hero Section - Light Gradient */}
      <section id="inicio" className="relative min-h-[90vh] w-full overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F4F8] via-[#F0F9FF] to-white" />
        
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#3FA174]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#6EC1E4]/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
              >
                <Leaf className="h-4 w-4 text-[#3FA174]" />
                <span className="text-sm text-gray-600 font-medium">
                  Associação Brasileira de Cannabis Medicinal
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900 leading-tight"
              >
                Médicos prescritores de{" "}
                <span className="text-[#3FA174]">Cannabis Medicinal</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              >
                Conectamos você a médicos especializados com suporte completo 
                em toda sua jornada de tratamento.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#3FA174] hover:bg-[#359966] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-[#3FA174]/25"
                >
                  <Link href="/cadastro">
                    Iniciar jornada
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-full"
                >
                  <Link href="/planos">
                    Entenda como funciona
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6"
              >
                {stats.slice(0, 3).map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="w-10 h-10 bg-[#3FA174]/10 rounded-xl flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-[#3FA174]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <HeroCarteirinha />
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
      <section id="destaque" className="py-20 px-4 md:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-relaxed"
          >
            A <span className="text-[#3FA174] font-bold">ABRACANM</span> 🌿 está democratizando
            o acesso a tratamentos com Cannabis Medicinal no Brasil 🇧🇷 oferecendo
            consultas médicas com especialistas de forma{" "}
            <span className="bg-[#3FA174]/10 px-2 py-1 rounded-lg text-[#3FA174] font-bold">
              100% legal e segura
            </span>
          </motion.p>
        </div>
      </section>

      {/* Services Section - Clean Cards */}
      <section id="servicos" className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo o que você precisa para iniciar seu tratamento de forma simples e segura.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#3FA174]/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#3FA174]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#3FA174]/20 transition-colors">
                    <Icon className="h-7 w-7 text-[#3FA174]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section - Clean Cards */}
      <section id="sobre" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa missão
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acolhemos pacientes que buscam qualidade de vida através da cannabis medicinal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Cuidado humanizado",
                description: "Apoio completo aos pacientes e familiares no acesso ao tratamento",
                color: "#3FA174",
              },
              {
                icon: BookOpen,
                title: "Ciência e educação",
                description: "Informação científica de qualidade e capacitação contínua",
                color: "#6EC1E4",
              },
              {
                icon: Users,
                title: "Comunidade",
                description: "Rede de apoio e compartilhamento de experiências",
                color: "#3FA174",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="h-8 w-8" style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section id="jornada" className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sua jornada de tratamento
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Do cadastro até o início do tratamento em 4 passos simples.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <RadialOrbitalTimeline 
              items={journeyItems} 
              title="ABRACANM"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Clean Grid */}
      <section id="beneficios" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a ABRACANM?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Benefícios exclusivos para nossos associados.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-[#3FA174]/5 border border-transparent hover:border-[#3FA174]/20 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-[#3FA174]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#3FA174]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
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

      {/* Contact Section - Clean */}
      <section id="contato" className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Entre em contato
            </h2>
            <p className="text-lg text-gray-600">
              Estamos aqui para ajudar você.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Phone, title: "WhatsApp", value: "(11) 99999-9999", href: "https://wa.me/5511999999999" },
              { icon: Mail, title: "Email", value: "contato@abracanm.org.br", href: "mailto:contato@abracanm.org.br" },
              { icon: MapPin, title: "Localização", value: "São Paulo, SP" },
            ].map((contact, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#3FA174]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="h-6 w-6 text-[#3FA174]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{contact.title}</h3>
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-gray-600 hover:text-[#3FA174] transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{contact.value}</p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-[#3FA174]/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Leaf className="h-10 w-10 text-[#3FA174]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comece sua jornada hoje
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Associe-se à ABRACANM e tenha acesso a médicos especializados, 
              suporte contínuo e preços acessíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#3FA174] hover:bg-[#359966] text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-[#3FA174]/25"
              >
                <Link href="/cadastro">
                  Associar-se agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-6 text-lg rounded-full"
              >
                <Link href="/planos">
                  Conhecer planos
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
