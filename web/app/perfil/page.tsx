'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken } from '@/lib/auth';
import Header from '@/components/shared/Header';
import { Loader2, Save, User, MapPin, Phone, FileText, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

interface Perfil {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  whatsapp: string;
  telefone: string;
  dataNascimento: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  patologiaCID: string;
}

const estadosBrasileiros = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function PerfilPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    
    const loadData = async () => {
      try {
        const response = await fetch('/api/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Erro ao carregar perfil');
        }

        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar perfil');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!perfil) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = getToken();
      const response = await fetch('/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(perfil),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao salvar perfil');
      }

      setSuccess('Perfil atualizado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar perfil');
    } finally {
      setSaving(false);
    }
  };

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const formatCEP = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 5) return digits;
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  };

  const handleCEPChange = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    setPerfil(prev => prev ? { ...prev, cep } : null);

    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setPerfil(prev => prev ? {
            ...prev,
            rua: data.logradouro || prev.rua,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            estado: data.uf || prev.estado,
          } : null);
        }
      } catch {}
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-verde-oliva animate-spin" />
        </div>
      </main>
    );
  }

  if (!perfil) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error || 'Perfil nao encontrado'}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-cinza-medio" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-cinza-escuro">Meu Perfil</h1>
            <p className="text-sm text-cinza-medio">Atualize seus dados pessoais</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-white border border-cinza-claro rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-verde-oliva" />
              <h2 className="text-lg font-semibold text-cinza-escuro">Dados Pessoais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={perfil.nome}
                  onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Email</label>
                <input
                  type="email"
                  value={perfil.email}
                  disabled
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-medio bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-cinza-medio mt-1">O email nao pode ser alterado</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">
                  CPF <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formatCPF(perfil.cpf)}
                  onChange={(e) => setPerfil({ ...perfil, cpf: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                  placeholder="000.000.000-00"
                  required
                />
                <p className="text-xs text-cinza-medio mt-1">Necessario para gerar pagamento via Pix</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Data de Nascimento</label>
                <input
                  type="date"
                  value={perfil.dataNascimento}
                  onChange={(e) => setPerfil({ ...perfil, dataNascimento: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-cinza-claro rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-verde-oliva" />
              <h2 className="text-lg font-semibold text-cinza-escuro">Contato</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={formatPhone(perfil.whatsapp)}
                  onChange={(e) => setPerfil({ ...perfil, whatsapp: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Telefone (opcional)</label>
                <input
                  type="text"
                  value={formatPhone(perfil.telefone)}
                  onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value.replace(/\D/g, '') })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-cinza-claro rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-verde-oliva" />
              <h2 className="text-lg font-semibold text-cinza-escuro">Endereco</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">CEP</label>
                <input
                  type="text"
                  value={formatCEP(perfil.cep)}
                  onChange={(e) => handleCEPChange(e.target.value)}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                  placeholder="00000-000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Rua</label>
                <input
                  type="text"
                  value={perfil.rua}
                  onChange={(e) => setPerfil({ ...perfil, rua: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Numero</label>
                <input
                  type="text"
                  value={perfil.numero}
                  onChange={(e) => setPerfil({ ...perfil, numero: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Complemento</label>
                <input
                  type="text"
                  value={perfil.complemento}
                  onChange={(e) => setPerfil({ ...perfil, complemento: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                  placeholder="Apto, bloco..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Bairro</label>
                <input
                  type="text"
                  value={perfil.bairro}
                  onChange={(e) => setPerfil({ ...perfil, bairro: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Cidade</label>
                <input
                  type="text"
                  value={perfil.cidade}
                  onChange={(e) => setPerfil({ ...perfil, cidade: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cinza-escuro mb-1">Estado</label>
                <select
                  value={perfil.estado}
                  onChange={(e) => setPerfil({ ...perfil, estado: e.target.value })}
                  className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-escuro focus:ring-2 focus:ring-verde-oliva/20 focus:border-verde-oliva outline-none"
                >
                  <option value="">Selecione</option>
                  {estadosBrasileiros.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white border border-cinza-claro rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-verde-oliva" />
              <h2 className="text-lg font-semibold text-cinza-escuro">Informacoes Medicas</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-cinza-escuro mb-1">Patologia (CID)</label>
              <input
                type="text"
                value={perfil.patologiaCID}
                disabled
                className="w-full px-3 py-2 border border-cinza-claro rounded-lg text-cinza-medio bg-gray-50 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-cinza-medio mt-2">
              As informacoes medicas sao atualizadas durante a consulta com o prescritor.
            </p>
          </section>

          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-cinza-claro text-cinza-escuro rounded-lg text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 bg-verde-oliva text-white rounded-lg text-sm font-medium hover:bg-verde-oliva/90 disabled:opacity-50 flex items-center justify-center gap-2 transition"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar Alteracoes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
