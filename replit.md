# ABRACANM - Associação Brasileira de Cannabis Medicinal

## Overview
ABRACANM é uma plataforma completa para gestão de pacientes de cannabis medicinal. O sistema oferece cadastro de associados com documentação médica, agendamento de consultas, integração com Stripe para pagamentos, consultas por vídeo e geração de prescrições digitais.

**Missão:** Acolher pacientes em busca de qualidade de vida através da medicina canábica, quebrando barreiras e tabus com ciência, segurança e humanidade.

## Project Structure
- `/web` - Next.js 14 frontend (React, Tailwind CSS)
- `/backend` - NestJS API (TypeScript, Prisma ORM)
- `/docs` - Documentation files

## Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: NestJS 10, Prisma 5, PostgreSQL
- **Authentication**: JWT with Passport.js

## Development

### Running the App
- Frontend runs on port 5000 (configured for Replit)
- Backend API runs on port 3001 (localhost)

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `API_PORT` - Backend port (default: 3001)
- `API_HOST` - Backend host (default: localhost)
- `JWT_SECRET` - JWT signing secret

### Database
Uses PostgreSQL with Prisma ORM. Schema is in `/backend/prisma/schema.prisma`.

To sync database schema:
```bash
cd backend && npx prisma db push
```

## API Endpoints

### Auth (via Next.js API Routes → Backend proxy)
- `POST /api/auth/register-associado` - Complete member registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Upload (via Next.js API Routes)
- `POST /api/upload/documento-identidade` - Upload ID document (max 10MB)
- `POST /api/upload/documentos-medicos` - Upload medical documents (up to 5 files)

### Admin (Role: ADMIN only)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/associados` - List all members (paginated, with filters)
- `GET /api/admin/associados/:id` - Get member details
- `PUT /api/admin/associados/:id` - Update member
- `DELETE /api/admin/associados/:id` - Delete member
- `POST /api/admin/associados/:id/toggle-status` - Toggle active/inactive
- `GET /api/admin/associados/:id/documentos` - View member documents
- `GET /api/admin/admins` - List administrators
- `POST /api/admin/admins` - Create administrator
- `DELETE /api/admin/admins/:id` - Delete administrator

### Other
- `GET /health` - Health check
- `POST /quiz/intake` - Submit intake quiz

## Working Features

### Member Registration (4 steps)
1. **Dados e Termos** - Nome, WhatsApp, email, senha + confirmação (sem copiar/colar), aceite de LGPD/Termos/Política de Privacidade
2. **Endereço** - CEP com auto-preenchimento via ViaCEP
3. **Documento** - Upload de documento de identidade com foto
4. **Informações Médicas** - Dropdown de patologias comuns com CID + opção "Outras", uso de cannabis, documentos médicos

### Other Features
- User registration and login with JWT authentication
- Pre-anamnese otimizada (6 steps) - usa dados do cadastro, sem duplicação
- Diagnóstico ABRACANM personalizado - gerado após pré-anamnese
- Dashboard com diagnóstico, indicações, recomendações e próximo passo
- All data saved to PostgreSQL database

### Admin Panel (Role: ADMIN only)
- **Dashboard** com estatísticas: total de associados, ativos/inativos, novos no mês, crescimento
- **Gráficos**: cadastros por mês, distribuição por estado, distribuição por patologia
- **Busca e Filtros**: nome, email, WhatsApp, cidade, estado, patologia, status, pré-anamnese
- **CRUD de Associados**: editar dados, ativar/desativar, excluir com confirmação
- **Visualizador de Documentos**: RG e laudos médicos com preview de imagens
- **Multi-administradores**: criar e gerenciar múltiplos admins
- **Autenticação centralizada**: verificação de token JWT + validação de admin ativo

### Pre-Anamnese System
- Pré-anamnese vinculada ao Paciente (modelo PreAnamnese)
- Não coleta dados já cadastrados (email, whatsapp, cidade, estado)
- Gera diagnóstico personalizado baseado em:
  - Patologia do paciente (CID)
  - Se já usa cannabis medicinal
  - Intensidade dos sintomas (gravidade)
  - Comorbidades e contraindicações
- Dashboard exibe: título, resumo, indicações, contraindicações, recomendações, próximo passo, score de prioridade

