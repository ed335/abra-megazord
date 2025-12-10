"use client";

import Link from "next/link";
import Button from "@/components/shared/Button";
import { clearToken } from "@/lib/auth";
import useSWR from "swr";
import { fetchWithAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

type MeResponse = {
  user: {
    id: string;
    email: string;
    role: string;
    ativo: boolean;
    emailVerificado: boolean;
    criadoEm: string;
    atualizadoEm: string;
  } | null;
};

export default function DashboardPage() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<MeResponse>(
    "/auth/me",
    (url) => fetchWithAuth<MeResponse>(url.replace("/auth/me", "/auth/me")),
    { revalidateOnFocus: false }
  );

  const handleLogout = () => {
    clearToken();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-off-white">
        <p className="text-cinza-medio">Carregando...</p>
      </main>
    );
  }

  if (error || !data?.user) {
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

  const user = data.user;

  return (
    <main className="min-h-screen bg-gradient-to-b from-off-white to-cinza-muito-claro px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto bg-white border border-cinza-claro rounded-2xl shadow-sm p-8 sm:p-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-verde-oliva font-medium">AbraCann Dashboard</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-cinza-escuro">
              Sessão autenticada
            </h1>
            <p className="text-cinza-medio mt-2">
              Sessão válida. Em breve adicionaremos cards e ações reais.
            </p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        <div className="border border-cinza-claro rounded-lg p-4 bg-cinza-muito-claro">
          <p className="text-sm text-cinza-medio">Usuário</p>
          <p className="text-lg font-semibold text-cinza-escuro">{user.email}</p>
          <p className="text-sm text-cinza-medio mt-1">Role: {user.role}</p>
          <p className="text-sm text-cinza-medio">ID: {user.id}</p>
          <p className="text-sm text-cinza-medio">
            Ativo: {user.ativo ? "Sim" : "Não"} | E-mail verificado:{" "}
            {user.emailVerificado ? "Sim" : "Não"}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-cinza-claro rounded-lg p-4">
            <h3 className="text-lg font-semibold text-cinza-escuro mb-2">
              Próximos passos
            </h3>
            <ul className="list-disc list-inside text-cinza-medio space-y-1 text-sm">
              <li>Adicionar formulários de paciente/prescritor</li>
              <li>Conectar com fluxo de prescrição</li>
              <li>Dashboard com cards reais</li>
            </ul>
          </div>
          <div className="border border-cinza-claro rounded-lg p-4">
            <h3 className="text-lg font-semibold text-cinza-escuro mb-2">
              Status da sessão
            </h3>
            <p className="text-sm text-cinza-medio">
              Token armazenado em cookie/LocalStorage. Use este espaço para métricas ou atalhos.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
