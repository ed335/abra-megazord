'use client'

import { useState } from "react"
import { Leaf, Shield, CreditCard, QrCode } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer w-full max-w-sm", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[1.586/1] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente do Cartão */}
        <motion.div
          className="absolute inset-0 rounded-2xl p-5 sm:p-6 overflow-hidden backface-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #6B7C59 0%, #4A5A3A 50%, #3d4a30 100%)"
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {/* Padrão decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 sm:w-32 h-24 sm:h-32 rounded-full border-2 border-white/30" />
            <div className="absolute top-8 right-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full border border-white/20" />
            <div className="absolute -bottom-8 -left-8 w-32 sm:w-40 h-32 sm:h-40 rounded-full border-2 border-white/20" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                <div>
                  <div className="text-white font-bold text-sm sm:text-lg tracking-wide">ABRACANM</div>
                  <div className="text-white/70 text-[8px] sm:text-[10px] tracking-wider hidden sm:block">
                    ASSOCIAÇÃO BRASILEIRA DE CANNABIS MEDICINAL
                  </div>
                </div>
              </div>
              <div className="px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-white/20 text-white">
                ASSOCIADO
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider">Nome do Associado</div>
              <div className="text-white font-semibold text-base sm:text-lg tracking-wide">
                SEU NOME AQUI
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-wider">Matrícula</div>
                <div className="text-white font-mono text-sm sm:text-base tracking-widest">
                  ABR-000000
                </div>
              </div>
              <div>
                <div className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-wider">Validade</div>
                <div className="text-white font-mono text-sm sm:text-base">
                  12/2025
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-[#A8C686]" />
                <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 text-[#A8C686]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verso do Cartão */}
        <motion.div
          className="absolute inset-0 rounded-2xl p-5 sm:p-6 overflow-hidden backface-hidden shadow-2xl"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #4A5A3A 0%, #3d4a30 50%, #2d3924 100%)"
          }}
        >
          {/* Tarja magnética */}
          <div className="absolute top-6 sm:top-8 left-0 right-0 h-8 sm:h-10 bg-[#1d1d1f]" />
          
          <div className="relative z-10 h-full flex flex-col justify-between pt-12 sm:pt-14">
            <div className="bg-white/90 p-2 sm:p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[8px] sm:text-[10px] text-[#86868b] uppercase">Plano</div>
                  <div className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">Plano Essencial</div>
                </div>
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-[#1d1d1f] rounded-lg flex items-center justify-center">
                  <QrCode className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-1 sm:space-y-2">
              <p className="text-white/70 text-[8px] sm:text-[10px] leading-relaxed px-2">
                Esta carteira é pessoal e intransferível. O uso indevido 
                está sujeito às penalidades previstas em lei.
              </p>
              <p className="text-white/50 text-[7px] sm:text-[9px]">
                www.abracanm.org.br
              </p>
            </div>

            <div className="flex justify-center">
              <div className="text-white/40 text-[7px] sm:text-[8px] tracking-wider">
                TOQUE PARA VIRAR
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <p className="text-center text-[#86868b] text-xs mt-3">
        Clique no cartão para ver o verso
      </p>
    </div>
  )
}
