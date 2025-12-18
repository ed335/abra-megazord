import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as jsonwebtoken from 'jsonwebtoken';

const prisma = new PrismaClient();

function getJWTSecret(): string {
  return process.env.JWT_SECRET || 'abracanm-secret-key-2024';
}

async function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  console.log('Auth header:', authHeader ? 'present' : 'missing');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No valid auth header');
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const jwtSecret = getJWTSecret();
    const decoded = jsonwebtoken.verify(token, jwtSecret) as { sub: string; role: string };
    console.log('Token decoded, role:', decoded.role);
    
    if (decoded.role !== 'ADMIN') {
      console.log('User is not admin');
      return null;
    }
    
    return decoded;
  } catch (err) {
    console.log('Token verification failed:', err);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyAdminToken(request);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Apenas administradores podem acessar.' },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const [associados, total] = await Promise.all([
      prisma.paciente.findMany({
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
        include: {
          usuario: {
            select: {
              ativo: true,
              emailVerificado: true,
            }
          },
          preAnamnese: true
        }
      }),
      prisma.paciente.count()
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: associados,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Erro ao buscar associados:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar associados' },
      { status: 500 }
    );
  }
}
