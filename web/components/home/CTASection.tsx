'use client';

import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto bg-gradient-to-r from-verde-oliva to-verde-claro rounded-2xl p-12 sm:p-16 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-off-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Pronto para Começar?
        </motion.h2>

        <motion.p
          className="text-xl text-off-white/90 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Junte-se a centenas de pacientes que já têm acesso seguro e responsável à cannabis medicinal.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            variant="primary"
            size="lg"
            className="bg-off-white text-verde-oliva hover:bg-cinza-claro group"
            onClick={() => router.push('/cadastro')}
          >
            Cadastre-se Agora
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="border-off-white text-off-white hover:bg-off-white/10"
            onClick={() => router.push('/contato')}
          >
            Fale Conosco
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-off-white/70 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Seus dados são protegidos conforme a LGPD. Verificação de identidade inclusa no processo.
        </motion.p>
      </motion.div>
    </section>
  );
}
