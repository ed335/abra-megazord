import type { Metadata } from 'next';
import CadastroAssociadoClient from './CadastroAssociadoClient';

export const metadata: Metadata = {
  title: 'Cadastro de Associado | ABRACANN',
  description:
    'Torne-se um associado da ABRACANN para acessar tratamento seguro com cannabis medicinal.',
  alternates: { canonical: '/cadastro' },
};

export default function Page() {
  return <CadastroAssociadoClient />;
}
