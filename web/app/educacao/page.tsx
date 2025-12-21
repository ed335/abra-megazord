'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ExternalLink } from 'lucide-react';

export default function EducacaoPage() {
  const artigos = [
    {
      title: 'O que é Cannabis Medicinal?',
      description: 'Entenda os fundamentos científicos do uso terapêutico da cannabis.',
      category: 'Introdução',
      readTime: '5 min',
    },
    {
      title: 'Sistema Endocanabinoide',
      description: 'Como nosso corpo interage naturalmente com os canabinoides.',
      category: 'Ciência',
      readTime: '8 min',
    },
    {
      title: 'CBD vs THC: Diferenças e Aplicações',
      description: 'Conheça os principais compostos e suas indicações terapêuticas.',
      category: 'Tratamento',
      readTime: '6 min',
    },
    {
      title: 'Como Funciona a Prescrição no Brasil',
      description: 'Regulamentação da ANVISA e passos para obter seu tratamento.',
      category: 'Legislação',
      readTime: '7 min',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-verde-oliva">
            ABRACANM
          </Link>
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-verde-oliva hover:text-verde-claro transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-info" />
          </div>
          <h1 className="text-3xl font-bold text-cinza-escuro mb-3">
            Educação em Cannabis Medicinal
          </h1>
          <p className="text-cinza-medio max-w-lg mx-auto">
            Conteúdos baseados em ciência para ajudar você a entender melhor o tratamento.
          </p>
        </div>

        <div className="grid gap-4">
          {artigos.map((artigo, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm p-5 border border-cinza-claro hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs font-medium text-verde-oliva bg-verde-claro/20 px-2 py-1 rounded">
                    {artigo.category}
                  </span>
                  <h3 className="font-semibold text-cinza-escuro mt-2 mb-1">
                    {artigo.title}
                  </h3>
                  <p className="text-cinza-medio text-sm">
                    {artigo.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-cinza-medio">
                  <Clock className="w-3 h-3" />
                  {artigo.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-verde-claro/10 border border-verde-claro/30 rounded-xl p-6 text-center">
          <p className="text-cinza-medio text-sm mb-3">
            Novos conteúdos estão sendo preparados pela nossa equipe científica.
          </p>
          <a 
            href="https://www.instagram.com/abracann_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-verde-oliva font-medium text-sm hover:underline"
          >
            Siga-nos no Instagram para novidades
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </main>
  );
}
