# AbraCann Project

## Overview
AbraCann is a full-stack application for medical cannabis patient management. It features a Next.js frontend and a NestJS backend with PostgreSQL database.

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
- `NEXT_PUBLIC_API_URL` - Backend API URL for frontend (http://localhost:3001)

### Database
Uses PostgreSQL with Prisma ORM. Schema is in `/backend/prisma/schema.prisma`.

To sync database schema:
```bash
cd backend && npx prisma db push
```

## API Endpoints

### Auth
- `POST /auth/register` - Basic user registration
- `POST /auth/register-associado` - Complete member registration with medical info
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (protected)

### Upload
- `POST /upload/documento-identidade` - Upload ID document (single file, max 10MB)
- `POST /upload/documentos-medicos` - Upload medical documents (up to 5 files, max 10MB each)

### Admin (Role: ADMIN only)
- `GET /admin/associados` - List all members (paginated)
- `GET /admin/associados/:id` - Get member details

### Other
- `GET /health` - Health check
- `POST /quiz/intake` - Submit intake quiz

## Working Features
- User registration and login with JWT authentication
- **NEW**: Complete member registration flow (5 steps):
  1. Personal data (name, email, password, WhatsApp)
  2. Address with CEP auto-fill (ViaCEP integration)
  3. ID document upload
  4. Medical information (pathology with CID, existing cannabis use, medical documents)
  5. Legal terms (ajuizamento + LGPD consent)
- Pre-anamnese quiz (7 steps) with data persistence
- Dashboard with user session info
- **NEW**: Admin panel with member list (protected by role-based access)
- All data saved to PostgreSQL database

## Paciente Model Fields
Key fields for member registration:
- `nome`, `email`, `whatsapp` (required)
- `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado` (address)
- `documentoIdentidadeUrl` (ID document)
- `jaUsaCannabis`, `patologiaCID` (medical info)
- `documentosMedicosUrls` (array of medical document URLs)
- `termoAjuizamento`, `termoAjuizamentoEm` (legal term)
- `consenteLGPD`, `consentimentoEm` (LGPD consent)

## Recent Changes (Dec 2024)
- Configured for Replit environment
- Updated CORS to allow all origins
- Updated Next.js config for Replit proxy compatibility
- Synchronized database schema with Prisma (all tables created)
- Tested end-to-end: registration, login, quiz submission
- **NEW**: Added complete member registration system with 5-step wizard
- **NEW**: Added file upload API (ID + medical documents)
- **NEW**: Added admin panel with member list
- **NEW**: Added role-based access control (RolesGuard)
