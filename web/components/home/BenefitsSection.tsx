'use client';

import { motion } from 'framer-motion';

const benefits = [
  { title: 'Documentos organizados', desc: 'Prescrições, laudos e autorizações em um só lugar.' },
  { title: 'Acesso a prescritores', desc: 'Conexão com médicos habilitados e verificados.' },
  { title: 'Educação contínua', desc: 'Conteúdo curado para uso seguro e responsável.' },
  { title: 'Suporte humano', desc: 'Atendimento acolhedor em linguagem simples.' },
  { title: 'Transparência jurídica', desc: 'Fluxos alinhados à legislação de saúde e LGPD.' },
  { title: 'Base em evidências', desc: 'Decisões guiadas por ciência, não por promessas.' },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-cinza-muito-claro">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold text-verde-oliva uppercase tracking-wide">
            Benefícios
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-cinza-escuro">
            Por que ser associado AbraCann faz diferença no seu tratamento?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="h-full bg-white border border-cinza-claro rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 mb-3 rounded-full bg-verde-claro/15 text-verde-oliva flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-cinza-escuro mb-1">{benefit.title}</h3>
              <p className="text-sm text-cinza-medio leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
