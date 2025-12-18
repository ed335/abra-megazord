'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-green-800">
            ABRACANM
          </Link>
          <Link 
            href="/dashboard"
            className="text-sm text-green-700 hover:text-green-800 transition"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">💚</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Apoie a ABRACANM
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Sua doação ajuda a manter nosso trabalho de acolhimento e suporte a pacientes 
            que buscam qualidade de vida através da medicina canábica.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Doe via PIX
            </h2>
            <p className="text-gray-500 text-sm">
              Escaneie o QR Code ou copie a chave PIX abaixo
            </p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-white border-2 border-gray-100 rounded-xl p-4 mb-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
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
                    target.parentElement!.innerHTML = `
                      <div class="text-center p-4">
                        <span class="text-4xl mb-2 block">📱</span>
                        <span class="text-gray-500 text-sm">QR Code</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Aponte a câmera do seu celular para o QR Code
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <label className="block text-sm font-medium text-gray-600 mb-2 text-center">
              Chave PIX ({PIX_KEY_TYPE})
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-center sm:text-left">
                <span className="text-gray-800 font-mono text-sm break-all">
                  {PIX_KEY}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                {copied ? (
                  <>
                    <span>✓</span>
                    Copiado!
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <span>🌱</span>
            Como sua doação ajuda
          </h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Acolhimento de novos pacientes em busca de tratamento
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Suporte jurídico e orientação para associados
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Educação e conscientização sobre medicina canábica
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Manutenção da plataforma e serviços digitais
            </li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Dúvidas sobre doações?{' '}
            <a 
              href="mailto:ouvidoria@abracanm.org.br"
              className="text-green-700 hover:underline"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>

      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-green-200 text-sm">
            ABRACANM - Associação Brasileira de Cannabis Medicinal
          </p>
          <p className="text-green-300 text-xs mt-2">
            Juntos pela qualidade de vida através da ciência
          </p>
        </div>
      </footer>
    </main>
  );
}
