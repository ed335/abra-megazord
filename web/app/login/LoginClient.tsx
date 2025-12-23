'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { setToken } from '@/lib/auth';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao entrar');
      }

      const data = await response.json();
      if (data.access_token) {
        setToken(data.access_token);
        setStatus('success');
        setMessage('Login realizado com sucesso. Redirecionando...');
        
        const redirectPath = data.user?.role === 'ADMIN' 
          ? '/admin' 
          : '/dashboard';
        
        setTimeout(() => router.push(redirectPath), 800);
      } else {
        setStatus('error');
        setMessage('Erro ao obter token de acesso');
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao entrar';
      setStatus('error');
      setMessage(msg);
    }
  };

  return (
    <main className="min-h-screen bg-off-white px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="text-sm text-verde-oliva font-medium mb-2 inline-block">
            ABRACANM
          </Link>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Acesse sua conta para continuar sua jornada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-cinza-escuro">E-mail</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all"
                placeholder="voce@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cinza-escuro">Senha</label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all"
                placeholder="Sua senha"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <p className="text-sm text-center text-cinza-medio">
              Ainda não tem conta?{' '}
              <Link href="/cadastro" className="text-verde-oliva hover:underline font-medium">
                Cadastre-se
              </Link>
            </p>

            {status === 'success' && (
              <Alert variant="success">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            {status === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
