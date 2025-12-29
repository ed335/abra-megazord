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
          {/* Back Card (Green) - just visual accent */}
          <div 
            className="absolute left-8 right-8 top-2 h-12 rounded-t-2xl"
            style={{ background: "#4CAF50" }}
          />
          
          {/* Main Premium Card (Golden/Orange) - ABRACANM Member Card */}
          <div 
            className="relative rounded-2xl p-5 mt-4 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #D4A574 0%, #C4956A 50%, #B8895E 100%)" }}
          >
            {/* Pattern decorativo */}
            <div className="absolute top-0 right-0 opacity-30">
              <div className="absolute top-6 right-6 w-16 h-16 border-[3px] border-white/50 rounded-full" />
              <div className="absolute top-10 right-2 w-20 h-20 border-[3px] border-white/50 rounded-full" />
            </div>

            {/* Logo + Status */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider mb-1">ABRACANM</p>
                <p className="text-white text-2xl font-bold italic">Ativo</p>
              </div>
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-white/40" />
                <div className="w-9 h-9 rounded-full bg-white/60" />
              </div>
            </div>

            {/* Member Name */}
            <p className="text-white/70 text-xs uppercase tracking-wider mb-1">Associado Premium</p>
            <p className="text-white text-lg font-bold mb-6">SEU NOME AQUI</p>

            {/* Card Number + Chip */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-yellow-300/60 rounded-md flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1 bg-yellow-700/50 rounded-sm" />
                    ))}
                  </div>
                </div>
                <Wifi className="w-4 h-4 text-white/60 rotate-90" />
              </div>
              <p className="text-white/80 font-mono text-sm tracking-wider">
                **** 0001
              </p>
            </div>

            {/* Validity */}
            <p className="text-white/50 text-xs text-right mt-2">Válido até 12/25</p>
          </div>
        </div>

        {/* White Content Area */}
        <div className="bg-white rounded-t-[32px] pt-6 px-6 pb-5">
          {/* Informações */}
          <h4 className="text-gray-900 text-lg font-bold mb-3">Informações</h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-amber-600" />
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
