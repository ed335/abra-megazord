'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { ChevronDown, ChevronUp, FileText, AlertCircle, Clock, Activity, Download, Upload, FileSpreadsheet, MessageCircle } from 'lucide-react';

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
  const router = useRouter();

  const fetchAssociados = useCallback(async (page: number) => {
    setLoading(true);
    setError('');

    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`/api/admin/associados?page=${page}&limit=20`, {
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
  }, [router]);

  useEffect(() => {
    fetchAssociados(currentPage);
  }, [currentPage, fetchAssociados]);

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
      fetchAssociados(1);
      setCurrentPage(1);
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
                        </tr>
                        
                        {expandedRows.has(associado.id) && associado.preAnamnese && (
                          <tr key={`${associado.id}-details`} className="bg-cinza-muito-claro/30">
                            <td colSpan={9} className="px-4 py-6">
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
    </main>
  );
}
