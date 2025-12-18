'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Copy, Check, Users, Scale, BookOpen, Server, ArrowLeft, Mail } from 'lucide-react';

const PIX_KEY = 'ouvidoria@abracanm.org.br';
const PIX_KEY_TYPE = 'E-mail';

export default function DoacoesPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const beneficios = [
    {
      icon: Users,
      title: 'Acolhimento',
      description: 'Suporte a novos pacientes em busca de tratamento',
    },
    {
      icon: Scale,
      title: 'Suporte Jurídico',
      description: 'Orientação legal para associados',
    },
    {
      icon: BookOpen,
      title: 'Educação',
      description: 'Conscientização sobre medicina canábica',
    },
    {
      icon: Server,
      title: 'Infraestrutura',
      description: 'Manutenção da plataforma e serviços',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-verde-oliva">
            ABRACANM
          </Link>
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm text-verde-oliva hover:text-verde-claro transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-verde-claro/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-verde-oliva" />
          </div>
          <h1 className="text-3xl font-bold text-cinza-escuro mb-3">
            Apoie a ABRACANM
          </h1>
          <p className="text-cinza-medio max-w-lg mx-auto">
            Sua doação ajuda a manter nosso trabalho de acolhimento e suporte a pacientes 
            que buscam qualidade de vida através da medicina canábica.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-cinza-escuro mb-2">
              Doe via PIX
            </h2>
            <p className="text-cinza-medio text-sm">
              Escaneie o QR Code ou copie a chave PIX abaixo
            </p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-off-white border border-cinza-claro rounded-xl p-4 mb-4">
              <div className="w-48 h-48 bg-cinza-muito-claro rounded-lg flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/qrcode-pix.png"
                  alt="QR Code PIX"
                  width={192}
                  height={192}
                  className="object-contain"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cinza-medio">
                  <div className="w-16 h-16 border-4 border-dashed border-cinza-claro rounded-lg mb-2"></div>
                  <span className="text-xs">QR Code PIX</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-cinza-medio">
              Aponte a câmera do seu celular para o QR Code
            </p>
          </div>

          <div className="border-t border-cinza-claro pt-6">
            <label className="block text-sm font-medium text-cinza-medio mb-2 text-center">
              Chave PIX ({PIX_KEY_TYPE})
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-off-white border border-cinza-claro rounded-lg px-4 py-3 text-center sm:text-left">
                <span className="text-cinza-escuro font-mono text-sm break-all">
                  {PIX_KEY}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-sucesso text-white'
                    : 'bg-verde-oliva text-white hover:bg-verde-claro'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-verde-claro/10 border border-verde-claro/30 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-verde-oliva mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Como sua doação ajuda
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {beneficios.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-verde-oliva/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-verde-oliva" />
                </div>
                <div>
                  <p className="font-medium text-cinza-escuro text-sm">{item.title}</p>
                  <p className="text-xs text-cinza-medio">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-cinza-medio">
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Dúvidas sobre doações?{' '}
            <a 
              href="mailto:ouvidoria@abracanm.org.br"
              className="text-verde-oliva hover:underline"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>

      <footer className="bg-cinza-escuro text-off-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-off-white/80 text-sm">
            ABRACANM - Associação Brasileira de Cannabis Medicinal
          </p>
          <p className="text-off-white/60 text-xs mt-2">
            Juntos pela qualidade de vida através da ciência
          </p>
        </div>
      </footer>
    </main>
  );
}
