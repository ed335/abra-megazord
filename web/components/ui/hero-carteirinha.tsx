'use client'

import { useState } from "react"
import { ArrowLeft, User, CheckCircle2, Shield, Heart, Leaf } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer w-full max-w-[340px]", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[9/19] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente - iPhone Mockup Completo */}
        <motion.div
          className="absolute inset-0 rounded-[44px] overflow-hidden backface-hidden bg-white"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0,0,0,0.1)"
          }}
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
          
          {/* Status Bar */}
          <div className="flex items-center justify-between px-8 pt-4 pb-2">
            <span className="text-sm font-semibold text-black">11:35</span>
            <div className="w-28" /> {/* Space for notch */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-2">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-black" />
              <span className="text-lg font-semibold text-black">Minha Carteirinha</span>
            </div>
            <Shield className="w-5 h-5 text-[#3FA174]" />
          </div>

          {/* Hero Banner Verde */}
          <div className="mx-4 mt-2 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #3FA174 0%, #2D7A5A 100%)" }}>
            <div className="p-4 relative">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 right-4">
                  <Leaf className="w-16 h-16 text-white rotate-45" />
                </div>
                <div className="absolute bottom-2 left-4">
                  <Leaf className="w-12 h-12 text-white -rotate-12" />
                </div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-xs font-medium">ABRACANM</p>
                  <p className="text-white text-sm font-bold">Associado Verificado</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Principal */}
          <div className="mx-4 mt-4 bg-white rounded-2xl p-5 border border-gray-100" style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }}>
            {/* Foto + Info */}
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex items-center justify-center border-2 border-gray-200 flex-shrink-0">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#3FA174] fill-[#3FA174] stroke-white" />
                  <span className="text-[10px] font-bold text-[#3FA174] uppercase tracking-wide">Ativo</span>
                </div>
                <p className="text-base font-bold text-gray-900 leading-tight">Seu Nome</p>
                <p className="text-base font-bold text-gray-900 leading-tight mb-2">Completo Aqui</p>
                <p className="text-xs text-gray-500">Plano Premium</p>
              </div>
            </div>

            {/* Dados em Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Nº Associado</p>
                <p className="text-sm font-bold text-gray-900">ABR-00001</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Nascimento</p>
                <p className="text-sm font-bold text-gray-900">01/01/1990</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">CPF</p>
                <p className="text-sm font-bold text-gray-900">***.***.***-00</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">Validade</p>
                <p className="text-sm font-bold text-[#3FA174]">12/2025</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="p-3 bg-white border-2 border-gray-200 rounded-xl">
                <div className="w-20 h-20 grid grid-cols-8 gap-px">
                  {[...Array(64)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-sm ${
                        [0,1,2,5,6,7,8,15,16,23,24,31,32,39,40,47,48,55,56,57,58,61,62,63,
                         9,10,11,13,14,17,18,20,21,22,25,26,28,29,30,33,34,36,37,38,41,42,44,45,46,49,50,52,53,54].includes(i) 
                          ? 'bg-gray-900' 
                          : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mx-4 mt-3 mb-4">
            <div className="w-full py-3 rounded-xl bg-gray-100 flex items-center justify-center gap-2">
              <span className="text-xs font-medium text-gray-500">Toque para ver mais detalhes</span>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-32 h-1 bg-black rounded-full" />
          </div>
        </motion.div>

        {/* Verso */}
        <motion.div
          className="absolute inset-0 rounded-[44px] overflow-hidden backface-hidden bg-white"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0,0,0,0.1)"
          }}
        >
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
          
          {/* Status Bar */}
          <div className="flex items-center justify-between px-8 pt-4 pb-2">
            <span className="text-sm font-semibold text-black">11:35</span>
            <div className="w-28" />
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-2">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-black" />
              <span className="text-lg font-semibold text-black">Detalhes</span>
            </div>
          </div>

          {/* Benefícios */}
          <div className="mx-4 mt-2 p-4 rounded-2xl bg-gradient-to-br from-[#3FA174] to-[#2D7A5A]">
            <p className="text-white/80 text-xs font-medium mb-2">SEUS BENEFÍCIOS</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Consultas por telemedicina</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Prescrições digitais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Suporte 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Descontos em parceiros</span>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="mx-4 mt-4 p-4 rounded-2xl bg-white border border-gray-100" style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }}>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-3">INFORMAÇÕES COMPLETAS</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Nome Completo</span>
                <span className="text-sm font-semibold text-gray-900">Seu Nome Aqui</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">E-mail</span>
                <span className="text-sm font-semibold text-gray-900">seu@email.com</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Telefone</span>
                <span className="text-sm font-semibold text-gray-900">(11) 99999-9999</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-500">Desde</span>
                <span className="text-sm font-semibold text-[#3FA174]">Jan 2024</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mx-4 mt-4">
            <button className="w-full py-3.5 rounded-xl bg-[#3FA174] text-white font-semibold text-sm hover:bg-[#2D7A5A] transition-colors">
              Agendar Consulta
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-32 h-1 bg-black rounded-full" />
          </div>
        </motion.div>
      </motion.div>
      
      <p className="text-center text-gray-400 text-xs mt-4">
        Toque para virar
      </p>
    </div>
  )
}
