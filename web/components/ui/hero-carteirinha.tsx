'use client'

import { ChevronLeft, Plus, User } from "lucide-react"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  return (
    <div className={cn("w-full max-w-[320px] sm:max-w-[380px]", className)}>
      <div 
        className="rounded-[24px] sm:rounded-[32px] overflow-hidden p-4 sm:p-6 pb-6 sm:pb-8"
        style={{ 
          background: "linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)",
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)"
        }}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-white text-base sm:text-lg font-bold">Sua Carteirinha</h1>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-400 flex items-center justify-center">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>

        <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">
          Sua carteirinha digital está pronta
        </p>

        <div className="relative">
          <div 
            className="absolute left-2 right-2 sm:left-3 sm:right-3 -top-1 h-6 sm:h-8 rounded-t-xl sm:rounded-t-2xl"
            style={{ background: "linear-gradient(180deg, #4CAF50 0%, #43A047 100%)" }}
          />
          
          <div 
            className="relative rounded-xl sm:rounded-2xl overflow-hidden mt-2 sm:mt-3 bg-white"
            style={{ boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-2.5 sm:p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-900/60 text-[8px] sm:text-[10px] uppercase tracking-widest font-medium">Associação Brasileira</p>
                  <p className="text-amber-900 text-xs sm:text-sm font-bold tracking-wide">ABRACANM</p>
                </div>
                <div className="flex -space-x-1.5 sm:-space-x-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/40" />
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/60" />
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-lg bg-gray-100 border-2 border-[#3FA174] flex items-center justify-center overflow-hidden">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-2 sm:mb-3">
                    <p className="text-gray-400 text-[8px] sm:text-[9px] uppercase tracking-wider">Nome</p>
                    <p className="text-[#1B4332] text-xs sm:text-sm font-bold truncate">SEU NOME AQUI</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2">
                    <div>
                      <p className="text-gray-400 text-[7px] sm:text-[8px] uppercase tracking-wider">Nº Registro</p>
                      <p className="text-[#1B4332] text-[10px] sm:text-xs font-semibold">ABR-00001</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[7px] sm:text-[8px] uppercase tracking-wider">Categoria</p>
                      <p className="text-[#3FA174] text-[10px] sm:text-xs font-bold">PREMIUM</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[7px] sm:text-[8px] uppercase tracking-wider">Nascimento</p>
                      <p className="text-[#1B4332] text-[10px] sm:text-xs font-semibold">01/01/1990</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[7px] sm:text-[8px] uppercase tracking-wider">Validade</p>
                      <p className="text-[#3FA174] text-[10px] sm:text-xs font-bold">12/2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
