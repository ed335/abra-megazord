"use client";

import { motion } from "framer-motion";
import { 
  Leaf, 
  Heart, 
  Users, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin,
  Shield,
  Clock,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hover3DCard } from "@/components/ui/hover-3d-card";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";
import { HeroCarteirinha } from "@/components/ui/hero-carteirinha";
import { PatientFlow } from "@/components/ui/patient-flow";
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


const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#fafaf8]">
      <Header />

      {/* Hero Section with Display Cards */}
      <section id="inicio" className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B7C59]/10 border border-[#6B7C59]/20 mb-8"
              >
                <Leaf className="h-4 w-4 text-[#6B7C59]" />
                <span className="text-sm text-[#6B7C59] font-medium tracking-wide">
                  Associação Brasileira de Cannabis Medicinal
                </span>
              </motion.div>

              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold mb-6 tracking-tight text-[#1d1d1f] leading-[1.05]">
                  Qualidade de vida.
                  <br />
                  <span className="text-[#6B7C59]">Cannabis medicinal.</span>
                </h1>
              </motion.div>

              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-xl md:text-2xl text-[#86868b] mb-10 leading-relaxed max-w-2xl lg:max-w-none">
                  Conectamos você a médicos prescritores com suporte completo 
                  em toda sua jornada de tratamento.
                </p>
              </motion.div>

              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#6B7C59] hover:bg-[#5a6a4a] text-white px-8 py-6 text-lg rounded-full"
                >
                  <Link href="/planos">
                    Ver planos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f]/5 px-8 py-6 text-lg rounded-full"
                >
                  <Link href="/cadastro">
                    Saiba mais
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                custom={4}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-[#86868b]"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#6B7C59]" />
                  <span>100% Legal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#6B7C59]" />
                  <span>+5.000 pacientes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#6B7C59]" />
                  <span>Atendimento em até 48h</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Carteirinha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center"
            >
              <HeroCarteirinha />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Serviços Section - Simple */}
      <section id="servicos" className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Nossos serviços
            </h2>
            <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
              Tudo o que você precisa para iniciar seu tratamento com cannabis medicinal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Teleconsulta", description: "Consulte com médicos especializados em cannabis medicinal" },
              { title: "Receita Digital", description: "Prescrição válida em todo território nacional" },
              { title: "Acompanhamento", description: "Suporte contínuo durante todo o tratamento" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl border border-[#e5e5e5] bg-[#fafaf8] hover:shadow-lg hover:border-[#6B7C59]/30 transition-all"
              >
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                <p className="text-[#86868b]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="sobre" className="py-24 px-4 md:px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Nossa missão
            </h2>
            <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
              Acolhemos pacientes que buscam qualidade de vida através da cannabis medicinal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Cuidado humanizado",
                description: "Apoio completo aos pacientes e familiares no acesso ao tratamento",
              },
              {
                icon: BookOpen,
                title: "Ciência e educação",
                description: "Informação científica de qualidade e capacitação contínua",
              },
              {
                icon: Users,
                title: "Comunidade",
                description: "Rede de apoio e compartilhamento de experiências",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Hover3DCard className="h-full">
                  <Card className="border border-[#e5e5e5] shadow-sm bg-white h-full rounded-2xl">
                    <CardContent className="pt-8 pb-8 px-6 text-center">
                      <div className="w-14 h-14 bg-[#6B7C59]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <item.icon className="h-7 w-7 text-[#6B7C59]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                      <p className="text-[#86868b]">{item.description}</p>
                    </CardContent>
                  </Card>
                </Hover3DCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid - Como Funciona */}
      <section id="como-funciona" className="py-24 px-4 md:px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Como funciona
            </h2>
            <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
              Tudo o que você precisa para iniciar seu tratamento de forma simples e segura.
            </p>
          </motion.div>

          <PatientFlow />
        </div>
      </section>

      {/* Radial Orbital Timeline - Jornada do Paciente */}
      <section id="jornada" className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Sua jornada de tratamento
            </h2>
            <p className="text-xl text-[#86868b] max-w-2xl mx-auto">
              Do cadastro até o início do tratamento em 4 passos simples.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 px-4 md:px-6 bg-[#6B7C59]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4 tracking-tight">
              Por que escolher a ABRACANM?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Benefícios exclusivos para nossos associados.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Médicos especializados", description: "Profissionais experientes em cannabis medicinal" },
              { title: "Suporte contínuo", description: "Acompanhamento via WhatsApp para dúvidas" },
              { title: "Preços acessíveis", description: "Consultas com desconto exclusivo" },
              { title: "Conteúdo educativo", description: "Material científico sobre cannabis" },
              { title: "Orientação jurídica", description: "Apoio sobre legislação e importação" },
              { title: "Comunidade ativa", description: "Troca de experiências com outros pacientes" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Hover3DCard className="h-full" rotateIntensity={8}>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 h-full">
                    <CheckCircle className="h-6 w-6 text-[#A8C686] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-white/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                </Hover3DCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Already using AnimatedTestimonials */}
      <section id="depoimentos">
        <AnimatedTestimonials
          testimonials={testimonials}
          title="O que dizem nossos pacientes"
          subtitle="Histórias reais de transformação através da cannabis medicinal."
          badgeText="Depoimentos reais"
          autoRotateInterval={6000}
        />
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 px-4 md:px-6 bg-[#fafaf8]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Entre em contato
            </h2>
            <p className="text-xl text-[#86868b]">
              Estamos aqui para ajudar você.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border border-[#e5e5e5] shadow-none">
              <CardContent className="py-10 px-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 bg-[#6B7C59]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-6 w-6 text-[#6B7C59]" />
                    </div>
                    <h3 className="font-semibold text-[#1d1d1f] mb-1">WhatsApp</h3>
                    <p className="text-[#86868b]">(11) 99999-9999</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#6B7C59]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-6 w-6 text-[#6B7C59]" />
                    </div>
                    <h3 className="font-semibold text-[#1d1d1f] mb-1">Email</h3>
                    <p className="text-[#86868b]">contato@abracanm.org.br</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#6B7C59]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-6 w-6 text-[#6B7C59]" />
                    </div>
                    <h3 className="font-semibold text-[#1d1d1f] mb-1">Localização</h3>
                    <p className="text-[#86868b]">São Paulo, SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-24 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Leaf className="h-16 w-16 text-[#6B7C59] mx-auto mb-8" />
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
              Comece sua jornada hoje
            </h2>
            <p className="text-xl text-[#86868b] mb-10 max-w-2xl mx-auto">
              Associe-se à ABRACANM e tenha acesso a médicos especializados, 
              suporte contínuo e preços acessíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#6B7C59] hover:bg-[#5a6a4a] text-white px-10 py-6 text-lg rounded-full"
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
                className="border-[#1d1d1f]/20 text-[#1d1d1f] hover:bg-[#1d1d1f]/5 px-10 py-6 text-lg rounded-full"
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
      <footer className="py-16 px-4 md:px-6 bg-[#1d1d1f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-[#A8C686]" />
                <span className="text-xl font-semibold text-white">ABRACANM</span>
              </div>
              <p className="text-[#86868b] text-sm">
                Associação Brasileira de Cannabis Medicinal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/planos" className="text-[#86868b] hover:text-white transition-colors">Planos</Link></li>
                <li><Link href="/cadastro" className="text-[#86868b] hover:text-white transition-colors">Cadastro</Link></li>
                <li><Link href="/login" className="text-[#86868b] hover:text-white transition-colors">Entrar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacidade" className="text-[#86868b] hover:text-white transition-colors">Privacidade</Link></li>
                <li><Link href="/termos" className="text-[#86868b] hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="/cookies" className="text-[#86868b] hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contato</h4>
              <ul className="space-y-3 text-sm text-[#86868b]">
                <li>contato@abracanm.org.br</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-[#86868b] text-sm">
              © 2025 ABRACANM. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
