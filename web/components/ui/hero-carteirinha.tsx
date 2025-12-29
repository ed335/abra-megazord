'use client'

import { useState } from "react"
import { User, CheckCircle2, Shield, QrCode } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer w-full max-w-[280px]", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[9/16] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente - iPhone Mockup Compacto */}
        <motion.div
          className="absolute inset-0 rounded-[36px] overflow-hidden backface-hidden bg-white"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.25), 0 20px 40px -20px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0,0,0,0.08)"
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
          
          {/* Status Bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1">
            <span className="text-[11px] font-semibold text-black">11:35</span>
            <div className="w-20" />
            <div className="flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                <rect x="4" y="9" width="13" height="6" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Header Compacto */}
          <div className="flex items-center justify-between px-4 py-1.5">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#3FA174]" />
              <span className="text-sm font-bold text-black">ABRACANM</span>
            </div>
            <span className="text-[9px] text-gray-400">ID Digital</span>
          </div>

          {/* Banner Verde Compacto */}
          <div className="mx-3 mt-1.5 rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #3FA174 0%, #2D7A5A 100%)" }}>
            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-[9px] font-medium uppercase tracking-wider">Associado</p>
                <p className="text-white text-sm font-bold">Verificado ✓</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Card Principal Compacto */}
          <div className="mx-3 mt-2.5 bg-white rounded-xl p-3 border border-gray-100" style={{ boxShadow: "0 2px 12px -2px rgba(0,0,0,0.08)" }}>
            {/* Foto + Info */}
            <div className="flex gap-3 mb-3">
              <div className="w-14 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 flex-shrink-0">
                <User className="w-7 h-7 text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">Seu Nome Completo</p>
                <p className="text-[10px] text-gray-500 mb-1">Plano Premium</p>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 rounded">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3FA174]" />
                  <span className="text-[8px] font-bold text-[#3FA174] uppercase">Ativo</span>
                </div>
              </div>
            </div>

            {/* Grid de Dados */}
            <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-lg mb-3">
              <div>
                <p className="text-[8px] text-gray-400 uppercase">Nº Associado</p>
                <p className="text-[11px] font-bold text-gray-900">ABR-00001</p>
              </div>
              <div>
                <p className="text-[8px] text-gray-400 uppercase">Validade</p>
                <p className="text-[11px] font-bold text-[#3FA174]">12/2025</p>
              </div>
              <div>
                <p className="text-[8px] text-gray-400 uppercase">CPF</p>
                <p className="text-[11px] font-bold text-gray-900">***.***-00</p>
              </div>
              <div>
                <p className="text-[8px] text-gray-400 uppercase">Nascimento</p>
                <p className="text-[11px] font-bold text-gray-900">01/01/1990</p>
              </div>
            </div>

            {/* QR Code Compacto */}
            <div className="flex justify-center">
              <div className="p-2 bg-white border border-gray-200 rounded-lg">
                <div className="w-16 h-16 grid grid-cols-7 gap-px">
                  {[...Array(49)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-[1px] ${
                        [0,1,2,4,5,6,7,13,14,20,21,27,28,34,35,36,42,43,44,46,47,48,
                         9,10,11,16,17,18,22,24,26,30,31,32,38,40].includes(i) 
                          ? 'bg-gray-900' 
                          : 'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mx-3 mt-2 text-center">
            <p className="text-[9px] text-gray-400">Toque para ver benefícios</p>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
            <div className="w-24 h-1 bg-black rounded-full" />
          </div>
        </motion.div>

        {/* Verso */}
        <motion.div
          className="absolute inset-0 rounded-[36px] overflow-hidden backface-hidden bg-white"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.25), 0 20px 40px -20px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0,0,0,0.08)"
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
          
          {/* Status Bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1">
            <span className="text-[11px] font-semibold text-black">11:35</span>
            <div className="w-20" />
            <div className="flex items-center gap-0.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                <rect x="4" y="9" width="13" height="6" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-1.5">
            <span className="text-sm font-bold text-black">Benefícios</span>
            <QrCode className="w-4 h-4 text-gray-400" />
          </div>

          {/* Benefícios Card */}
          <div className="mx-3 mt-1.5 p-3 rounded-xl" style={{ background: "linear-gradient(135deg, #3FA174 0%, #2D7A5A 100%)" }}>
            <p className="text-white/70 text-[9px] font-medium uppercase tracking-wider mb-2">Inclusos no seu plano</p>
            <div className="space-y-1.5">
              {["Consultas telemedicina", "Prescrições digitais", "Suporte 24h", "Descontos parceiros"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white flex-shrink-0" />
                  <span className="text-white text-[11px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="mx-3 mt-2.5 p-3 rounded-xl bg-white border border-gray-100" style={{ boxShadow: "0 2px 12px -2px rgba(0,0,0,0.08)" }}>
            <div className="space-y-2">
              {[
                ["Nome", "Seu Nome Aqui"],
                ["E-mail", "seu@email.com"],
                ["Telefone", "(11) 99999-9999"],
                ["Membro desde", "Jan 2024"]
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                  <span className="text-[10px] text-gray-400">{label}</span>
                  <span className="text-[11px] font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mx-3 mt-2.5">
            <button className="w-full py-2.5 rounded-lg bg-[#3FA174] text-white font-semibold text-xs hover:bg-[#2D7A5A] transition-colors">
              Agendar Consulta
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
            <div className="w-24 h-1 bg-black rounded-full" />
          </div>
        </motion.div>
      </motion.div>
      
      <p className="text-center text-gray-400 text-[10px] mt-3">
        Toque para virar
      </p>
    </div>
  )
}
