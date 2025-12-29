'use client'

import { useState } from "react"
import { Leaf, Wifi } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer w-full max-w-md", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[1.586/1] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente do Cartão - Estilo Apple Pay */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)"
          }}
        >
          {/* Brilho sutil no topo */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%)"
            }}
          />

          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#3FA174] flex items-center justify-center">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-base sm:text-lg tracking-tight">ABRACANM</div>
                  <div className="text-white/40 text-[10px] sm:text-xs tracking-wide">
                    Associado Verificado
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-white/60 rotate-90" />
              </div>
            </div>

            {/* Nome do Associado */}
            <div className="space-y-1">
              <div className="text-white font-medium text-xl sm:text-2xl tracking-tight">
                Seu Nome Aqui
              </div>
              <div className="text-white/40 text-xs sm:text-sm font-mono tracking-wider">
                ABR-2024-000000
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Válido até</div>
                <div className="text-white/80 text-sm sm:text-base font-medium">12/2025</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Plano</div>
                  <div className="text-[#3FA174] text-sm sm:text-base font-semibold">Premium</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chip NFC */}
          <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8">
            <div className="w-10 h-8 rounded-md bg-gradient-to-br from-[#D4AF37] to-[#B8860B] opacity-90" />
          </div>
        </motion.div>

        {/* Verso do Cartão */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden backface-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)"
          }}
        >
          {/* Tarja magnética */}
          <div className="absolute top-8 left-0 right-0 h-12 bg-[#2a2a2a]" />
          
          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between pt-24">
            {/* QR Code Area */}
            <div className="bg-white rounded-2xl p-4 self-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#0d0d0d] rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-5 gap-1">
                  {[...Array(25)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${
                        [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i) 
                          ? 'bg-white' 
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="text-center space-y-2">
              <p className="text-white/50 text-xs leading-relaxed">
                Carteira digital de associado ABRACANM
              </p>
              <p className="text-[#3FA174] text-sm font-medium">
                abracanm.org.br
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-center">
              <div className="text-white/30 text-[10px] tracking-widest uppercase">
                Toque para virar
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <p className="text-center text-gray-400 text-sm mt-4 font-medium">
        Clique no cartão para ver o verso
      </p>
    </div>
  )
}
