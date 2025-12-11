'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cinza-escuro text-off-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand e descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://abracann.org.br/_next/image?url=%2Flogo-header.png&w=256&q=75"
                alt="AbraCann"
                width={120}
                height={32}
                className="object-contain h-8 w-auto"
              />
            </div>
            <p className="text-off-white/80 text-sm leading-relaxed">
              Associação Brasileira de Cannabis e Saúde – ABRACANN
            </p>
            <p className="text-off-white/70 text-sm leading-relaxed">
              CNPJ: 59.859.467/0001-34
            </p>
            <p className="text-off-white/70 text-sm leading-relaxed">
              Endereço: Quadra QS 1 Rua 212, SN Lote 19/23 Sala 2924, Edif Connect Towers, Areal (Águas Claras), Brasília – DF, 71950-550
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="font-semibold mb-2">Links</h4>
            <nav className="grid grid-cols-2 gap-2 text-sm text-off-white/80">
              <Link href="#" className="hover:text-off-white">Home</Link>
              <Link href="#" className="hover:text-off-white">Sobre</Link>
              <Link href="#" className="hover:text-off-white">Missão</Link>
              <Link href="#" className="hover:text-off-white">Projetos</Link>
              <Link href="#" className="hover:text-off-white">Contato</Link>
              <Link href="#" className="hover:text-off-white">Política de Privacidade</Link>
              <Link href="#" className="hover:text-off-white">Termos de Uso</Link>
            </nav>
          </div>

          {/* Contato e redes */}
          <div className="space-y-3">
            <h4 className="font-semibold mb-2">Contato</h4>
            <div className="space-y-2 text-sm text-off-white/80">
              <a href="tel:+556196084949" className="flex items-center gap-2 hover:text-off-white">
                <Phone className="w-4 h-4" />
                (61) 9608-4949
              </a>
              <a href="mailto:madeiracampos.joao@gmail.com" className="flex items-center gap-2 hover:text-off-white">
                <Mail className="w-4 h-4" />
                madeiracampos.joao@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Brasília – DF</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-off-white/80">
              <a
                href="https://www.instagram.com/abracann_/?hl=en&utm_source=chatgpt.com"
                className="inline-flex items-center gap-2 hover:text-off-white"
              >
                <Instagram className="w-4 h-4" />
                @abracann_
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-off-white/10 pt-6 text-sm text-off-white/70 flex flex-col sm:flex-row justify-between gap-4">
          <p>© 2025 Associação Brasileira de Cannabis e Saúde – ABRACANN. Todos os direitos reservados.</p>
          <p>Acesso seguro e responsável à cannabis medicinal.</p>
        </div>
      </div>
    </footer>
  );
}
