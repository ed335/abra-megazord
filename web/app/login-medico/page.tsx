import type { Metadata } from 'next';
import LoginMedicoClient from './LoginMedicoClient';

export const metadata: Metadata = {
  title: 'Portal do Médico | ABRACANM',
  description:
    'Acesse o portal exclusivo para médicos prescritores da ABRACANM.',
  alternates: { canonical: '/login-medico' },
};

export default function Page() {
  return <LoginMedicoClient />;
}
