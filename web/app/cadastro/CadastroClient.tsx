'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { API_URL, setToken } from '@/lib/auth';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const roles = [
  { value: 'PACIENTE', label: 'Paciente' },
  { value: 'PRESCRITOR', label: 'Prescritor' },
  { value: 'ADMIN', label: 'Admin (demo)' },
] as const;

export default function CadastroClient() {
  const [role, setRole] = useState<'PACIENTE' | 'PRESCRITOR' | 'ADMIN'>('PACIENTE');
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
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao cadastrar');
      }

      const data = await response.json();
      if (data.accessToken) {
        setToken(data.accessToken);
        setStatus('success');
        setMessage('Cadastro realizado. Redirecionando para o dashboard...');
        setTimeout(() => router.push('/dashboard'), 800);
        return;
      }

      setStatus('success');
      setMessage('Cadastro realizado com sucesso.');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao cadastrar';
      setStatus('error');
      setMessage(msg);
    }
  };

  return (
    <main className="min-h-screen bg-off-white px-4 sm:px-6 lg:px-8 py-16">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-verde-oliva font-medium mb-2">ABRACANM</p>
              <CardTitle className="text-2xl sm:text-3xl">Crie sua conta</CardTitle>
              <CardDescription>
                Cadastre-se como paciente ou prescritor para acessar a plataforma.
              </CardDescription>
            </div>
            <Link href="/" className="text-sm text-verde-oliva hover:underline">
              Voltar
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-cinza-escuro">
                Tipo de conta
              </label>
              <div className="flex flex-wrap gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      role === r.value
                        ? 'bg-verde-oliva text-white'
                        : 'bg-off-white border border-cinza-claro text-cinza-escuro hover:border-verde-oliva'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cinza-escuro">
                E-mail
              </label>
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
              <label className="text-sm font-medium text-cinza-escuro">
                Senha
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-cinza-claro px-4 py-2.5 text-cinza-escuro focus:outline-none focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva transition-all"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-sm text-cinza-medio">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-verde-oliva hover:underline font-medium">
                  Entrar
                </Link>
              </p>
              <Button
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  'Criar conta'
                )}
              </Button>
            </div>

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
