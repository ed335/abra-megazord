"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ClipboardList, Video, Leaf, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientFlowProps {
  className?: string;
}

const steps = [
  {
    id: 1,
    icon: FileText,
    title: "Cadastro",
    description: "Preencha seus dados pessoais e envie documentos de identificação",
    detail: "RG, CPF e comprovante de residência",
  },
  {
    id: 2,
    icon: ClipboardList,
    title: "Pré-anamnese",
    description: "Responda o questionário de saúde online com seu histórico médico",
    detail: "Condições, sintomas e tratamentos anteriores",
  },
  {
    id: 3,
    icon: Video,
    title: "Teleconsulta",
    description: "Consulta por vídeo com médico prescritor especializado",
    detail: "Duração média de 30 minutos",
  },
  {
    id: 4,
    icon: Leaf,
    title: "Tratamento",
    description: "Receba sua receita digital e inicie o tratamento",
    detail: "Acompanhamento contínuo incluso",
  },
];

export function PatientFlow({ className }: PatientFlowProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#6B7C59]/20 via-[#6B7C59] to-[#A8C686]/20 rounded-full" />
          
          {/* Animated Light */}
          <motion.div
            className="absolute top-[92px] h-3 w-16 rounded-full bg-gradient-to-r from-transparent via-[#A8C686] to-transparent blur-sm"
            animate={{ left: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center"
              >
                {/* Step Number & Icon */}
                <motion.div
                  className="relative z-10 mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Outer Ring */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#6B7C59]/20 to-[#A8C686]/20" />
                  
                  {/* Main Circle */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#6B7C59] to-[#4A5A3A] flex items-center justify-center shadow-lg shadow-[#6B7C59]/30">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-[#6B7C59] flex items-center justify-center">
                    <span className="text-sm font-bold text-[#6B7C59]">{step.id}</span>
                  </div>
                </motion.div>

                {/* Content Card */}
                <div className="text-center bg-white rounded-2xl p-5 border border-[#e5e5e5] shadow-sm hover:shadow-md hover:border-[#6B7C59]/30 transition-all w-full">
                  <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#86868b] mb-3 leading-relaxed">{step.description}</p>
                  <span className="inline-block text-xs font-medium text-[#6B7C59] bg-[#6B7C59]/10 px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>

                {/* Arrow to next step (except last) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-24 -right-3 z-20 hidden xl:block">
                    <ArrowRight className="w-6 h-6 text-[#6B7C59]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        <div className="relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6B7C59] via-[#A8C686] to-[#6B7C59]/20" />
          
          {/* Animated Light */}
          <motion.div
            className="absolute left-[11px] w-3 h-16 rounded-full bg-gradient-to-b from-transparent via-[#A8C686] to-transparent blur-sm"
            animate={{ top: ["0%", "85%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Marker */}
                <div className="absolute -left-8 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#6B7C59] to-[#4A5A3A] flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-white">{step.id}</span>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl p-5 border border-[#e5e5e5] shadow-sm ml-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#6B7C59]/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-[#6B7C59]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">{step.title}</h3>
                      <p className="text-sm text-[#86868b] mb-2">{step.description}</p>
                      <span className="inline-block text-xs font-medium text-[#6B7C59] bg-[#6B7C59]/10 px-2 py-0.5 rounded-full">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
