'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

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
          <Link href="/dashboard" className="text-sm text-verde-oliva hover:underline">
            Voltar ao Dashboard
          </Link>
        </div>

        {pagination && (
          <div className="mb-4 text-sm text-cinza-medio">
            {pagination.total} associado(s) cadastrado(s)
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
                        Já usa cannabis?
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-cinza-escuro uppercase tracking-wider">
                        Termos
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
                      <tr key={associado.id} className="hover:bg-cinza-muito-claro/50 transition-colors">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-cinza-escuro">{associado.nome}</p>
                            <p className="text-xs text-cinza-medio">{associado.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-cinza-escuro">
                          {formatWhatsApp(associado.whatsapp)}
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            associado.jaUsaCannabis
                              ? 'bg-verde-claro/20 text-verde-oliva'
                              : 'bg-cinza-claro text-cinza-medio'
                          }`}>
                            {associado.jaUsaCannabis ? 'Sim' : 'Não'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-1">
                            {associado.termoAjuizamento && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-verde-claro/20 text-verde-oliva">
                                Ajuiz.
                              </span>
                            )}
                            {associado.consenteLGPD && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-verde-claro/20 text-verde-oliva">
                                LGPD
                              </span>
                            )}
                          </div>
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
