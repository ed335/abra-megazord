'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './Button';
import { clearToken, getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const check = () => setIsAuth(!!getToken());
    check();
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'abracann_token') {
        check();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsAuth(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-cinza-claro">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-bold text-cinza-escuro">
            ABRACANM
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm text-cinza-medio">
            <Link href="/#como-funciona" className="hover:text-cinza-escuro">
              Como funciona
            </Link>
            <Link href="/#sobre" className="hover:text-cinza-escuro">
              Sobre nós
            </Link>
            <Link href="/contato" className="hover:text-cinza-escuro">
              Contato
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {isAuth ? (
            <>
              <Link href="/dashboard" className="hidden sm:inline text-sm text-cinza-escuro underline">
                Minha Área
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-cinza-escuro underline">
                Entrar
              </Link>
              <Button variant="primary" size="sm" onClick={() => router.push('/cadastro')}>
                Associe-se
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
