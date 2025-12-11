'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Segurança de Dados e LGPD',
    description:
      'Dados sensíveis protegidos, consentimento granular, trilha de auditoria e controles de acesso claros.',
  },
  {
    icon: Lock,
    title: 'Prescrições Digitais e Organização',
    description:
      'Prescrições com QR code e assinatura digital, histórico organizado e cartão medicinal sempre à mão.',
  },
  {
    icon: Users,
    title: 'Rede de Prescritores Validados',
    description:
      'CRM verificado, fluxo seguro para emissão e comunicação com pacientes, tudo em um só lugar.',
  },
  {
    icon: Award,
    title: 'Educação Médica e Orientação Segura',
    description:
      'Conteúdos curados por especialistas, orientações responsáveis e alertas de segurança.',
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-cinza-escuro mb-4"
          >
            Recursos Pensados para Você
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-cinza-medio max-w-3xl mx-auto"
          >
            Tudo integrado em uma plataforma segura, acolhedora e completa — para quem quer orientação clara e documentos em ordem.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-off-white border border-cinza-claro rounded-lg p-6 hover:shadow-md transition-all"
              >
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-verde-oliva" />
                </div>
                <h3 className="text-lg font-semibold text-cinza-escuro mb-2">
                  {feature.title}
                </h3>
                <p className="text-cinza-medio text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
