'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { clearToken, getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Shield, User, Menu, X, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const navLinks = [
  { href: '/#como-funciona', label: 'Como funciona' },
  { href: '/#sobre', label: 'Sobre nós' },
  { href: '/planos', label: 'Planos' },
  { href: '/educacao', label: 'Educação' },
  { href: '/contato', label: 'Contato' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'abracann_token') {
        check();
      }
    };
    window.addEventListener('storage', onStorage);
    
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    setIsAuth(false);
    setIsAdmin(false);
    router.push('/login');
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cinza-claro" 
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                scrolled ? "bg-verde-oliva" : "bg-white/20 backdrop-blur"
              )}>
                <Heart className={cn(
                  "w-5 h-5",
                  scrolled ? "text-white" : "text-verde-oliva"
                )} />
              </div>
              <span className={cn(
                "text-xl font-bold transition-colors",
                scrolled ? "text-cinza-escuro" : "text-cinza-escuro"
              )}>
                ABRACANM
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-verde-oliva bg-verde-oliva/10"
                      : "text-cinza-medio hover:text-cinza-escuro hover:bg-off-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {isAuth ? (
                <>
                  {isAdmin && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5 border-dourado text-dourado hover:bg-dourado/10">
                        <Shield size={14} />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      Minha Área
                    </Button>
                  </Link>
                  <Link href="/perfil" className="hidden sm:flex">
                    <div className="w-9 h-9 bg-verde-oliva/10 rounded-full flex items-center justify-center hover:bg-verde-oliva/20 transition-colors">
                      <User size={18} className="text-verde-oliva" />
                    </div>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex">
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      Entrar
                    </Button>
                  </Link>
                  <Button size="sm" onClick={() => router.push('/cadastro')} className="hidden sm:flex">
                    Associe-se
                  </Button>
                </>
              )}

              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-cinza-claro">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-verde-oliva bg-verde-oliva/10"
                      : "text-cinza-medio hover:text-cinza-escuro hover:bg-off-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-cinza-claro pt-4 mt-4 space-y-2">
                {isAuth ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        Minha Área
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start gap-2 border-dourado text-dourado">
                          <Shield size={14} />
                          Painel Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" className="w-full justify-start" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">
                        Associe-se
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
      
      <div className="h-16 lg:h-20" />
    </>
  );
}
