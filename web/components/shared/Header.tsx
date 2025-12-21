'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from './Button';
import { clearToken, getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Shield, User } from 'lucide-react';

function parseJwt(token: string): { role?: string } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = () => {
      const token = getToken();
      setIsAuth(!!token);
      if (token) {
        const payload = parseJwt(token);
        setIsAdmin(payload?.role === 'ADMIN');
      } else {
        setIsAdmin(false);
      }
    };
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
    setIsAdmin(false);
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
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
                >
                  <Shield size={14} />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              )}
              <Link href="/dashboard" className="hidden sm:inline text-sm text-cinza-escuro underline">
                Minha Area
              </Link>
              <Link 
                href="/perfil" 
                className="inline-flex items-center gap-1 px-2 py-1.5 text-cinza-medio hover:text-cinza-escuro transition-colors"
                title="Meu Perfil"
              >
                <User size={18} />
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
