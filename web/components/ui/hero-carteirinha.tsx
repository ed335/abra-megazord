'use client'

import { User, ChevronRight, CreditCard, Wifi, Home, History, UserCircle, Check } from "lucide-react"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  return (
    <div className={cn("w-full max-w-[320px]", className)}>
      {/* iPhone Frame */}
      <div 
        className="rounded-[44px] overflow-hidden bg-white"
        style={{ 
          boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.2), inset 0 0 0 8px #1a1a1a"
        }}
      >
        {/* Header Verde */}
        <div 
          className="pt-6 pb-8 px-6"
          style={{ background: "linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)" }}
        >
          {/* Greeting Row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-white rotate-180" />
              <span className="text-white text-lg font-medium">Olá, Associado</span>
              <span className="text-[11px] bg-[#3FA174] text-white px-2.5 py-1 rounded-full font-bold">PLUS</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-rose-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white text-3xl font-bold">Ativo</span>
              <Check className="w-7 h-7 text-white" strokeWidth={3} />
            </div>
            <p className="text-white/60 text-sm">Seu status</p>
          </div>
        </div>

        {/* White Content Area */}
        <div className="bg-white rounded-t-[32px] -mt-5 pt-6 px-6 pb-6">
          {/* Cards Label */}
          <h3 className="text-gray-900 text-xl font-bold mb-4">Carteirinha</h3>

          {/* Green Card */}
          <div 
            className="relative rounded-2xl p-5 mb-5 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #3FA174 0%, #2D7A5A 100%)" }}
          >
            {/* Card Pattern */}
            <div className="absolute top-4 right-4 opacity-20">
              <div className="w-20 h-20 border-[3px] border-white rounded-full" />
              <div className="w-28 h-28 border-[3px] border-white rounded-full -mt-14 ml-6" />
            </div>

            {/* Chip + Wifi */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-8 bg-yellow-400 rounded-md" />
              <Wifi className="w-5 h-5 text-white/70 rotate-90" />
            </div>

            {/* Card Name */}
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Nome do Associado</p>
            <p className="text-white text-xl font-bold mb-5">SEU NOME AQUI</p>

            {/* Card Number + Arrow */}
            <div className="flex items-center justify-between">
              <p className="text-white font-mono text-base tracking-widest">**** **** **** 0001</p>
              <ChevronRight className="w-7 h-7 text-white" />
            </div>

            {/* Expiry */}
            <p className="text-white/50 text-sm text-right mt-1">12/25</p>
          </div>

          {/* Informações */}
          <h4 className="text-gray-900 text-lg font-bold mb-3">Informações</h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-800 text-base font-medium">Plano Premium</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-gray-800 text-base font-medium">Teleconsulta Ativa</span>
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="flex items-center justify-around pt-5 mt-5 border-t border-gray-100">
            <div className="flex flex-col items-center gap-1">
              <Home className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Home</span>
            </div>
            <div className="flex flex-col items-center gap-1 -mt-3">
              <div className="w-12 h-12 rounded-full bg-[#3FA174] flex items-center justify-center shadow-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-[#3FA174] font-bold">Cards</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <History className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">History</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <UserCircle className="w-6 h-6 text-gray-400" />
              <span className="text-xs text-gray-400">Profile</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
