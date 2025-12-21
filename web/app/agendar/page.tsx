'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import { getToken } from '@/lib/auth';
import { Calendar, Clock, Video, MapPin, ArrowLeft, Phone } from 'lucide-react';

export default function AgendarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-verde-oliva"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-sm text-cinza-medio hover:text-verde-oliva transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro mb-2">
            Agendar Consulta
          </h1>
          <p className="text-cinza-medio">
            Escolha a modalidade de atendimento que prefere
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-6 border-2 border-verde-oliva rounded-xl bg-verde-claro/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-verde-oliva/10 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-verde-oliva" />
              </div>
              <div>
                <h2 className="font-semibold text-cinza-escuro">Teleconsulta</h2>
                <p className="text-sm text-cinza-medio">Atendimento online</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-cinza-escuro">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-verde-oliva" />
                Consultas de 30-60 minutos
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-verde-oliva" />
                Horários flexíveis
              </li>
            </ul>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma teleconsulta com a ABRACANM."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-verde-oliva text-white rounded-lg font-medium hover:bg-verde-oliva/90 transition"
            >
              <Phone className="w-5 h-5" />
              Agendar via WhatsApp
            </a>
          </div>

          <div className="p-6 border border-cinza-claro rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-cinza-muito-claro rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-cinza-medio" />
              </div>
              <div>
                <h2 className="font-semibold text-cinza-escuro">Presencial</h2>
                <p className="text-sm text-cinza-medio">Em uma clínica parceira</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4 text-sm text-cinza-escuro">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cinza-medio" />
                Consultas de 45-90 minutos
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cinza-medio" />
                Conforme disponibilidade local
              </li>
            </ul>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta presencial com a ABRACANM."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-cinza-claro text-cinza-escuro rounded-lg font-medium hover:border-verde-oliva hover:text-verde-oliva transition"
            >
              <Phone className="w-5 h-5" />
              Solicitar Agendamento
            </a>
          </div>
        </div>

        <div className="p-4 bg-cinza-muito-claro/50 rounded-xl text-center">
          <p className="text-sm text-cinza-medio">
            Dúvidas? Entre em contato pelo email{' '}
            <a href="mailto:ouvidoria@abracanm.org.br" className="text-verde-oliva underline">
              ouvidoria@abracanm.org.br
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
