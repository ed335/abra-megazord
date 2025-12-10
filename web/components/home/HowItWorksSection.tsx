'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Cadastre-se',
    description: 'Crie sua conta com validação de e-mail. Dados protegidos e consentimento LGPD.',
  },
  {
    title: 'Busque um Prescritor',
    description: 'Escolha prescritores com CRM validado e veja a disponibilidade.',
  },
  {
    title: 'Receba Prescrição',
    description: 'Receba prescrição digital com QR code e assinatura eletrônica.',
  },
  {
    title: 'Acesse Benefícios',
    description: 'Educação, suporte e acompanhamento contínuo em um só lugar.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-cinza-muito-claro">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-cinza-escuro mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-cinza-medio max-w-2xl mx-auto">
            4 passos simples para ter acesso à cannabis medicinal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Número do passo */}
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-verde-oliva text-off-white rounded-full font-bold text-lg">
                  {index + 1}
                </div>
              </div>

              {/* Linhas conectoras (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-24 w-full h-0.5 bg-gradient-to-r from-verde-oliva to-transparent" />
              )}

              {/* Card */}
              <h3 className="text-lg font-semibold text-cinza-escuro mb-3">
                {step.title}
              </h3>
              <p className="text-cinza-medio text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Check icon */}
              <CheckCircle className="w-5 h-5 text-verde-oliva" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
