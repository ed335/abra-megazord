'use client';

import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { ArrowRight } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
        className="relative z-10 max-w-4xl mx-auto text-center"
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
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cinza-escuro mb-6 leading-tight"
        >
          Acesso Seguro à{' '}
          <span className="bg-gradient-to-r from-verde-oliva to-verde-claro bg-clip-text text-transparent">
            Cannabis Medicinal
          </span>
        </motion.h1>

        {/* Descrição */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-cinza-medio mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Bem-vindo a uma plataforma que cuida de você. Prescritores validados. Dados protegidos. Educação baseada em ciência.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            variant="primary"
            size="lg"
            className="group"
            onClick={() => router.push('/cadastro')}
          >
            Começar Agora
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/contato')}
          >
            Saber Mais
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-8 pt-12 border-t border-cinza-claro"
        >
          {[
            { number: '500+', label: 'Pacientes Ativos' },
            { number: '150+', label: 'Prescritores Validados' },
            { number: '99.9%', label: 'Uptime' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold text-verde-oliva">
                {stat.number}
              </p>
              <p className="text-sm text-cinza-medio mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
