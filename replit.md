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
- Backend API runs on port 3001

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-configured)
- `API_PORT` - Backend port (default: 3001)
- `JWT_SECRET` - JWT signing secret

### Database
Uses PostgreSQL with Prisma ORM. Schema is in `/backend/prisma/schema.prisma`.

To run migrations:
```bash
cd backend && npx prisma migrate deploy
```

## API Endpoints
- `GET /health` - Health check
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user (protected)
- `POST /quiz/intake` - Submit intake quiz

## Recent Changes
- Configured for Replit environment
- Updated CORS to allow all origins
- Updated Next.js config for Replit proxy compatibility
- Set up PostgreSQL database with Prisma migrations
