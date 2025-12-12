import type { Metadata } from 'next';
import CadastroClient from './CadastroClient';

export const metadata: Metadata = {
  title: 'Cadastro | Abracanm - Associação Brasileira de Cannabis Medicinal',
  description:
    'Crie sua conta na Abracanm para acessar conteúdo, pré-anamnese e orientação segura sobre cannabis medicinal.',
  alternates: { canonical: '/cadastro' },
};

export default function Page() {
  return <CadastroClient />;
}
