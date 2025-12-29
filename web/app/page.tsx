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
  Star
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ElegantShape from "@/components/home/ElegantShape";
import Header from "@/components/shared/Header";

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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#3a4530] via-[#4a5a3a] to-[#3a4530]">
      <Header />

      <section id="inicio" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-primary/[0.05] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-[#A8C686]/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-[#6B7C59]/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-[#D4A574]/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/[0.1] border border-primary/[0.2] mb-8 md:mb-12"
            >
              <Leaf className="h-4 w-4 text-[#A8C686]" />
              <span className="text-sm text-[#f5f5f0] tracking-wide">
                Associação Brasileira de Cannabis Medicinal
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#f5f5f0] to-[#d4d4c4]">
                  Qualidade de Vida
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A8C686] via-[#c4d8a8] to-[#A8C686]">
                  com Cannabis Medicinal
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-base sm:text-lg md:text-xl text-[#d4d4c4]/80 mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
                Conectamos você a médicos prescritores, oferecemos suporte completo 
                e acompanhamos toda sua jornada de tratamento de forma segura e legal.
              </p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Shield className="h-4 w-4 text-[#A8C686]" />
                <span className="text-sm text-[#f5f5f0]">100% Legal</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Users className="h-4 w-4 text-[#A8C686]" />
                <span className="text-sm text-[#f5f5f0]">+5.000 pacientes</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Clock className="h-4 w-4 text-[#A8C686]" />
                <span className="text-sm text-[#f5f5f0]">Atendimento em até 48h</span>
              </div>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#A8C686] hover:bg-[#8fb366] text-[#3a4530] px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/20"
              >
                <Link href="/planos">
                  Ver Planos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-[#f5f5f0] hover:bg-primary/10 px-8 py-6 text-lg rounded-full bg-transparent"
              >
                <Link href="/cadastro">
                  Associe-se Agora
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#3a4530] via-transparent to-[#3a4530]/80 pointer-events-none" />
      </section>

      <section id="sobre" className="relative py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
              Nossa Missão
            </h2>
            <p className="text-lg text-[#d4d4c4]/70 max-w-3xl mx-auto">
              Acolher pacientes que buscam qualidade de vida através da cannabis medicinal, 
              quebrando barreiras e tabus com ciência, segurança e humanidade.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Cuidado Humanizado",
                description: "Apoio completo aos pacientes e familiares no acesso ao tratamento com cannabis medicinal",
              },
              {
                icon: BookOpen,
                title: "Educação e Ciência",
                description: "Informação científica de qualidade e capacitação profissional contínua",
              },
              {
                icon: Users,
                title: "Comunidade",
                description: "Rede de apoio e compartilhamento de experiências entre pacientes e profissionais",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#4a5a3a]/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 hover:bg-[#4a5a3a]/70 transition-all"
              >
                <item.icon className="h-12 w-12 text-[#A8C686] mb-4" />
                <h3 className="text-xl font-bold text-[#f5f5f0] mb-3">{item.title}</h3>
                <p className="text-[#d4d4c4]/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="relative py-24 px-4 md:px-6 bg-[#3a4530]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
              Como Funciona
            </h2>
            <p className="text-lg text-[#d4d4c4]/70 max-w-3xl mx-auto">
              Sua jornada para o tratamento com cannabis medicinal em 4 passos simples
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: FileText,
                title: "Cadastro",
                description: "Preencha seus dados e envie seus documentos",
              },
              {
                step: "02",
                icon: CheckCircle,
                title: "Pré-Anamnese",
                description: "Responda o questionário de saúde online",
              },
              {
                step: "03",
                icon: Video,
                title: "Teleconsulta",
                description: "Consulte com médico prescritor por vídeo",
              },
              {
                step: "04",
                icon: Leaf,
                title: "Tratamento",
                description: "Receba sua receita e inicie o tratamento",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-[#4a5a3a]/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#A8C686] text-[#3a4530] font-bold text-sm px-3 py-1 rounded-full">
                  {item.step}
                </div>
                <item.icon className="h-10 w-10 text-[#A8C686] mx-auto mb-4 mt-4" />
                <h3 className="text-lg font-bold text-[#f5f5f0] mb-2">{item.title}</h3>
                <p className="text-sm text-[#d4d4c4]/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="relative py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
              Por que escolher a ABRACANM?
            </h2>
            <p className="text-lg text-[#d4d4c4]/70 max-w-3xl mx-auto">
              Benefícios exclusivos para nossos associados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Médicos Especializados",
                description: "Acesso a profissionais experientes em cannabis medicinal",
              },
              {
                title: "Suporte Contínuo",
                description: "Acompanhamento via WhatsApp para dúvidas e orientações",
              },
              {
                title: "Preços Acessíveis",
                description: "Consultas com desconto exclusivo para associados",
              },
              {
                title: "Conteúdo Educativo",
                description: "Material científico sobre cannabis medicinal",
              },
              {
                title: "Orientação Jurídica",
                description: "Apoio sobre legislação e importação de medicamentos",
              },
              {
                title: "Comunidade Ativa",
                description: "Troca de experiências com outros pacientes",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-[#4a5a3a]/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all"
              >
                <CheckCircle className="h-6 w-6 text-[#A8C686] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-[#f5f5f0] mb-1">{item.title}</h3>
                  <p className="text-[#d4d4c4]/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="relative py-24 px-4 md:px-6 bg-[#3a4530]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
              O que dizem nossos pacientes
            </h2>
            <p className="text-lg text-[#d4d4c4]/70 max-w-3xl mx-auto">
              Histórias reais de transformação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria S.",
                condition: "Dor Crônica",
                quote: "Depois de anos sofrendo com dores, finalmente encontrei qualidade de vida. A equipe da ABRACANM me acolheu desde o primeiro contato.",
              },
              {
                name: "João P.",
                condition: "Ansiedade",
                quote: "O tratamento mudou minha vida. Hoje durmo melhor, trabalho melhor e vivo melhor. Gratidão a toda equipe.",
              },
              {
                name: "Ana C.",
                condition: "Epilepsia",
                quote: "Minha filha tinha crises diárias. Com o tratamento, as crises reduziram drasticamente. A ABRACANM foi fundamental nessa jornada.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#4a5a3a]/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#D4A574] fill-current" />
                  ))}
                </div>
                <p className="text-[#d4d4c4]/80 mb-6 italic">&quot;{item.quote}&quot;</p>
                <div>
                  <p className="font-bold text-[#f5f5f0]">{item.name}</p>
                  <p className="text-sm text-[#A8C686]">{item.condition}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="relative py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
              Entre em Contato
            </h2>
            <p className="text-lg text-[#d4d4c4]/70">
              Estamos aqui para ajudar você
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#4a5a3a]/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Phone className="h-10 w-10 text-[#A8C686] mb-4" />
                <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">WhatsApp</h3>
                <p className="text-[#d4d4c4]/70">(11) 99999-9999</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Mail className="h-10 w-10 text-[#A8C686] mb-4" />
                <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">Email</h3>
                <p className="text-[#d4d4c4]/70">contato@abracanm.org.br</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <MapPin className="h-10 w-10 text-[#A8C686] mb-4" />
                <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">Localização</h3>
                <p className="text-[#d4d4c4]/70">São Paulo, SP</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="cta" className="relative py-24 px-4 md:px-6 bg-[#3a4530]/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#4a5a3a] to-[#5a6a4a] backdrop-blur-sm border border-primary/30 rounded-3xl p-12 text-center"
          >
            <Leaf className="h-16 w-16 text-[#A8C686] mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f0] mb-4">
              Comece sua jornada hoje
            </h2>
            <p className="text-lg text-[#d4d4c4]/80 mb-8 max-w-2xl mx-auto">
              Associe-se à ABRACANM e tenha acesso a médicos especializados, 
              suporte contínuo e preços acessíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#A8C686] hover:bg-[#8fb366] text-[#3a4530] px-8 py-6 text-lg rounded-full"
              >
                <Link href="/cadastro">
                  Associar-se Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#A8C686]/50 text-[#f5f5f0] hover:bg-primary/10 px-8 py-6 text-lg rounded-full bg-transparent"
              >
                <Link href="/planos">
                  Conhecer Planos
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative py-12 px-4 md:px-6 border-t border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-[#A8C686]" />
                <span className="text-xl font-bold text-[#f5f5f0]">ABRACANM</span>
              </div>
              <p className="text-[#d4d4c4]/60 text-sm">
                Associação Brasileira de Cannabis Medicinal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#f5f5f0] mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/planos" className="text-[#d4d4c4]/70 hover:text-[#A8C686]">Planos</Link></li>
                <li><Link href="/cadastro" className="text-[#d4d4c4]/70 hover:text-[#A8C686]">Cadastro</Link></li>
                <li><Link href="/login" className="text-[#d4d4c4]/70 hover:text-[#A8C686]">Entrar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#f5f5f0] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacidade" className="text-[#d4d4c4]/70 hover:text-[#A8C686]">Privacidade</Link></li>
                <li><Link href="/termos" className="text-[#d4d4c4]/70 hover:text-[#A8C686]">Termos de Uso</Link></li>
                <li><Link href="/cookies" className="text-[#d4d4c4]/70 hover:text-[#A8C686]">Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#f5f5f0] mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-[#d4d4c4]/70">
                <li>contato@abracanm.org.br</li>
                <li>(11) 99999-9999</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center">
            <p className="text-[#d4d4c4]/60 text-sm">
              © 2025 ABRACANM - Associação Brasileira de Cannabis Medicinal. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
