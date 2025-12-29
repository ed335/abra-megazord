'use client'

import { ChevronLeft, Plus, User } from "lucide-react"
import { cn } from '@/lib/utils'

interface HeroCarteirinhaProps {
  className?: string
}

export function HeroCarteirinha({ className }: HeroCarteirinhaProps) {
  return (
    <div className={cn("w-full max-w-[380px]", className)}>
      {/* Container com fundo verde */}
      <div 
        className="rounded-[32px] overflow-hidden p-6 pb-8"
        style={{ 
          background: "linear-gradient(180deg, #1B4332 0%, #2D6A4F 100%)",
          boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white text-lg font-bold">Sua Carteirinha</h1>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Message */}
        <p className="text-white/80 text-base mb-6">
          Sua carteirinha digital está pronta
        </p>

        {/* Cards Stack Effect */}
        <div className="relative">
          {/* Back Card (Green) - parcialmente visível */}
          <div 
            className="absolute left-3 right-3 -top-1 h-8 rounded-t-2xl"
            style={{ background: "linear-gradient(180deg, #4CAF50 0%, #43A047 100%)" }}
          />
          
          {/* Main Card - Driver's License Style (WHITE) */}
          <div 
            className="relative rounded-2xl overflow-hidden mt-3 bg-white"
            style={{ 
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Header do cartão - Faixa amarela */}
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-900/60 text-[10px] uppercase tracking-widest font-medium">Associação Brasileira</p>
                  <p className="text-amber-900 text-sm font-bold tracking-wide">ABRACANM</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-white/40" />
                  <div className="w-6 h-6 rounded-full bg-white/60" />
                </div>
              </div>
            </div>

            {/* Corpo do cartão - Layout Driver's License */}
            <div className="p-4">
              <div className="flex gap-4">
                {/* Foto do associado */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-20 h-24 rounded-lg bg-gray-100 border-2 border-[#3FA174] flex items-center justify-center overflow-hidden"
                  >
                    <User className="w-10 h-10 text-gray-300" />
                  </div>
                </div>

                {/* Dados do associado */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <p className="text-gray-400 text-[9px] uppercase tracking-wider">Nome</p>
                    <p className="text-[#1B4332] text-sm font-bold truncate">SEU NOME AQUI</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase tracking-wider">Nº Registro</p>
                      <p className="text-[#1B4332] text-xs font-semibold">ABR-00001</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase tracking-wider">Categoria</p>
                      <p className="text-[#3FA174] text-xs font-bold">PREMIUM</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase tracking-wider">Nascimento</p>
                      <p className="text-[#1B4332] text-xs font-semibold">01/01/1990</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase tracking-wider">Validade</p>
                      <p className="text-[#3FA174] text-xs font-bold">12/2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3 flex items-center gap-2">
                <div className="px-3 py-1 bg-[#3FA174] rounded-full">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">Ativo</span>
                </div>
                <span className="text-gray-400 text-[10px]">Associado verificado</span>
              </div>
            </div>

            {/* Footer - Código de Barras */}
            <div className="px-4 pb-4 pt-2">
              {/* Barcode */}
              <div className="flex items-end justify-center gap-[2px] h-12">
                {[3,1,2,1,3,2,1,1,2,3,1,2,1,1,3,2,1,2,1,3,1,1,2,1,3,2,1,1,2,3,1,2,1,1,3,2,1,2,1,3,1,1,2,1,3].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-[#1B4332]" 
                    style={{ 
                      width: i % 3 === 0 ? '2px' : '1px',
                      height: `${h * 12}px`
                    }} 
                  />
                ))}
              </div>
              <p className="text-center text-[#1B4332] text-[10px] font-mono mt-1 tracking-widest">
                ABR 0001 2024 00001
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
