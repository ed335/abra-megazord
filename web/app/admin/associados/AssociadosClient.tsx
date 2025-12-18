'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { ChevronDown, ChevronUp, FileText, AlertCircle, Clock, Activity, Download, Upload, FileSpreadsheet, MessageCircle, Search, Filter, X, Edit2, Power, Trash2, Eye, Image } from 'lucide-react';

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
  };
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

type Filters = {
  search: string;
  cidade: string;
  estado: string;
  patologia: string;
  status: string;
  temAnamnese: string;
};

const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 
  'SP', 'SE', 'TO'
];

export default function AssociadosClient() {
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: number; errors: { linha: number; email: string; erro: string }[]; skipped: number } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    cidade: '',
    estado: '',
    patologia: '',
    status: '',
    temAnamnese: '',
  });
  const router = useRouter();

  const buildQueryString = useCallback((page: number, currentFilters: Filters) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', '20');
    
    if (currentFilters.search) params.set('search', currentFilters.search);
    if (currentFilters.cidade) params.set('cidade', currentFilters.cidade);
    if (currentFilters.estado) params.set('estado', currentFilters.estado);
    if (currentFilters.patologia) params.set('patologia', currentFilters.patologia);
    if (currentFilters.status) params.set('status', currentFilters.status);
    if (currentFilters.temAnamnese) params.set('temAnamnese', currentFilters.temAnamnese);
    
    return params.toString();
  }, []);

  const fetchAssociados = useCallback(async (page: number, currentFilters: Filters = filters) => {
    setLoading(true);
    setError('');

    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const queryString = buildQueryString(page, currentFilters);
      const response = await fetch(`/api/admin/associados?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao carregar associados');
      }

      const data = await response.json();
      setAssociados(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [router, buildQueryString, filters]);

  useEffect(() => {
    fetchAssociados(currentPage, filters);
  }, [currentPage, fetchAssociados, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAssociados(1, filters);
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    const emptyFilters: Filters = {
      search: '',
      cidade: '',
      estado: '',
      patologia: '',
      status: '',
      temAnamnese: '',
    };
    setFilters(emptyFilters);
    setCurrentPage(1);
    fetchAssociados(1, emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  const [editingAssociado, setEditingAssociado] = useState<Associado | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    nome: '',
    whatsapp: '',
    cpf: '',
    dataNascimento: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    patologiaCID: '',
    jaUsaCannabis: false,
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docsData, setDocsData] = useState<{
    associado: { id: string; nome: string };
    documentos: { tipo: string; url: string; nome: string }[];
  } | null>(null);

  const handleViewDocs = async (id: string) => {
    setDocsLoading(true);
    setShowDocsModal(true);
    const token = getToken();

    try {
      const response = await fetch(`/api/admin/associados/${id}/documentos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar documentos');
      }

      const data = await response.json();
      setDocsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar documentos');
      setShowDocsModal(false);
    } finally {
      setDocsLoading(false);
    }
  };

  const handleEdit = (associado: Associado) => {
    setEditingAssociado(associado);
    setEditForm({
      nome: associado.nome || '',
      whatsapp: associado.whatsapp || '',
      cpf: (associado as any).cpf || '',
      dataNascimento: (associado as any).dataNascimento ? new Date((associado as any).dataNascimento).toISOString().split('T')[0] : '',
      cep: (associado as any).cep || '',
      rua: (associado as any).rua || '',
      numero: (associado as any).numero || '',
      complemento: (associado as any).complemento || '',
      bairro: (associado as any).bairro || '',
      cidade: associado.cidade || '',
      estado: associado.estado || '',
      patologiaCID: associado.patologiaCID || '',
      jaUsaCannabis: associado.jaUsaCannabis || false,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingAssociado) return;
    
    setSaving(true);
    const token = getToken();
    
    try {
      const response = await fetch(`/api/admin/associados/${editingAssociado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar');
      }

      setShowEditModal(false);
      setEditingAssociado(null);
      fetchAssociados(currentPage, filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    setTogglingId(id);
    const token = getToken();
    
    try {
      const response = await fetch(`/api/admin/associados/${id}/toggle-status`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar status');
      }

      fetchAssociados(currentPage, filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar status');
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const token = getToken();
    
    try {
      const response = await fetch(`/api/admin/associados/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir');
      }

      setConfirmDelete(null);
      fetchAssociados(currentPage, filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExport = async () => {
    setExporting(true);
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/associados/export', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao exportar');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `associados_abracanm_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao exportar');
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadTemplate = async () => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/associados/template', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao baixar modelo');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modelo_importacao_associados_abracanm.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao baixar modelo');
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);
    setError('');

    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/associados/import', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao importar');
      }

      setImportResult(data.results);
      setCurrentPage(1);
      fetchAssociados(1, filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao importar');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
    const message = encodeURIComponent(`Olá ${firstName}! Aqui é da ABRACANM - Associação Brasileira de Cannabis Medicinal. Tudo bem com você?`);
    return `https://wa.me/${phone}?text=${message}`;
  };

  const getUrgencyBadge = (nivel: string) => {
    const styles = {
      baixa: 'bg-green-100 text-green-800',
      moderada: 'bg-yellow-100 text-yellow-800',
      alta: 'bg-red-100 text-red-800',
    };
    const labels = {
      baixa: 'Baixa',
      moderada: 'Moderada',
      alta: 'Alta',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[nivel as keyof typeof styles] || styles.baixa}`}>
        {labels[nivel as keyof typeof labels] || nivel}
      </span>
    );
  };

  const getPerfilLabel = (perfil: string) => {
    const labels: Record<string, string> = {
      'PACIENTE_NOVO': 'Paciente Novo',
      'EM_TRATAMENTO': 'Em Tratamento',
      'CUIDADOR': 'Cuidador/Familiar',
    };
    return labels[perfil] || perfil;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-verde-oliva font-medium mb-1">Admin</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-cinza-escuro">
              Lista de Associados
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-2 px-3 py-2 border border-verde-oliva text-verde-oliva rounded-lg hover:bg-verde-oliva/10 transition-colors text-sm font-medium"
            >
              <FileSpreadsheet size={16} />
              Modelo
            </button>
            <label className="inline-flex items-center gap-2 px-3 py-2 border border-verde-oliva text-verde-oliva rounded-lg hover:bg-verde-oliva/10 transition-colors text-sm font-medium cursor-pointer">
              <Upload size={16} />
              {importing ? 'Importando...' : 'Importar'}
              <input
                type="file"
                accept=".csv"
                onChange={handleImport}
                disabled={importing}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              disabled={exporting || loading}
              className="inline-flex items-center gap-2 px-3 py-2 bg-verde-oliva text-white rounded-lg hover:bg-verde-oliva/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              <Download size={16} />
              {exporting ? 'Exportando...' : 'Exportar'}
            </button>
            <Link href="/dashboard" className="text-sm text-verde-oliva hover:underline">
              Voltar
            </Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cinza-medio" size={18} />
              <input
                type="text"
                placeholder="Buscar por nome, email ou WhatsApp..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-verde-oliva text-white rounded-lg hover:bg-verde-oliva/90 transition-colors text-sm font-medium"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors text-sm font-medium ${
                showFilters || hasActiveFilters
                  ? 'border-verde-oliva bg-verde-oliva/10 text-verde-oliva'
                  : 'border-cinza-claro text-cinza-escuro hover:bg-cinza-muito-claro'
              }`}
            >
              <Filter size={16} />
              Filtros
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-verde-oliva" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-3 p-4 bg-white border border-cinza-claro rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs text-cinza-medio mb-1">Cidade</label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo"
                    value={filters.cidade}
                    onChange={(e) => handleFilterChange('cidade', e.target.value)}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-sm focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cinza-medio mb-1">Estado</label>
                  <select
                    value={filters.estado}
                    onChange={(e) => handleFilterChange('estado', e.target.value)}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-sm focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  >
                    <option value="">Todos</option>
                    {ESTADOS_BR.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-cinza-medio mb-1">Patologia</label>
                  <input
                    type="text"
                    placeholder="Ex: Ansiedade, F41"
                    value={filters.patologia}
                    onChange={(e) => handleFilterChange('patologia', e.target.value)}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-sm focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-xs text-cinza-medio mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-sm focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  >
                    <option value="">Todos</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-cinza-medio mb-1">Pré-Anamnese</label>
                  <select
                    value={filters.temAnamnese}
                    onChange={(e) => handleFilterChange('temAnamnese', e.target.value)}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-sm focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  >
                    <option value="">Todos</option>
                    <option value="sim">Respondida</option>
                    <option value="nao">Pendente</option>
                  </select>
                </div>
              </div>
              {hasActiveFilters && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 text-sm text-erro hover:underline"
                  >
                    <X size={14} />
                    Limpar filtros
                  </button>
                </div>
              )}
            </div>
          )}
        </form>

        {importResult && (
          <div className="mb-4 p-4 bg-white border border-cinza-claro rounded-xl">
            <h3 className="font-semibold text-cinza-escuro mb-2">Resultado da Importação</h3>
            <div className="flex gap-6 text-sm">
              <span className="text-sucesso">{importResult.success} importado(s)</span>
              <span className="text-cinza-medio">{importResult.skipped} já existente(s)</span>
              <span className="text-erro">{importResult.errors.length} erro(s)</span>
            </div>
            {importResult.errors.length > 0 && (
              <div className="mt-3 text-xs text-erro">
                <p className="font-medium mb-1">Erros:</p>
                <ul className="space-y-1 max-h-32 overflow-y-auto">
                  {importResult.errors.map((err, i) => (
                    <li key={i}>Linha {err.linha} ({err.email}): {err.erro}</li>
                  ))}
                </ul>
              </div>
            )}
            <button 
              onClick={() => setImportResult(null)} 
              className="mt-2 text-xs text-cinza-medio hover:text-cinza-escuro"
            >
              Fechar
            </button>
          </div>
        )}

        {pagination && (
          <div className="mb-4 flex items-center gap-4 text-sm text-cinza-medio">
            <span>{pagination.total} associado(s) cadastrado(s)</span>
            <span className="text-cinza-claro">|</span>
            <span className="flex items-center gap-1">
              <FileText size={14} />
              {associados.filter(a => a.preAnamnese).length} com pré-anamnese
            </span>
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 text-center">
            <p className="text-cinza-medio">Carregando...</p>
          </div>
        ) : error ? (
          <div className="bg-erro/10 border border-erro/30 rounded-lg p-4 text-erro">
            {error}
          </div>
        ) : associados.length === 0 ? (
          <div className="bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 text-center">
            <p className="text-cinza-medio">Nenhum associado cadastrado ainda.</p>
          </div>
        ) : (
          <>
            <div className="bg-white border border-cinza-claro rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cinza-muito-claro">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider w-8">
                        
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        WhatsApp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Cidade/UF
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Patologia (CID)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Pré-Anamnese
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Prioridade
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Data Cadastro
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cinza-claro">
                    {associados.map((associado) => (
                      <>
                        <tr 
                          key={associado.id} 
                          className={`hover:bg-cinza-muito-claro/50 transition-colors ${associado.preAnamnese ? 'cursor-pointer' : ''}`}
                          onClick={() => associado.preAnamnese && toggleRow(associado.id)}
                        >
                          <td className="px-4 py-4">
                            {associado.preAnamnese && (
                              <button className="text-cinza-medio hover:text-cinza-escuro">
                                {expandedRows.has(associado.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium text-cinza-escuro">{associado.nome}</p>
                              <p className="text-xs text-cinza-medio">{associado.email}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-cinza-escuro">
                            <div className="flex items-center gap-2">
                              <a
                                href={getWhatsAppLink(associado.whatsapp, associado.nome)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors"
                                title="Enviar mensagem no WhatsApp"
                              >
                                <MessageCircle size={16} />
                              </a>
                              <span>{formatWhatsApp(associado.whatsapp)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-cinza-escuro">
                            {associado.cidade && associado.estado
                              ? `${associado.cidade}/${associado.estado}`
                              : '-'}
                          </td>
                          <td className="px-4 py-4 text-sm text-cinza-escuro">
                            {associado.patologiaCID || '-'}
                          </td>
                          <td className="px-4 py-4">
                            {associado.preAnamnese ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-verde-claro/20 text-verde-oliva">
                                <FileText size={12} />
                                Respondida
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-cinza-claro text-cinza-medio">
                                <Clock size={12} />
                                Pendente
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {associado.preAnamnese ? (
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-cinza-claro rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      associado.preAnamnese.scorePrioridade >= 70 ? 'bg-red-500' :
                                      associado.preAnamnese.scorePrioridade >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${associado.preAnamnese.scorePrioridade}%` }}
                                  />
                                </div>
                                <span className="text-xs text-cinza-medio">{associado.preAnamnese.scorePrioridade}</span>
                              </div>
                            ) : (
                              <span className="text-cinza-claro">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-cinza-escuro">
                            {formatDate(associado.criadoEm)}
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              associado.usuario.ativo
                                ? 'bg-sucesso/20 text-sucesso'
                                : 'bg-erro/20 text-erro'
                            }`}>
                              {associado.usuario.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleViewDocs(associado.id)}
                                className="p-1.5 text-cinza-medio hover:text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                title="Ver documentos"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => handleEdit(associado)}
                                className="p-1.5 text-cinza-medio hover:text-verde-oliva hover:bg-verde-oliva/10 rounded transition-colors"
                                title="Editar"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleToggleStatus(associado.id)}
                                disabled={togglingId === associado.id}
                                className={`p-1.5 rounded transition-colors ${
                                  associado.usuario.ativo 
                                    ? 'text-cinza-medio hover:text-amber-600 hover:bg-amber-100' 
                                    : 'text-cinza-medio hover:text-sucesso hover:bg-sucesso/10'
                                }`}
                                title={associado.usuario.ativo ? 'Desativar' : 'Ativar'}
                              >
                                <Power size={14} />
                              </button>
                              {confirmDelete === associado.id ? (
                                <div className="flex items-center gap-1 bg-erro/10 rounded px-2 py-1">
                                  <span className="text-xs text-erro">Confirmar?</span>
                                  <button
                                    onClick={() => handleDelete(associado.id)}
                                    disabled={deletingId === associado.id}
                                    className="text-xs text-erro font-medium hover:underline"
                                  >
                                    Sim
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(null)}
                                    className="text-xs text-cinza-medio hover:underline"
                                  >
                                    Não
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setConfirmDelete(associado.id)}
                                  className="p-1.5 text-cinza-medio hover:text-erro hover:bg-erro/10 rounded transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        
                        {expandedRows.has(associado.id) && associado.preAnamnese && (
                          <tr key={`${associado.id}-details`} className="bg-cinza-muito-claro/30">
                            <td colSpan={10} className="px-4 py-6">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl p-4 border border-cinza-claro">
                                  <h4 className="font-semibold text-cinza-escuro mb-3 flex items-center gap-2">
                                    <Activity size={16} className="text-verde-oliva" />
                                    Diagnóstico ABRACANM
                                  </h4>
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-sm font-medium text-cinza-escuro">{associado.preAnamnese.diagnostico.titulo}</p>
                                      <p className="text-xs text-cinza-medio mt-1">{associado.preAnamnese.diagnostico.resumo}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-cinza-medio">Urgência:</span>
                                      {getUrgencyBadge(associado.preAnamnese.diagnostico.nivelUrgencia)}
                                    </div>
                                    {associado.preAnamnese.diagnostico.observacoes && (
                                      <p className="text-xs text-cinza-medio italic">{associado.preAnamnese.diagnostico.observacoes}</p>
                                    )}
                                  </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 border border-cinza-claro">
                                  <h4 className="font-semibold text-cinza-escuro mb-3 flex items-center gap-2">
                                    <FileText size={16} className="text-verde-oliva" />
                                    Respostas da Pré-Anamnese
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-cinza-medio">Perfil:</span>
                                      <span className="font-medium text-cinza-escuro">{getPerfilLabel(associado.preAnamnese.perfil)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-cinza-medio">Objetivo:</span>
                                      <span className="font-medium text-cinza-escuro text-right max-w-[200px]">{associado.preAnamnese.objetivoPrincipal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-cinza-medio">Gravidade:</span>
                                      <span className="font-medium text-cinza-escuro">{associado.preAnamnese.gravidade}/5</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-cinza-medio">Preferência:</span>
                                      <span className="font-medium text-cinza-escuro">{associado.preAnamnese.preferenciaAcompanhamento}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-cinza-medio">Horário:</span>
                                      <span className="font-medium text-cinza-escuro">{associado.preAnamnese.melhorHorario}</span>
                                    </div>
                                    {associado.preAnamnese.tratamentosPrevios.length > 0 && (
                                      <div>
                                        <span className="text-cinza-medio">Tratamentos prévios:</span>
                                        <p className="text-xs text-cinza-escuro mt-1">{associado.preAnamnese.tratamentosPrevios.join(', ')}</p>
                                      </div>
                                    )}
                                    {associado.preAnamnese.comorbidades.length > 0 && (
                                      <div>
                                        <span className="text-cinza-medio">Comorbidades:</span>
                                        <p className="text-xs text-cinza-escuro mt-1">{associado.preAnamnese.comorbidades.join(', ')}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 border border-cinza-claro">
                                  <h4 className="font-semibold text-cinza-escuro mb-3 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-verde-oliva" />
                                    Indicações e Próximos Passos
                                  </h4>
                                  <div className="space-y-3">
                                    {associado.preAnamnese.diagnostico.indicacoes.length > 0 && (
                                      <div>
                                        <p className="text-xs font-medium text-verde-oliva mb-1">Indicações:</p>
                                        <ul className="text-xs text-cinza-medio space-y-1">
                                          {associado.preAnamnese.diagnostico.indicacoes.map((ind, i) => (
                                            <li key={i} className="flex items-start gap-1">
                                              <span className="text-verde-oliva mt-0.5">•</span>
                                              {ind}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {associado.preAnamnese.diagnostico.contraindicacoes.length > 0 && (
                                      <div>
                                        <p className="text-xs font-medium text-erro mb-1">Contraindicações:</p>
                                        <ul className="text-xs text-cinza-medio space-y-1">
                                          {associado.preAnamnese.diagnostico.contraindicacoes.map((contra, i) => (
                                            <li key={i} className="flex items-start gap-1">
                                              <span className="text-erro mt-0.5">•</span>
                                              {contra}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    <div className="pt-2 border-t border-cinza-claro">
                                      <p className="text-xs font-medium text-cinza-escuro mb-1">Próximo passo:</p>
                                      <p className="text-xs text-cinza-medio">{associado.preAnamnese.proximosPasso}</p>
                                    </div>
                                    <div className="text-xs text-cinza-claro">
                                      Respondido em: {formatDate(associado.preAnamnese.criadoEm)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-cinza-claro text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cinza-muito-claro transition-colors"
                >
                  Anterior
                </button>
                <span className="px-4 py-2 text-sm text-cinza-medio">
                  Página {currentPage} de {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-cinza-claro text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cinza-muito-claro transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showEditModal && editingAssociado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cinza-claro flex items-center justify-between">
              <h2 className="text-lg font-semibold text-cinza-escuro">Editar Associado</h2>
              <button
                onClick={() => { setShowEditModal(false); setEditingAssociado(null); }}
                className="p-2 text-cinza-medio hover:text-cinza-escuro hover:bg-cinza-muito-claro rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Nome completo</label>
                  <input
                    type="text"
                    value={editForm.nome}
                    onChange={(e) => setEditForm({ ...editForm, nome: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={editForm.whatsapp}
                    onChange={(e) => setEditForm({ ...editForm, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">CPF</label>
                  <input
                    type="text"
                    value={editForm.cpf}
                    onChange={(e) => setEditForm({ ...editForm, cpf: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    value={editForm.dataNascimento}
                    onChange={(e) => setEditForm({ ...editForm, dataNascimento: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">CEP</label>
                  <input
                    type="text"
                    value={editForm.cep}
                    onChange={(e) => setEditForm({ ...editForm, cep: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Rua</label>
                  <input
                    type="text"
                    value={editForm.rua}
                    onChange={(e) => setEditForm({ ...editForm, rua: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Número</label>
                  <input
                    type="text"
                    value={editForm.numero}
                    onChange={(e) => setEditForm({ ...editForm, numero: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Complemento</label>
                  <input
                    type="text"
                    value={editForm.complemento}
                    onChange={(e) => setEditForm({ ...editForm, complemento: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Bairro</label>
                  <input
                    type="text"
                    value={editForm.bairro}
                    onChange={(e) => setEditForm({ ...editForm, bairro: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Cidade</label>
                  <input
                    type="text"
                    value={editForm.cidade}
                    onChange={(e) => setEditForm({ ...editForm, cidade: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Estado</label>
                  <select
                    value={editForm.estado}
                    onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  >
                    <option value="">Selecione</option>
                    {ESTADOS_BR.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-cinza-escuro mb-1">Patologia (CID)</label>
                  <input
                    type="text"
                    value={editForm.patologiaCID}
                    onChange={(e) => setEditForm({ ...editForm, patologiaCID: e.target.value })}
                    className="w-full px-3 py-2 border border-cinza-claro rounded-lg focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editForm.jaUsaCannabis}
                      onChange={(e) => setEditForm({ ...editForm, jaUsaCannabis: e.target.checked })}
                      className="w-4 h-4 text-verde-oliva border-cinza-claro rounded focus:ring-verde-oliva"
                    />
                    <span className="text-sm text-cinza-escuro">Já utiliza cannabis medicinal</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-cinza-claro flex justify-end gap-3">
              <button
                onClick={() => { setShowEditModal(false); setEditingAssociado(null); }}
                className="px-4 py-2 text-sm text-cinza-medio hover:text-cinza-escuro transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="px-4 py-2 bg-verde-oliva text-white rounded-lg hover:bg-verde-oliva/90 transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDocsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cinza-claro flex items-center justify-between">
              <h2 className="text-lg font-semibold text-cinza-escuro">
                {docsLoading ? 'Carregando...' : `Documentos de ${docsData?.associado.nome || ''}`}
              </h2>
              <button
                onClick={() => { setShowDocsModal(false); setDocsData(null); }}
                className="p-2 text-cinza-medio hover:text-cinza-escuro hover:bg-cinza-muito-claro rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              {docsLoading ? (
                <div className="text-center py-8">
                  <p className="text-cinza-medio">Carregando documentos...</p>
                </div>
              ) : docsData && docsData.documentos.length > 0 ? (
                <div className="grid gap-4">
                  {docsData.documentos.map((doc, index) => (
                    <div key={index} className="border border-cinza-claro rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Image size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-cinza-escuro">{doc.tipo}</p>
                            <p className="text-xs text-cinza-medio">{doc.url.split('/').pop()}</p>
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-verde-oliva text-white rounded-lg hover:bg-verde-oliva/90 transition-colors text-sm font-medium"
                        >
                          <Eye size={14} />
                          Abrir
                        </a>
                      </div>
                      {(doc.url.endsWith('.jpg') || doc.url.endsWith('.jpeg') || doc.url.endsWith('.png') || doc.url.endsWith('.gif')) && (
                        <div className="mt-2 rounded-lg overflow-hidden bg-cinza-muito-claro">
                          <img 
                            src={doc.url} 
                            alt={doc.tipo}
                            className="max-w-full h-auto max-h-64 mx-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-cinza-muito-claro rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-cinza-claro" />
                  </div>
                  <p className="text-cinza-medio">Nenhum documento enviado</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-cinza-claro flex justify-end">
              <button
                onClick={() => { setShowDocsModal(false); setDocsData(null); }}
                className="px-4 py-2 text-sm text-cinza-medio hover:text-cinza-escuro transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
