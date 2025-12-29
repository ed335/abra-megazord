'use client'

import { useState } from "react"
import { User, ChevronRight, CreditCard, Wifi, Home, History, UserCircle } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={cn("perspective-1000 cursor-pointer w-full max-w-[300px]", className)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full aspect-[9/18] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente - Cards Screen */}
        <motion.div
          className="absolute inset-0 rounded-[40px] overflow-hidden backface-hidden bg-gray-100"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.3), 0 30px 60px -30px rgba(0, 0, 0, 0.25)"
          }}
        >
          {/* Header Verde */}
          <div 
            className="pt-8 pb-6 px-5"
            style={{ background: "linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)" }}
          >
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-xs font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                  <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Greeting */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-white rotate-180" />
                <span className="text-white text-base font-medium">Olá, Associado</span>
                <span className="text-[10px] bg-[#3FA174] text-white px-2 py-0.5 rounded-full font-bold">PLUS</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Balance */}
            <div>
              <p className="text-white text-3xl font-bold">Ativo ✓</p>
              <p className="text-white/60 text-xs">Seu status</p>
            </div>
          </div>

          {/* White Content Area */}
          <div className="bg-white rounded-t-[28px] -mt-4 pt-5 px-5 pb-4 h-full">
            {/* Cards Label */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-lg font-bold">Carteirinha</h3>
            </div>

            {/* Green Card */}
            <div 
              className="relative rounded-2xl p-5 mb-5 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #3FA174 0%, #2D7A5A 100%)" }}
            >
              {/* Card Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white rounded-full" />
                <div className="absolute top-8 right-8 w-24 h-24 border-4 border-white rounded-full" />
              </div>

              {/* Chip + Wifi */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-7 bg-yellow-400/80 rounded-md" />
                <Wifi className="w-5 h-5 text-white/80 rotate-90" />
              </div>

              {/* Card Name */}
              <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Nome do Associado</p>
              <p className="text-white text-lg font-bold mb-4">SEU NOME AQUI</p>

              {/* Card Number */}
              <div className="flex items-center justify-between">
                <p className="text-white font-mono text-sm tracking-widest">**** **** **** 0001</p>
                <ChevronRight className="w-6 h-6 text-white" />
              </div>

              {/* Expiry */}
              <p className="text-white/60 text-xs text-right mt-1">12/25</p>
            </div>

            {/* Card Info */}
            <div className="mb-4">
              <h4 className="text-gray-900 font-bold mb-3">Informações</h4>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Plano Premium</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Wifi className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm">Teleconsulta Ativa</span>
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center justify-around pt-3 border-t border-gray-100">
              <div className="flex flex-col items-center gap-1">
                <Home className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-400">Home</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-[#3FA174] flex items-center justify-center -mt-4">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] text-[#3FA174] font-bold">Cards</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <History className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-400">History</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <UserCircle className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-400">Profile</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verso - History Screen */}
        <motion.div
          className="absolute inset-0 rounded-[40px] overflow-hidden backface-hidden bg-gray-100"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.3), 0 30px 60px -30px rgba(0, 0, 0, 0.25)"
          }}
        >
          {/* Header Verde */}
          <div 
            className="pt-8 pb-6 px-5"
            style={{ background: "linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)" }}
          >
            {/* Status Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-xs font-medium">9:41</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                  <rect x="4" y="9" width="14" height="6" rx="1" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Greeting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-white rotate-180" />
                <span className="text-white text-base font-medium">Olá, Associado</span>
                <span className="text-[10px] bg-[#3FA174] text-white px-2 py-0.5 rounded-full font-bold">PLUS</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* White Content Area */}
          <div className="bg-white rounded-t-[28px] -mt-4 pt-5 px-5 pb-4 h-full">
            {/* Transactions Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-lg font-bold">Consultas</h3>
              <span className="text-xs text-gray-400">Ordenar por <span className="text-gray-900 font-medium">Data</span></span>
            </div>

            {/* Today */}
            <p className="text-gray-400 text-xs mb-2">Hoje</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-gray-900 text-sm font-medium">Dr. Maria Silva</p>
                  <p className="text-gray-400 text-xs">Teleconsulta</p>
                </div>
                <span className="text-[#3FA174] text-sm font-bold">Confirmada</span>
              </div>
            </div>

            {/* December */}
            <p className="text-gray-400 text-xs mb-2">20 Dez 2024</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-gray-900 text-sm font-medium">Prescrição</p>
                  <p className="text-gray-400 text-xs">Receita digital</p>
                </div>
                <span className="text-blue-500 text-sm font-bold">Emitida</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-gray-900 text-sm font-medium">Dr. João Santos</p>
                  <p className="text-gray-400 text-xs">Teleconsulta</p>
                </div>
                <span className="text-gray-500 text-sm font-bold">Concluída</span>
              </div>
            </div>

            {/* November */}
            <p className="text-gray-400 text-xs mb-2">19 Nov 2024</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-gray-900 text-sm font-medium">Pagamento</p>
                  <p className="text-gray-400 text-xs">Plano Premium</p>
                </div>
                <span className="text-[#3FA174] text-sm font-bold">+R$149,00</span>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center justify-around pt-4 mt-4 border-t border-gray-100">
              <div className="flex flex-col items-center gap-1">
                <Home className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-400">Home</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-400">Cards</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-[#3FA174] flex items-center justify-center -mt-4">
                  <History className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] text-[#3FA174] font-bold">History</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <UserCircle className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-400">Profile</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <p className="text-center text-gray-400 text-[10px] mt-3">
        Toque para virar
      </p>
    </div>
  )
}
