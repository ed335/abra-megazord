'use client'

import { ChevronLeft, CreditCard, Wifi, Home, History, UserCircle, Plus } from "lucide-react"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  return (
    <div className={cn("w-full max-w-[320px]", className)}>
      {/* iPhone Frame */}
      <div 
        className="rounded-[44px] overflow-hidden"
        style={{ 
          background: "linear-gradient(180deg, #1B4332 0%, #2D6A4F 50%, #3FA174 100%)",
          boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.2)"
        }}
      >
        {/* Header Verde Escuro */}
        <div className="pt-6 pb-4 px-5">
          {/* Back + Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white text-xl font-bold">Sua Carteirinha</h1>
          </div>

          {/* Message + Add Button */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/90 text-lg leading-snug">
                Sua carteirinha foi
              </p>
              <p className="text-white/90 text-lg leading-snug">
                adicionada com sucesso
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Cards Stack */}
        <div className="relative px-5 pb-4">
          {/* Back Card (Green) */}
          <div 
            className="absolute left-8 right-8 top-2 h-16 rounded-t-2xl"
            style={{ background: "#4CAF50" }}
          />
          
          {/* Front Card (Golden/Orange) */}
          <div 
            className="relative rounded-2xl p-5 mt-6"
            style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8963A 100%)" }}
          >
            {/* Balance */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/70 text-sm mb-1">Status</p>
                <p className="text-white text-3xl font-bold italic">Ativo</p>
              </div>
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-white/30" />
                <div className="w-10 h-10 rounded-full bg-white/50" />
              </div>
            </div>

            {/* Card Number */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-9 bg-yellow-200/50 rounded-md flex items-center justify-center">
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1 bg-yellow-700/40 rounded-sm" />
                  ))}
                </div>
              </div>
              <p className="text-white font-mono text-lg tracking-widest">
                ••••  ••••  ••••  0001
              </p>
            </div>
          </div>
        </div>

        {/* White Content Area */}
        <div className="bg-white rounded-t-[32px] pt-6 px-6 pb-5 -mt-2">
          {/* Green Card Preview */}
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-8 bg-yellow-400 rounded-md" />
              <Wifi className="w-5 h-5 text-white/70 rotate-90" />
            </div>

            {/* Card Name */}
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Nome do Associado</p>
            <p className="text-white text-xl font-bold mb-4">SEU NOME AQUI</p>

            {/* Card Number */}
            <p className="text-white font-mono text-base tracking-widest">**** **** **** 0001</p>
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
