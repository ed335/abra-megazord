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
          
          {/* Main Card - Driver's License Style (Golden) */}
          <div 
            className="relative rounded-2xl overflow-hidden mt-3"
            style={{ 
              background: "linear-gradient(135deg, #E8B87D 0%, #D4A574 50%, #C4956A 100%)",
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Header do cartão */}
            <div className="bg-gradient-to-r from-amber-600/30 to-transparent p-4 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest">Associação Brasileira</p>
                  <p className="text-white text-sm font-bold tracking-wide">ABRACANM</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-white/40" />
                  <div className="w-7 h-7 rounded-full bg-white/60" />
                </div>
              </div>
            </div>

            {/* Corpo do cartão - Layout Driver's License */}
            <div className="p-4 pt-2">
              <div className="flex gap-4">
                {/* Foto do associado */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-20 h-24 rounded-lg bg-white/20 border-2 border-white/30 flex items-center justify-center overflow-hidden"
                    style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
                  >
                    <User className="w-10 h-10 text-white/50" />
                  </div>
                </div>

                {/* Dados do associado */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <p className="text-white/50 text-[9px] uppercase tracking-wider">Nome</p>
                    <p className="text-white text-sm font-bold truncate">SEU NOME AQUI</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    <div>
                      <p className="text-white/50 text-[8px] uppercase tracking-wider">Nº Registro</p>
                      <p className="text-white text-xs font-semibold">ABR-00001</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[8px] uppercase tracking-wider">Categoria</p>
                      <p className="text-white text-xs font-semibold">PREMIUM</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[8px] uppercase tracking-wider">Nascimento</p>
                      <p className="text-white text-xs font-semibold">01/01/1990</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[8px] uppercase tracking-wider">Validade</p>
                      <p className="text-white text-xs font-semibold">12/2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-3 flex items-center gap-2">
                <div className="px-3 py-1 bg-[#3FA174] rounded-full">
                  <span className="text-white text-[10px] font-bold uppercase tracking-wider">Ativo</span>
                </div>
                <span className="text-white/50 text-[10px]">Associado verificado</span>
              </div>
            </div>

            {/* Footer do cartão - Chip e Número */}
            <div className="px-4 pb-4 pt-2 flex items-center justify-between">
              {/* Chip */}
              <div 
                className="w-12 h-9 rounded-md flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FFE082 0%, #FFD54F 50%, #FFCA28 100%)" }}
              >
                <div className="grid grid-cols-4 gap-0.5 p-1.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-amber-700/40 rounded-[1px]" />
                  ))}
                </div>
              </div>

              {/* Número do cartão */}
              <div className="flex items-center gap-2">
                <span className="text-white/70 font-mono text-sm tracking-widest">
                  ••••  ••••  ••••
                </span>
                <span className="text-white font-mono text-sm font-bold">
                  0001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
