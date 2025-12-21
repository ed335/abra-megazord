import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { getJWTSecret } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    
    let decoded: any;
    try {
      const jwtSecret = getJWTSecret();
      decoded = jwt.verify(token, jwtSecret);
    } catch {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.sub },
      include: { paciente: true, prescritor: true, admin: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    let nome = '';
    let cpf = '';
    if (usuario.paciente) {
      nome = usuario.paciente.nome;
      cpf = usuario.paciente.cpf || '';
    } else if (usuario.prescritor) {
      nome = usuario.prescritor.nome;
    }

    return NextResponse.json({
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
      nome,
      cpf,
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar usuário' },
      { status: 500 }
    );
  }
}
