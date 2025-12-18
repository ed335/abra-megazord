import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, getPrismaClient } from '@/lib/admin-auth';

const prisma = getPrismaClient();

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
    
    const search = url.searchParams.get('search') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const estado = url.searchParams.get('estado') || '';
    const patologia = url.searchParams.get('patologia') || '';
    const status = url.searchParams.get('status') || '';
    const temAnamnese = url.searchParams.get('temAnamnese') || '';

    const where: any = {};
    
    if (search) {
      where.OR = [
        { nome: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { whatsapp: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (cidade) {
      where.cidade = { contains: cidade, mode: 'insensitive' };
    }
    
    if (estado) {
      where.estado = estado.toUpperCase();
    }
    
    if (patologia) {
      where.patologiaCID = { contains: patologia, mode: 'insensitive' };
    }
    
    if (status === 'ativo') {
      where.usuario = { ativo: true };
    } else if (status === 'inativo') {
      where.usuario = { ativo: false };
    }
    
    if (temAnamnese === 'sim') {
      where.documentosMedicosUrls = { isEmpty: false };
    } else if (temAnamnese === 'nao') {
      where.documentosMedicosUrls = { isEmpty: true };
    }

    const [associados, total] = await Promise.all([
      prisma.paciente.findMany({
        where,
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
        include: {
          usuario: {
            select: {
              ativo: true,
              emailVerificado: true,
            }
          }
        }
      }),
      prisma.paciente.count({ where })
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
