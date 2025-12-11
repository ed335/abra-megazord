'use client';

import { motion } from 'framer-motion';

const aboutCards = [
  {
    title: 'Associação Medicinal',
    description:
      'Entidade focada em saúde, conexão entre pacientes e prescritores, sem fins recreativos.',
    icon: (
      <svg className="w-6 h-6 text-verde-oliva" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 3l7 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l7-4z" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    title: 'Segurança & Legalidade',
    description:
      'Prescrição médica, documentação organizada e fluxos alinhados à legislação e à LGPD.',
    icon: (
      <svg className="w-6 h-6 text-verde-oliva" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 3l7 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Acolhimento Contínuo',
    description:
      'Suporte humano, educação e acompanhamento para que o tratamento seja seguro e claro.',
    icon: (
      <svg className="w-6 h-6 text-verde-oliva" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z" />
        <path d="M10 11h4" />
      </svg>
    ),
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-cinza-muito-claro">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* texto introdutório */}
        <div className="space-y-4 text-center">
          <p className="text-sm font-semibold text-verde-oliva uppercase tracking-wide">
            O que é a AbraCann
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-cinza-escuro">
            O que é a AbraCann e por que ela existe?
          </h2>
          <div className="space-y-3 max-w-4xl mx-auto text-base sm:text-lg text-cinza-medio leading-relaxed">
            <p>
              Somos uma associação medicinal que conecta pacientes e prescritores habilitados, organiza documentação e prescrição digital em um cartão seguro e acompanha o tratamento de forma ética.
            </p>
            <p>
              Não somos clínica nem loja. Atuamos com base em ciência, responsabilidade jurídica e acolhimento, garantindo segurança de dados e processos alinhados à legislação de saúde.
            </p>
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full bg-white border border-cinza-claro rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-verde-claro/15 mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-cinza-escuro mb-2">{card.title}</h3>
              <p className="text-sm text-cinza-medio leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