## Patologias Comuns (CID)
- Epilepsia (G40)
- Dor crônica (R52.1)
- Ansiedade (F41)
- Fibromialgia (M79.7)
- Esclerose Múltipla (G35)
- Parkinson (G20)
- Autismo (F84.0)
- TDAH (F90)
- Insônia (G47.0)
- Artrite Reumatoide (M06.9)
- Dor Oncológica (C80)
- Depressão (F32)
- TEPT (F43.1)
- Síndrome de Tourette (F95.2)
- Alzheimer (G30)

## Branding & Communication
- **Nome**: ABRACANM - Associação Brasileira de Cannabis Medicinal
- **Email**: ouvidoria@abracanm.org.br
- **Tom**: Acolhedor, medicinal, neutro - foco em saúde, qualidade de vida e longevidade
- **Objetivo**: Quebrar barreiras e tabus, ser acessível a todos os públicos

## Recent Changes (Dec 2024)
- Configured for Replit environment with API Routes proxy
- Updated branding to ABRACANM
- Reorganized registration: terms on step 1, 4 steps total
- Added password confirmation with copy/paste prevention
- Added dropdown with common pathologies and CID codes
- Removed pre-anamnese from home (now in dashboard only)
- Updated footer with ouvidoria email and "Fale com o Presida" button
- Updated all texts with welcoming, medical, and neutral tone
- Added role-based access control (RolesGuard) for admin endpoints
- **Admin Panel Completo**: dashboard com estatísticas, gráficos, busca/filtros, CRUD, visualização de documentos, multi-admin
- **Segurança aprimorada**: autenticação JWT centralizada sem fallback, validação de admin ativo no banco

### Audit Logs
- Registro de todas as ações dos administradores
- Tipos de ação: LOGIN, LOGOUT, CRIAR, ATUALIZAR, EXCLUIR, VISUALIZAR, ATIVAR, DESATIVAR, ENVIO_WHATSAPP
- Filtros por tipo de ação, recurso e período
- Acesso via `/admin/logs`

### WhatsApp Mass Messaging
- Templates com variáveis dinâmicas: {nome}, {primeiro_nome}, {cidade}, {estado}, {patologia}
- Filtros de destinatários por estado, cidade, patologia e status
- Validação de números de telefone (mínimo 10 dígitos)
- Gera links wa.me para envio direto
- Acesso via `/admin/whatsapp`

### Scheduling Module (Agendamentos)
- Agendamento de consultas com data, hora e duração
- Tipos de consulta: Primeira Consulta, Retorno, Acompanhamento, Urgente
- Status: Agendado, Confirmado, Em Andamento, Concluído, Cancelado, Faltou
- Dashboard com estatísticas: hoje, semana, mês
- Filtros por status, tipo e período
- Link para videochamada (opcional)
- Integração com pacientes cadastrados
- Acesso via `/admin/agendamentos`

### UI/UX Updates (Dec 2024)
- **Shared Header Component**: `web/components/shared/Header.tsx` - logo clicável para home, navegação consistente
- **Design Minimalista**: fundos brancos, sem gradientes, layout limpo
- **Admin Dashboard com Abas**: aba "Estatísticas" e aba "Associados" na mesma tela
- **Navegação Consistente**: Header padrão nas páginas de dashboard e pré-anamnese
- **Barra de Progresso Animada**: formulário de cadastro com barra de progresso igual à pré-anamnese
- **Mostrar/Ocultar Senha**: botão de olho nos campos de senha para visualização
- **Validação Visual de Termos**: checkboxes de termos ficam vermelho quando não marcados
- **Animações de Transição**: slides suaves entre passos do formulário (Framer Motion)
- **Ícones nos Passos**: cada etapa do cadastro tem ícone representativo (User, MapPin, FileText, Stethoscope)

### LGPD Compliance (Dec 2024)
- **Política de Privacidade**: `/politica-privacidade` - documento completo com todas as seções exigidas pela LGPD
- **Termos de Uso**: `/termos-uso` - condições de uso, responsabilidades, propriedade intelectual
- **Política de Cookies**: `/politica-cookies` - tipos de cookies, finalidades, gerenciamento

## Security Notes
- JWT_SECRET must be configured as environment variable (no fallback)
- Admin tokens are validated against database to ensure account exists and is active
- Centralized authentication utility in `web/lib/admin-auth.ts`
