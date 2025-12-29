'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import AppLayout from '@/components/layout/AppLayout';
import { CarteirinhaAssociado } from '@/components/ui/carteirinha-associado';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UserData {
  id: string;
  email: string;
  nome: string;
  cpf?: string;
  matricula?: string;
  plano?: string;
  validade?: string;
  foto?: string;
  status?: 'ativo' | 'pendente' | 'inativo';
}

function CarteirinhaSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export default function CarteirinhaPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Sessão inválida');
        return res.json();
      })
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Carteirinha ABRACANM',
        text: `Sou associado da ABRACANM - Associação Brasileira de Cannabis Medicinal`,
      });
    } catch {
      toast.info('Compartilhamento não disponível neste dispositivo');
    }
  };

  if (loading) {
    return (
      <AppLayout title="Minha Carteirinha">
        <CarteirinhaSkeleton />
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout title="Minha Carteirinha">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-[#1d1d1f] font-medium mb-1">Erro ao carregar</p>
          <p className="text-[#86868b] text-sm mb-4">Não foi possível carregar sua carteirinha</p>
          <Button onClick={() => router.push('/login')}>Fazer login</Button>
        </div>
      </AppLayout>
    );
  }

  const associadoData = {
    nome: user.nome || 'Associado ABRACANM',
    matricula: user.matricula || `ABR${user.id?.slice(0, 6).toUpperCase() || '000000'}`,
    cpf: user.cpf,
    plano: user.plano || 'Plano Essencial',
    validade: user.validade || '12/2025',
    foto: user.foto,
    status: (user.status || 'ativo') as 'ativo' | 'pendente' | 'inativo',
  };

  return (
    <AppLayout title="Minha Carteirinha">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#1d1d1f]">Minha Carteirinha</h1>
            <p className="text-sm text-[#86868b]">Documento de identificação ABRACANM</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>
          </div>
        </div>

        <CarteirinhaAssociado associado={associadoData} />

        <div className="bg-[#fafaf8] rounded-xl p-4 border border-[#e5e5e5]">
          <h3 className="font-medium text-[#1d1d1f] mb-2">Sobre sua carteirinha</h3>
          <p className="text-sm text-[#86868b]">
            A carteirinha digital da ABRACANM é seu documento de identificação como associado. 
            Ela pode ser apresentada em farmácias, clínicas e órgãos de fiscalização para 
            comprovar sua condição de paciente em tratamento com cannabis medicinal.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
