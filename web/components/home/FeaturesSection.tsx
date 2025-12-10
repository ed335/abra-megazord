'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Segurança Garantida',
    description:
      'Criptografia AES-256, LGPD by design, consentimento granular e logs de auditoria.',
  },
  {
    icon: Lock,
    title: 'Prescrições Digitais',
    description:
      'Emita e valide prescrições com QR code e assinatura digital. Histórico sempre disponível.',
  },
  {
    icon: Users,
    title: 'Prescritores Validados',
    description:
      'Verificação de CRM e fluxo de onboarding seguro para profissionais de saúde.',
  },
  {
    icon: Award,
    title: 'Educação Baseada em Ciência',
    description:
      'Artigos e orientações curadas por especialistas para pacientes e prescritores.',
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
            className="text-xl text-cinza-medio max-w-2xl mx-auto"
          >
            Tudo integrado em uma plataforma segura, acolhedora e completa.
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
                className="bg-off-white border border-cinza-claro rounded-lg p-6 hover:shadow-md transition-shadow"
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
