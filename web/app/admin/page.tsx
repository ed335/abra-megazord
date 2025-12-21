'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import Header from '@/components/shared/Header';
import { 
  Users, 
  UserPlus, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Activity,
  BarChart3,
  ClipboardList,
  MessageCircle,
  Calendar,
  Search,
  DollarSign
} from 'lucide-react';

type Stats = {
  resumo: {
    total: number;
    ativos: number;
    inativos: number;
    novosEsteMes: number;
    novosMesPassado: number;
    crescimento: number;
    comDocumentosMedicos: number;
    semDocumentosMedicos: number;
  };
  porEstado: { estado: string; total: number }[];
  porPatologia: { patologia: string; total: number }[];
  cadastrosPorMes: { mes: string; total: number }[];
};

type PreAnamnese = {
  id: string;
  perfil: string;
  objetivoPrincipal: string;
  gravidade: number;
  tratamentosPrevios: string[];
  comorbidades: string[];
  notas: string;
  preferenciaAcompanhamento: string;
  melhorHorario: string;
  diagnostico: {
    titulo: string;
    resumo: string;
    nivelUrgencia: 'baixa' | 'moderada' | 'alta';
    indicacoes: string[];
    contraindicacoes: string[];
    observacoes: string;
  } | null;
  scorePrioridade: number;
  recomendacoes: string[];
  proximosPasso: string;
  criadoEm: string;
};

