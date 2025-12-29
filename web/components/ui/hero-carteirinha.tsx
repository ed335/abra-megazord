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
      className={cn("perspective-1000 cursor-pointer w-full max-w-xs sm:max-w-sm", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[7/11] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente do Cartão - ID Card Vertical */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden backface-hidden bg-[#3FA174]"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 25px 60px -15px rgba(63, 161, 116, 0.4)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5">
            <div className="flex items-center gap-1 text-white/80">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Minha Carteira</span>
            </div>
          </div>

          {/* Foto do Associado */}
          <div className="flex justify-center mt-4 mb-6">
            <div className="w-32 h-40 sm:w-36 sm:h-44 bg-black/20 rounded-2xl overflow-hidden flex items-center justify-center border-4 border-white/20">
              <User className="w-16 h-16 text-white/40" />
            </div>
          </div>

          {/* Nome e Tipo */}
          <div className="text-center px-5 mb-6">
            <h2 className="text-white text-xl sm:text-2xl font-light tracking-tight">
              SEU <span className="font-bold">NOME AQUI</span>
            </h2>
            <p className="text-white/70 text-sm font-medium mt-1 uppercase tracking-widest">
              Associado ABRACANM
            </p>
          </div>

          {/* Dados e QR Code */}
          <div className="px-5 flex gap-4">
            {/* Dados */}
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Registro</p>
                <p className="text-white font-bold text-sm">ABR-2024-0001</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Plano</p>
                <p className="text-white font-bold text-sm">Premium</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest">Validade</p>
                <p className="text-white font-bold text-sm">12 Dezembro 2025</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl p-2 flex items-center justify-center">
                <div className="w-full h-full bg-[#3FA174] rounded-lg grid grid-cols-5 gap-0.5 p-1">
                  {[...Array(25)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-sm ${
                        [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i) 
                          ? 'bg-white' 
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assinatura */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <div className="border-t border-white/20 pt-3">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Assinatura</p>
              <div className="h-8 flex items-end">
                <span className="text-white font-script text-lg italic opacity-70">Seu Nome</span>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="absolute top-5 right-5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Verso do Cartão */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden backface-hidden bg-[#2d8a62]"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 25px 60px -15px rgba(63, 161, 116, 0.4)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-4">
            <Leaf className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-lg tracking-tight">ABRACANM</span>
          </div>

          {/* Tarja */}
          <div className="h-10 bg-black/30 mb-6" />

          {/* QR Code Grande */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-white rounded-2xl p-3 flex items-center justify-center">
              <div className="w-full h-full bg-[#2d8a62] rounded-lg grid grid-cols-7 gap-0.5 p-2">
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

          {/* Texto Informativo */}
          <div className="px-6 text-center space-y-3">
            <p className="text-white/70 text-xs leading-relaxed">
              Esta carteira é pessoal e intransferível. 
              Apresente este QR Code para validar sua associação.
            </p>
            <p className="text-white font-semibold text-sm">
              abracanm.org.br
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
            <p className="text-white/30 text-[10px] uppercase tracking-widest">
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
