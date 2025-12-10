'use client';

import { ShieldCheck, Stethoscope, Users } from 'lucide-react';

const personas = [
  {
    icon: ShieldCheck,
    title: 'Pacientes',
    bullets: [
      'Onboarding guiado e seguro (LGPD)',
      'Prescrições digitais e QR code sempre à mão',
      'Histórico e pedidos em um só lugar',
    ],
  },
  {
    icon: Stethoscope,
    title: 'Prescritores',
    bullets: [
      'Validação de CRM e assinatura digital',
      'Fluxo rápido para emitir prescrições',
      'Alertas de validade e acompanhamento do paciente',
    ],
  },
  {
    icon: Users,
    title: 'Clínicas & Admin',
    bullets: [
      'Governança, logs e trilhas de auditoria',
      'Políticas de acesso por perfil (RBAC)',
      'Compliance LGPD e gestão de consentimento',
    ],
  },
];

export default function PersonasSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cinza-muito-claro">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-verde-oliva uppercase tracking-wide">
            Para quem é
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-cinza-escuro mt-2">
            AbraCann para cada perfil
          </h2>
          <p className="text-lg text-cinza-medio mt-3">
            Fluxos pensados para pacientes, prescritores e equipes administrativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.title}
                className="h-full bg-white border border-cinza-claro rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-verde-claro/15 text-verde-oliva flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-cinza-escuro">
                    {persona.title}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-cinza-medio leading-relaxed">
                  {persona.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-verde-oliva mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