type Associado = {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cidade: string | null;
  estado: string | null;
  jaUsaCannabis: boolean;
  patologiaCID: string | null;
  termoAjuizamento: boolean;
  consenteLGPD: boolean;
  criadoEm: string;
  usuario: {
    ativo: boolean;
    emailVerificado: boolean;
  };
  preAnamnese: PreAnamnese | null;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'stats' | 'associados'>('stats');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const [associados, setAssociados] = useState<Associado[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [associadosLoading, setAssociadosLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchStats = useCallback(async () => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401 || response.status === 403) {
        router.push('/login');
        return;
      }

      if (!response.ok) throw new Error('Erro ao carregar estatísticas');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchAssociados = useCallback(async (page: number, searchTerm: string = '') => {
    setAssociadosLoading(true);
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '10');
      if (searchTerm) params.set('search', searchTerm);

      const response = await fetch(`/api/admin/associados?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erro ao carregar associados');
      const data = await response.json();
      setAssociados(data.associados || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setAssociadosLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === 'associados') {
      fetchAssociados(currentPage, search);
    }
  }, [activeTab, currentPage, fetchAssociados, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAssociados(1, search);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatWhatsApp = (whatsapp: string) => {
    if (!whatsapp) return '-';
    const numbers = whatsapp.replace(/\D/g, '');
    if (numbers.length === 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return whatsapp;
  };

  const getWhatsAppLink = (whatsapp: string, nome: string) => {
    const numbers = whatsapp.replace(/\D/g, '');
    const phone = numbers.startsWith('55') ? numbers : `55${numbers}`;
    const firstName = nome.split(' ')[0];
    const message = encodeURIComponent(`Olá ${firstName}! Aqui é da ABRACANM.`);
    return `https://wa.me/${phone}?text=${message}`;
  };

  const formatMonth = (mesStr: string) => {
    const [year, month] = mesStr.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]}/${year.slice(2)}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-cinza-claro rounded w-1/4" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-cinza-claro rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        </div>
      </main>
    );
  }

  const maxCadastro = stats ? Math.max(...stats.cadastrosPorMes.map(c => c.total), 1) : 1;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-cinza-escuro">Painel Administrativo</h1>
          <p className="text-sm text-cinza-medio mt-1">Gerencie associados e acompanhe métricas</p>
        </div>

        <div className="flex border-b border-cinza-claro mb-6">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              activeTab === 'stats' 
                ? 'border-verde-oliva text-verde-oliva' 
                : 'border-transparent text-cinza-medio hover:text-cinza-escuro'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline-block mr-2" />
            Estatísticas
          </button>
          <button
            onClick={() => setActiveTab('associados')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              activeTab === 'associados' 
                ? 'border-verde-oliva text-verde-oliva' 
                : 'border-transparent text-cinza-medio hover:text-cinza-escuro'
            }`}
          >
            <Users className="w-4 h-4 inline-block mr-2" />
            Associados
          </button>
        </div>

        {activeTab === 'stats' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-cinza-claro rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cinza-medio">Total</span>
                  <Users size={16} className="text-verde-oliva" />
                </div>
                <p className="text-2xl font-semibold text-cinza-escuro">{stats.resumo.total}</p>
                <p className="text-xs text-cinza-medio mt-1">{stats.resumo.ativos} ativos</p>
              </div>

              <div className="border border-cinza-claro rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cinza-medio">Novos este mês</span>
                  <UserPlus size={16} className="text-blue-600" />
                </div>
                <p className="text-2xl font-semibold text-cinza-escuro">{stats.resumo.novosEsteMes}</p>
                <div className="flex items-center gap-1 text-xs mt-1">
                  {stats.resumo.crescimento >= 0 ? (
                    <>
                      <TrendingUp size={12} className="text-green-600" />
                      <span className="text-green-600">+{stats.resumo.crescimento}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown size={12} className="text-red-600" />
                      <span className="text-red-600">{stats.resumo.crescimento}%</span>
                    </>
                  )}
                </div>
              </div>

              <div className="border border-cinza-claro rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cinza-medio">Com laudos</span>
                  <FileText size={16} className="text-amber-600" />
                </div>
                <p className="text-2xl font-semibold text-cinza-escuro">{stats.resumo.comDocumentosMedicos}</p>
                <p className="text-xs text-cinza-medio mt-1">
                  {stats.resumo.total > 0 ? `${Math.round((stats.resumo.comDocumentosMedicos / stats.resumo.total) * 100)}%` : '0%'} do total
                </p>
              </div>

              <div className="border border-cinza-claro rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cinza-medio">Sem laudos</span>
                  <Activity size={16} className="text-red-600" />
                </div>
                <p className="text-2xl font-semibold text-cinza-escuro">{stats.resumo.semDocumentosMedicos}</p>
                <p className="text-xs text-cinza-medio mt-1">Pendente</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="border border-cinza-claro rounded-lg p-5">
                <h2 className="text-sm font-medium text-cinza-escuro mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-verde-oliva" />
                  Cadastros por mês
                </h2>
                {stats.cadastrosPorMes.length > 0 ? (
                  <div className="space-y-2">
                    {stats.cadastrosPorMes.map((item) => (
                      <div key={item.mes} className="flex items-center gap-3">
                        <span className="text-xs text-cinza-medio w-14">{formatMonth(item.mes)}</span>
                        <div className="flex-1 bg-cinza-muito-claro rounded-full h-5 overflow-hidden">
                          <div 
                            className="h-full bg-verde-oliva rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${Math.max((item.total / maxCadastro) * 100, 10)}%` }}
                          >
                            <span className="text-xs text-white font-medium">{item.total}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-cinza-medio text-sm">Nenhum dado</p>
                )}
              </div>

              <div className="border border-cinza-claro rounded-lg p-5">
                <h2 className="text-sm font-medium text-cinza-escuro mb-4 flex items-center gap-2">
                  <MapPin size={16} className="text-verde-oliva" />
                  Por estado
                </h2>
                {stats.porEstado.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {stats.porEstado.slice(0, 8).map((item) => (
                      <div key={item.estado} className="flex items-center justify-between p-2 bg-cinza-muito-claro/50 rounded">
                        <span className="text-sm text-cinza-escuro">{item.estado}</span>
                        <span className="text-sm text-cinza-medio">{item.total}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-cinza-medio text-sm">Nenhum dado</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <a href="/admin/pagamentos" className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/50 transition">
                <DollarSign size={20} className="text-emerald-600 mb-2" />
                <p className="text-sm font-medium text-cinza-escuro">Pagamentos</p>
              </a>
              <a href="/admin/agendamentos" className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/50 transition">
                <Calendar size={20} className="text-blue-600 mb-2" />
                <p className="text-sm font-medium text-cinza-escuro">Agendamentos</p>
              </a>
              <a href="/admin/admins" className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/50 transition">
                <UserPlus size={20} className="text-amber-600 mb-2" />
                <p className="text-sm font-medium text-cinza-escuro">Administradores</p>
              </a>
              <a href="/admin/whatsapp" className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/50 transition">
                <MessageCircle size={20} className="text-green-600 mb-2" />
                <p className="text-sm font-medium text-cinza-escuro">WhatsApp</p>
              </a>
              <a href="/admin/logs" className="border border-cinza-claro rounded-lg p-4 hover:border-verde-oliva/50 transition">
                <ClipboardList size={20} className="text-purple-600 mb-2" />
                <p className="text-sm font-medium text-cinza-escuro">Logs</p>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'associados' && (
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cinza-medio" size={16} />
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou telefone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-cinza-claro rounded-lg text-sm focus:outline-none focus:border-verde-oliva"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-verde-oliva text-white rounded-lg text-sm font-medium hover:bg-verde-oliva/90"
              >
                Buscar
              </button>
              <a 
                href="/admin/associados" 
                className="px-4 py-2 border border-cinza-claro rounded-lg text-sm font-medium text-cinza-escuro hover:bg-cinza-muito-claro"
              >
                Avançado
              </a>
            </form>

            {pagination && (
              <p className="text-xs text-cinza-medio">{pagination.total} associados</p>
            )}

            {associadosLoading ? (
              <div className="text-center py-8 text-cinza-medio text-sm">Carregando...</div>
            ) : associados.length === 0 ? (
              <div className="text-center py-8 text-cinza-medio text-sm">Nenhum associado encontrado</div>
            ) : (
              <div className="border border-cinza-claro rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-cinza-muito-claro/50">
                    <tr>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-cinza-escuro">Nome</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-cinza-escuro hidden sm:table-cell">WhatsApp</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-cinza-escuro hidden md:table-cell">Local</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-cinza-escuro">Status</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-cinza-escuro hidden lg:table-cell">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cinza-claro">
                    {associados.map((a) => (
                      <tr key={a.id} className="hover:bg-cinza-muito-claro/30">
                        <td className="px-4 py-3">
                          <p className="font-medium text-cinza-escuro">{a.nome}</p>
                          <p className="text-xs text-cinza-medio">{a.email}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <a
                            href={getWhatsAppLink(a.whatsapp, a.nome)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-verde-oliva hover:underline"
                          >
                            {formatWhatsApp(a.whatsapp)}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-cinza-medio hidden md:table-cell">
                          {a.cidade && a.estado ? `${a.cidade}/${a.estado}` : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            a.usuario.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {a.usuario.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-cinza-medio hidden lg:table-cell">
                          {formatDate(a.criadoEm)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-cinza-claro rounded text-sm disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="px-3 py-1.5 text-sm text-cinza-medio">
                  {currentPage} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-3 py-1.5 border border-cinza-claro rounded text-sm disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
