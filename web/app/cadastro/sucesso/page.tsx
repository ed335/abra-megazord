'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function CadastroSucessoPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-sucesso/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-sucesso" />
          </div>
        </div>

        <p className="text-sm text-verde-oliva font-medium mb-2">ABRACANM</p>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro mb-4">
          Associado com Sucesso!
        </h1>
        
        <p className="text-cinza-medio mb-6 leading-relaxed">
          Bem-vindo(a) à ABRACANM! Seu cadastro foi realizado com sucesso. 
          Agora você faz parte de uma comunidade que busca qualidade de vida 
          através da medicina canábica.
        </p>

        <div className="bg-verde-claro/10 border border-verde-claro/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-verde-oliva font-medium">Próximos passos:</p>
          <ul className="text-sm text-cinza-escuro mt-2 space-y-1 text-left">
            <li>• Complete sua pré-anamnese no dashboard</li>
            <li>• Aguarde contato do nosso time de acolhimento</li>
            <li>• Agende sua consulta com um prescritor</li>
          </ul>
        </div>

        <p className="text-sm text-cinza-medio mb-4">
          Redirecionando para o dashboard em <span className="font-semibold text-verde-oliva">{countdown}</span> segundos...
        </p>

        <Button
          variant="primary"
          onClick={() => router.push('/dashboard')}
          className="w-full sm:w-auto"
        >
          Ir para o Dashboard
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </main>
  );
}
