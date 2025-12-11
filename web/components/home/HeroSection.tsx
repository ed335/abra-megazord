'use client';

import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { ArrowRight, ShieldCheck, BookOpen, Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-verde-claro rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-dourado rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Conteúdo */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center bg-white/60 backdrop-blur-sm border border-cinza-claro/60 rounded-3xl px-6 sm:px-10 py-10 shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Marca */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-verde-claro/10 border border-verde-claro rounded-full">
            <span className="text-2xl">🌿</span>
            <span className="text-sm font-medium text-verde-oliva">AbraCann</span>
          </div>
        </motion.div>

        {/* Heading Principal */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-cinza-escuro mb-4 leading-tight"
        >
          Acesso seguro e acompanhado à{' '}
          <span className="bg-gradient-to-r from-verde-oliva to-verde-claro bg-clip-text text-transparent">
            Cannabis Medicinal
          </span>
        </motion.h1>

        {/* Descrição */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-cinza-medio mb-6 max-w-3xl mx-auto leading-relaxed"
        >
          Associação digital que conecta você a prescritores habilitados, organiza prescrições e documentos em um cartão seguro, e oferece educação responsável. Não somos clínica nem loja: atuamos com ciência, LGPD e acolhimento.
        </motion.p>

        {/* Badges rápidos de confiança */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          {[
            { icon: ShieldCheck, label: 'LGPD + consentimento claro' },
            { icon: BookOpen, label: 'Baseado em ciência, não em promessa' },
            { icon: Ban, label: 'Não vendemos produto; não é uso recreativo' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-off-white border border-cinza-claro text-sm text-cinza-escuro shadow-sm"
              >
                <Icon className="w-4 h-4 text-verde-oliva" aria-hidden />
                {item.label}
              </span>
            );
          })}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Button
            variant="primary"
            size="lg"
            className="group transform transition duration-200 hover:scale-[1.01] shadow-md"
            onClick={() => router.push('/cadastro')}
          >
            Começar meu cadastro
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const target = document.getElementById('como-funciona');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              } else {
                router.push('/#como-funciona');
              }
            }}
          >
            Entender como funciona
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-cinza-claro"
        >
          {[
            { number: '500+', label: 'Pacientes em acompanhamento', desc: 'Fluxos orientados e suporte contínuo.' },
            { number: '150+', label: 'Prescritores habilitados e validados', desc: 'CRM verificado e emissão segura.' },
            { number: '99,9%', label: 'Disponibilidade da plataforma', desc: 'Infra segura para seus documentos.' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="text-center bg-off-white border border-cinza-claro rounded-xl p-5 shadow-sm"
            >
              <p className="text-3xl sm:text-4xl font-bold text-verde-oliva">
                {stat.number}
              </p>
              <p className="text-sm text-cinza-escuro mt-1 font-semibold">{stat.label}</p>
              <p className="text-xs text-cinza-medio mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
