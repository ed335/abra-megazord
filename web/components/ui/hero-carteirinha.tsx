'use client'

import { useState } from "react"
import { Leaf, ChevronLeft, User } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer w-full max-w-[320px] sm:max-w-[360px]", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[7/11] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente do Cartão */}
        <motion.div
          className="absolute inset-0 rounded-[28px] overflow-hidden backface-hidden bg-white"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)"
          }}
        >
          {/* Barra verde lateral */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#3FA174]" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pl-8">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-semibold uppercase tracking-widest">Minha Carteira</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#3FA174]" />
            </div>
          </div>

          {/* Foto do Associado */}
          <div className="flex justify-center mt-5 mb-5 pl-3">
            <div 
              className="w-[120px] h-[150px] sm:w-[140px] sm:h-[175px] bg-slate-100 rounded-[20px] overflow-hidden flex items-center justify-center border-2 border-slate-200"
              style={{ boxShadow: "0 12px 30px -8px rgba(0,0,0,0.15)" }}
            >
              <User className="w-14 h-14 text-slate-300" />
            </div>
          </div>

          {/* Nome */}
          <div className="text-center px-6 pl-8 mb-5">
            <h2 className="text-slate-900 text-xl sm:text-2xl tracking-tight">
              SEU <span className="font-black">NOME AQUI</span>
            </h2>
            <p className="text-[#3FA174] text-xs font-bold mt-1.5 uppercase tracking-[0.2em]">
              Associado Verificado
            </p>
          </div>

          {/* Dados e QR */}
          <div className="px-6 pl-8 flex gap-5">
            {/* Dados */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Registro</p>
                <p className="text-slate-900 font-bold text-sm">ABR-2024-0001</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Plano</p>
                <p className="text-slate-900 font-bold text-sm">Premium</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Validade</p>
                <p className="text-slate-900 font-bold text-sm">12/12/2025</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex-shrink-0">
              <div 
                className="w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] bg-[#3FA174] rounded-2xl p-2.5 flex items-center justify-center"
                style={{ boxShadow: "0 12px 24px -6px rgba(63,161,116,0.35)" }}
              >
                <div className="w-full h-full bg-white rounded-xl grid grid-cols-5 gap-0.5 p-1.5">
                  {[...Array(25)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-sm ${
                        [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i) 
                          ? 'bg-[#3FA174]' 
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-slate-400 text-[9px] font-medium mt-2 uppercase tracking-wider">
                Validar
              </p>
            </div>
          </div>

          {/* Assinatura */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pl-8">
            <div className="border-t border-slate-200 pt-3">
              <p className="text-slate-400 text-[9px] font-semibold uppercase tracking-widest mb-1">Assinatura</p>
              <div className="h-7 border-b border-dashed border-slate-200 flex items-end pb-1">
                <span className="text-slate-600 text-lg italic font-light">Seu Nome</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verso do Cartão */}
        <motion.div
          className="absolute inset-0 rounded-[28px] overflow-hidden backface-hidden bg-[#3FA174]"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 30px 60px -15px rgba(63, 161, 116, 0.4)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-center gap-2 pt-8 pb-4">
            <Leaf className="w-7 h-7 text-white" />
            <span className="text-white font-black text-xl tracking-tight">ABRACANM</span>
          </div>

          <p className="text-center text-white/60 text-[10px] uppercase tracking-[0.2em] mb-6">
            Associação Brasileira de Cannabis Medicinal
          </p>

          {/* Tarja */}
          <div className="h-12 bg-black/20 mb-8" />

          {/* QR Code Grande */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-36 h-36 bg-white rounded-2xl p-3 flex items-center justify-center"
              style={{ boxShadow: "0 15px 30px -10px rgba(0,0,0,0.2)" }}
            >
              <div className="w-full h-full bg-[#3FA174] rounded-xl grid grid-cols-7 gap-0.5 p-2">
                {[...Array(49)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`rounded-sm ${
                      [0,1,2,4,5,6,7,13,14,20,21,22,24,27,28,34,35,36,42,43,44,46,47,48].includes(i) 
                        ? 'bg-white' 
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="px-8 text-center space-y-3">
            <p className="text-white/70 text-xs leading-relaxed">
              Apresente este QR Code para validar sua associação em estabelecimentos parceiros.
            </p>
            <p className="text-white font-bold text-sm">
              abracanm.org.br
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 text-center">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-medium">
              Toque para virar
            </p>
          </div>
        </motion.div>
      </motion.div>
      
      <p className="text-center text-gray-400 text-sm mt-5 font-medium">
        Clique no cartão para ver o verso
      </p>
    </div>
  )
}
