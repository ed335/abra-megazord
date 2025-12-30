'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HeroCarteirinha } from '@/components/ui/hero-carteirinha';

const palavrasFlip = [
  'humanizada',
  'acessível', 
  'segura',
  'acolhedora',
  'transparente',
];

export default function HeroSection() {
  const router = useRouter();
  const [palavraAtual, setPalavraAtual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPalavraAtual((prev) => (prev + 1) % palavrasFlip.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#E8F4F8] via-[#F0F9FF] to-transparent rounded-full opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#3FA174]/5 to-transparent rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold tracking-widest text-[#3FA174] uppercase"
            >
              Cannabis Medicinal no Brasil
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-gray-900 leading-[1.1] tracking-tight">
                Acesse seu
                <br />
                tratamento de
                <br />
                forma{' '}
                <span className="relative inline-block h-[1.2em] align-bottom overflow-hidden" style={{ minWidth: '280px' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={palavraAtual}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      className="absolute left-0 bg-gradient-to-r from-[#3FA174] to-[#6EC1E4] bg-clip-text text-transparent font-semibold italic"
                    >
                      {palavrasFlip[palavraAtual]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Conectamos você a médicos prescritores especializados.
              <br className="hidden sm:block" />
              Consultas por vídeo, receita digital válida em todo Brasil.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Button
                size="lg"
                className="group bg-[#3FA174] hover:bg-[#359966] text-white rounded-full px-8 h-12 shadow-lg shadow-[#3FA174]/20"
                onClick={() => router.push('/agendar')}
              >
                Agendar consulta
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-600 hover:text-gray-900 rounded-full px-6 h-12 group"
                onClick={() => {
                  const target = document.getElementById('como-funciona');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    router.push('/#como-funciona');
                  }
                }}
              >
                Como funciona
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroCarteirinha />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
