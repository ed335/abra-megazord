'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { 
  Users, 
  UserPlus, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Activity,
  ChevronRight,
  BarChart3,
  ClipboardList,
  MessageCircle,
  Calendar
} from 'lucide-react';

type Stats = {
  resumo: {
    total: number;
    ativos: number;
    inativos: number;
    novosEsteMes: number;
    novosMesPassado: number;
    crescimento: number;
    comAnamnese: number;
    semAnamnese: number;
  };
  porEstado: { estado: string; total: number }[];
  porPatologia: { patologia: string; total: number }[];
  cadastrosPorMes: { mes: string; total: number }[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchStats = useCallback(async () => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao carregar estatísticas');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatMonth = (mesStr: string) => {
    const [year, month] = mesStr.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-cinza-claro rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-cinza-claro rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-erro/10 border border-erro/30 rounded-lg p-4 text-erro">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!stats) return null;

  const maxCadastro = Math.max(...stats.cadastrosPorMes.map(c => c.total), 1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-1">Painel Administrativo</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro">
              Dashboard
            </h1>
          </div>
          <Link 
            href="/admin/associados"
            className="inline-flex items-center gap-2 px-4 py-2 bg-verde-oliva text-white rounded-lg hover:bg-verde-oliva/90 transition-colors text-sm font-medium"
          >
            <Users size={16} />
            Ver Associados
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-cinza-claro rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cinza-medio text-sm">Total de Associados</span>
              <div className="w-10 h-10 bg-verde-oliva/10 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-verde-oliva" />
              </div>
            </div>
            <p className="text-3xl font-bold text-cinza-escuro">{stats.resumo.total}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="text-sucesso">{stats.resumo.ativos} ativos</span>
              <span className="text-cinza-claro">|</span>
              <span className="text-erro">{stats.resumo.inativos} inativos</span>
            </div>
          </div>

          <div className="bg-white border border-cinza-claro rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cinza-medio text-sm">Novos este mês</span>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-cinza-escuro">{stats.resumo.novosEsteMes}</p>
            <div className="mt-2 flex items-center gap-1 text-sm">
              {stats.resumo.crescimento >= 0 ? (
                <>
                  <TrendingUp size={14} className="text-sucesso" />
                  <span className="text-sucesso">+{stats.resumo.crescimento}%</span>
                </>
              ) : (
                <>
                  <TrendingDown size={14} className="text-erro" />
                  <span className="text-erro">{stats.resumo.crescimento}%</span>
                </>
              )}
              <span className="text-cinza-medio">vs mês anterior</span>
            </div>
          </div>

          <div className="bg-white border border-cinza-claro rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cinza-medio text-sm">Com Pré-Anamnese</span>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-cinza-escuro">{stats.resumo.comAnamnese}</p>
            <div className="mt-2 text-sm text-cinza-medio">
              {stats.resumo.total > 0 
                ? `${Math.round((stats.resumo.comAnamnese / stats.resumo.total) * 100)}% do total`
                : '0% do total'}
            </div>
          </div>

          <div className="bg-white border border-cinza-claro rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-cinza-medio text-sm">Sem Pré-Anamnese</span>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity size={20} className="text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-cinza-escuro">{stats.resumo.semAnamnese}</p>
            <div className="mt-2 text-sm text-cinza-medio">
              Pendente de avaliação
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-cinza-claro rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={20} className="text-verde-oliva" />
              <h2 className="font-semibold text-cinza-escuro">Cadastros por Mês</h2>
            </div>
            {stats.cadastrosPorMes.length > 0 ? (
              <div className="space-y-3">
                {stats.cadastrosPorMes.map((item) => (
                  <div key={item.mes} className="flex items-center gap-3">
                    <span className="text-xs text-cinza-medio w-16">{formatMonth(item.mes)}</span>
                    <div className="flex-1 bg-cinza-muito-claro rounded-full h-6 overflow-hidden">
                      <div 
                        className="h-full bg-verde-oliva rounded-full flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${Math.max((item.total / maxCadastro) * 100, 10)}%` }}
                      >
                        <span className="text-xs text-white font-medium">{item.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-cinza-medio text-sm">Nenhum dado disponível</p>
            )}
          </div>

          <div className="bg-white border border-cinza-claro rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-verde-oliva" />
              <h2 className="font-semibold text-cinza-escuro">Por Estado</h2>
            </div>
            {stats.porEstado.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {stats.porEstado.map((item, index) => (
                  <div 
                    key={item.estado} 
                    className="flex items-center justify-between p-3 bg-cinza-muito-claro/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-verde-oliva/10 rounded-full flex items-center justify-center text-xs font-medium text-verde-oliva">
                        {index + 1}
                      </span>
                      <span className="text-sm text-cinza-escuro font-medium">{item.estado}</span>
                    </div>
                    <span className="text-sm text-cinza-medio">{item.total}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-cinza-medio text-sm">Nenhum dado disponível</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-cinza-claro rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-verde-oliva" />
            <h2 className="font-semibold text-cinza-escuro">Por Patologia (Top 10)</h2>
          </div>
          {stats.porPatologia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {stats.porPatologia.map((item) => (
                <div 
                  key={item.patologia} 
                  className="p-4 bg-cinza-muito-claro/50 rounded-lg text-center"
                >
                  <p className="text-2xl font-bold text-verde-oliva">{item.total}</p>
                  <p className="text-xs text-cinza-medio mt-1 line-clamp-2" title={item.patologia}>
                    {item.patologia}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-cinza-medio text-sm">Nenhum dado disponível</p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link 
            href="/admin/associados"
            className="bg-white border border-cinza-claro rounded-xl p-5 hover:border-verde-oliva transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-verde-oliva/10 rounded-lg flex items-center justify-center group-hover:bg-verde-oliva/20 transition-colors">
                <Users size={24} className="text-verde-oliva" />
              </div>
              <div>
                <p className="font-medium text-cinza-escuro">Gerenciar Associados</p>
                <p className="text-sm text-cinza-medio">Buscar, editar, exportar</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/agendamentos"
            className="bg-white border border-cinza-claro rounded-xl p-5 hover:border-verde-oliva transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-cinza-escuro">Agendamentos</p>
                <p className="text-sm text-cinza-medio">Consultas e retornos</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/admins"
            className="bg-white border border-cinza-claro rounded-xl p-5 hover:border-verde-oliva transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <UserPlus size={24} className="text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-cinza-escuro">Administradores</p>
                <p className="text-sm text-cinza-medio">Gerenciar acessos</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/whatsapp"
            className="bg-white border border-cinza-claro rounded-xl p-5 hover:border-verde-oliva transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <MessageCircle size={24} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-cinza-escuro">WhatsApp</p>
                <p className="text-sm text-cinza-medio">Mensagens em massa</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/admin/logs"
            className="bg-white border border-cinza-claro rounded-xl p-5 hover:border-verde-oliva transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <ClipboardList size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-cinza-escuro">Logs de Atividade</p>
                <p className="text-sm text-cinza-medio">Auditoria do sistema</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
