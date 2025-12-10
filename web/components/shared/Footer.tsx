'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cinza-escuro text-off-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🌿 AbraCann</h3>
            <p className="text-off-white/70 text-sm leading-relaxed">
              Acesso seguro e responsável à cannabis medicinal para pacientes, prescritores e educação.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <nav className="space-y-2 text-sm">
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Home
              </Link>
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Como Funciona
              </Link>
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Educação
              </Link>
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Blog
              </Link>
            </nav>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <nav className="space-y-2 text-sm">
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Sobre
              </Link>
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Compliance
              </Link>
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Carreiras
              </Link>
              <Link href="#" className="text-off-white/70 hover:text-off-white">
                Press
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contato@abracann.com"
                className="flex items-center gap-2 text-off-white/70 hover:text-off-white"
              >
                <Mail className="w-4 h-4" />
                contato@abracann.com
              </a>
              <a
                href="tel:+5511999999999"
                className="flex items-center gap-2 text-off-white/70 hover:text-off-white"
              >
                <Phone className="w-4 h-4" />
                (11) 99999-9999
              </a>
              <div className="flex items-center gap-2 text-off-white/70">
                <MapPin className="w-4 h-4" />
                São Paulo, SP
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-off-white/10 my-12" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-off-white/60">
          <p>&copy; 2025 AbraCann. Todos os direitos reservados.</p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-off-white">
              Privacidade
            </Link>
            <Link href="#" className="hover:text-off-white">
              Termos de Uso
            </Link>
            <Link href="#" className="hover:text-off-white">
              LGPD
            </Link>
            <Link href="#" className="hover:text-off-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
