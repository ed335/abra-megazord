'use client'

import { useState } from "react"
import { ArrowLeft, User, CheckCircle2, Wallet } from "lucide-react"
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
        className="relative w-full aspect-[9/16] preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Frente - Estilo Mockup iPhone */}
        <motion.div
          className="absolute inset-0 rounded-[40px] overflow-hidden backface-hidden bg-white border border-gray-200"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          }}
        >
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2">
            <span className="text-xs font-semibold text-black">11:35</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black/30" />
              </div>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                <rect x="20" y="10" width="2" height="4" rx="1" fill="currentColor"/>
                <rect x="4" y="9" width="12" height="6" rx="1" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3">
            <ArrowLeft className="w-5 h-5 text-black" />
            <span className="text-base font-medium text-black">ID</span>
          </div>

          {/* Card Content */}
          <div className="px-5 pt-2">
            {/* Card Container */}
            <div 
              className="bg-white rounded-2xl p-5 border border-gray-100"
              style={{ boxShadow: "0 4px 20px -4px rgba(0,0,0,0.08)" }}
            >
              {/* Foto */}
              <div className="flex justify-center mb-5">
                <div className="w-28 h-32 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200">
                  <User className="w-12 h-12 text-gray-300" />
                </div>
              </div>

              {/* Nome com Verificado */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <CheckCircle2 className="w-5 h-5 text-[#3FA174] fill-[#3FA174] stroke-white" />
                <span className="text-lg font-semibold text-gray-900">Seu Nome Aqui</span>
              </div>

              {/* Dados em Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">ID number</p>
                  <p className="text-sm font-semibold text-gray-900">ABR00001</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Birth date</p>
                  <p className="text-sm font-semibold text-gray-900">01/01/1990</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Plan</p>
                  <p className="text-sm font-semibold text-gray-900">PREMIUM</p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 mb-0.5">Expiration date</p>
                  <p className="text-sm font-semibold text-gray-900">12/12/2025</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-white p-2 border border-gray-200 rounded-lg">
                  <div className="w-full h-full grid grid-cols-7 gap-px">
                    {[...Array(49)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`${
                          [0,1,2,4,5,6,7,13,14,20,21,27,28,34,35,36,42,43,44,46,47,48,
                           8,9,10,12,16,17,18,22,24,26,30,31,32,38,40].includes(i) 
                            ? 'bg-gray-900' 
                            : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-32 h-1 bg-black rounded-full" />
          </div>
        </motion.div>

        {/* Verso */}
        <motion.div
          className="absolute inset-0 rounded-[40px] overflow-hidden backface-hidden bg-white border border-gray-200"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          }}
        >
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2">
            <span className="text-xs font-semibold text-black">11:35</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black" />
                <div className="w-1 h-1 rounded-full bg-black/30" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3">
            <ArrowLeft className="w-5 h-5 text-black" />
            <span className="text-base font-medium text-black">ID</span>
          </div>

          {/* Card Content - Layout 2 */}
          <div className="px-5 pt-2">
            <div 
              className="bg-white rounded-2xl p-5 border border-gray-100"
              style={{ boxShadow: "0 4px 20px -4px rgba(0,0,0,0.08)" }}
            >
              {/* Foto + QR lado a lado */}
              <div className="flex gap-4 mb-4">
                <div className="w-24 h-28 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200 flex-shrink-0">
                  <User className="w-10 h-10 text-gray-300" />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white p-1 border border-gray-200 rounded-lg mb-1">
                    <div className="w-full h-full grid grid-cols-5 gap-px">
                      {[...Array(25)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`${
                            [0,1,2,4,5,6,10,12,14,18,19,20,22,23,24].includes(i) 
                              ? 'bg-gray-900' 
                              : 'bg-white'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3FA174] fill-[#3FA174] stroke-white" />
                    <span className="text-[10px] font-semibold text-[#3FA174] uppercase">Valid</span>
                  </div>
                </div>
              </div>

              {/* Dados em Grid 2 colunas */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Name</p>
                  <p className="text-sm font-semibold text-gray-900">Seu</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">ID number</p>
                  <p className="text-sm font-semibold text-gray-900">ABR00001</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Last name</p>
                  <p className="text-sm font-semibold text-gray-900">Nome</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Nationality</p>
                  <p className="text-sm font-semibold text-gray-900">BRAZILIAN</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Birth date</p>
                  <p className="text-sm font-semibold text-gray-900">01.01.1990</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Expiration date</p>
                  <p className="text-sm font-semibold text-gray-900">12.12.2025</p>
                </div>
              </div>
            </div>

            {/* Add to Wallet Button */}
            <button className="w-full mt-4 py-3 px-4 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Wallet className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Add to wallet</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <div className="w-32 h-1 bg-black rounded-full" />
          </div>
        </motion.div>
      </motion.div>
      
      <p className="text-center text-gray-400 text-sm mt-5 font-medium">
        Clique para ver outro layout
      </p>
    </div>
  )
}
