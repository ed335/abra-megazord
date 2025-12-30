'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setToken } from '@/lib/auth';
import { Loader2, Stethoscope, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import CannabisLeaf from '@/components/icons/CannabisLeaf';

export default function LoginMedicoClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Credenciais inválidas');
      }

      const data = await response.json();
      
      if (data.user?.role !== 'PRESCRITOR') {
        toast.error('Esta área é exclusiva para médicos prescritores');
        setLoading(false);
        return;
      }

      if (data.access_token) {
        setToken(data.access_token);
        toast.success('Bem-vindo(a), Dr(a)!');
        setTimeout(() => router.push('/medico'), 500);
      } else {
        toast.error('Erro ao obter token de acesso');
        setLoading(false);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Erro ao entrar';
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#F0F9FF] to-white flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-2">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
              <CannabisLeaf className="w-8 h-8 text-[#3FA174]" />
              <span className="text-xl font-bold text-gray-900">ABRACANM</span>
            </Link>
            
            <div className="mx-auto w-16 h-16 bg-[#3FA174]/10 rounded-full flex items-center justify-center mb-4">
              <Stethoscope className="w-8 h-8 text-[#3FA174]" />
            </div>
            
            <CardTitle className="text-2xl text-gray-900">Portal do Médico</CardTitle>
            <CardDescription className="text-gray-600">
              Acesse sua área exclusiva de prescritor
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">E-mail profissional</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dr.nome@email.com"
                  autoComplete="email"
                  className="h-12 border-gray-200 focus:border-[#3FA174] focus:ring-[#3FA174]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    autoComplete="current-password"
                    className="h-12 pr-12 border-gray-200 focus:border-[#3FA174] focus:ring-[#3FA174]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#3FA174] hover:bg-[#358c64] text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Entrar no Portal
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#3FA174]" />
                <span>Área restrita para médicos credenciados</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Deseja se credenciar?{' '}
                <Link 
                  href="/cadastro?tipo=medico" 
                  className="text-[#3FA174] hover:text-[#358c64] font-medium transition-colors"
                >
                  Solicitar credenciamento
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link 
                href="/login" 
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Sou paciente, ir para login de pacientes
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          Em caso de dúvidas, entre em contato com{' '}
          <a href="mailto:contato@abracanm.org.br" className="text-[#3FA174] hover:underline">
            contato@abracanm.org.br
          </a>
        </p>
      </motion.div>
    </main>
  );
}
