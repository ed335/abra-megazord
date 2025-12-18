"use client";

import Link from "next/link";
import Button from "@/components/shared/Button";
import { clearToken } from "@/lib/auth";
import useSWR from "swr";
import { fetchWithAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ShieldCheck, Activity, Users } from "lucide-react";

type MeResponse = {
  id: string;
  email: string;
  role: string;
  nome: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<MeResponse>(
    '/api/auth/me',
    (url) => fetchWithAuth<MeResponse>(url),
    { revalidateOnFocus: false }
  );

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  useEffect(() => {
    if ((error as Error & { code?: string })?.code === "UNAUTHORIZED") {
      router.replace("/login");
    }
  }, [error, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-off-white">
        <p className="text-cinza-medio">Carregando...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-cinza-escuro mb-4">
            Você precisa entrar
          </h1>
          {error && (
            <p className="text-sm text-erro bg-erro/10 border border-erro/30 rounded-lg px-4 py-3 mb-4">
              {error instanceof Error ? error.message : "Sessão inválida"}
            </p>
          )}
          <p className="text-cinza-medio mb-6">
            Faça login ou crie uma conta para acessar o dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => router.push("/login")}>
              Ir para Login
            </Button>
            <Button variant="secondary" onClick={() => router.push("/cadastro")}>
              Criar conta
            </Button>
            <Link href="/" className="text-sm text-verde-oliva underline">
              Voltar para a home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const user = data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-verde-oliva font-medium">ABRACANM - Minha Área</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro">
                Bem-vindo(a), {user.nome || user.email}
              </h1>
              <p className="text-cinza-medio mt-2">
                Sessão ativa. Veja status da conta e próximos passos.
              </p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardStat
              icon={<ShieldCheck className="w-5 h-5 text-verde-oliva" />}
              label="Status da conta"
              value="Ativa"
              hint={user.email}
            />
            <CardStat
              icon={<Users className="w-5 h-5 text-verde-oliva" />}
              label="Perfil"
              value={user.role === 'PACIENTE' ? 'Associado' : user.role}
              hint={`ID: ${user.id.slice(0, 8)}...`}
            />
            <CardStat
              icon={<Activity className="w-5 h-5 text-verde-oliva" />}
              label="Nome"
              value={user.nome || '-'}
              hint="Dados do perfil"
            />
          </div>

          <div className="border border-cinza-claro rounded-lg p-4 bg-cinza-muito-claro">
            <p className="text-sm text-cinza-medio">Sessão</p>
            <p className="text-lg font-semibold text-cinza-escuro break-all">{user.email}</p>
            <p className="text-sm text-cinza-medio mt-1">
              Token armazenado localmente. Mantenha seus dados seguros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-cinza-claro rounded-lg p-4">
              <h3 className="text-lg font-semibold text-cinza-escuro mb-2">
                Próximos passos
              </h3>
              <ul className="list-disc list-inside text-cinza-medio space-y-1 text-sm">
                <li>Completar pré-anamnese</li>
                <li>Atualizar perfil e dados de contato</li>
                <li>Receber validação do prescritor</li>
              </ul>
            </div>
            <div className="border border-cinza-claro rounded-lg p-4">
              <h3 className="text-lg font-semibold text-cinza-escuro mb-2">
                Atalhos
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="sm" onClick={() => router.push("/pre-anamnese")}>
                  Pré-anamnese
                </Button>
                <Button variant="secondary" size="sm" onClick={() => router.push("/contato")}>
                  Contato
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CardStat({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="border border-cinza-claro rounded-xl p-4 bg-white flex items-start gap-3 shadow-sm">
      <div className="p-2 rounded-lg bg-verde-claro/10 border border-verde-claro/40">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-cinza-medio">{label}</p>
        <p className="text-xl font-semibold text-cinza-escuro">{value}</p>
        {hint && <p className="text-xs text-cinza-medio mt-1">{hint}</p>}
      </div>
    </div>
  );
}
