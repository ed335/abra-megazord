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
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (protected)
- `POST /quiz/intake` - Submit intake quiz

## Working Features
- User registration and login with JWT authentication
- Pre-anamnese quiz (7 steps) with data persistence
- Dashboard with user session info
- All data saved to PostgreSQL database

## Recent Changes (Dec 2024)
- Configured for Replit environment
- Updated CORS to allow all origins
- Updated Next.js config for Replit proxy compatibility
- Synchronized database schema with Prisma (all tables created)
- Tested end-to-end: registration, login, quiz submission
