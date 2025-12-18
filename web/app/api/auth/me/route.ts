import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'abracanm-secret-key-2024';

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
      decoded = jwt.verify(token, JWT_SECRET);
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
    if (usuario.paciente) nome = usuario.paciente.nome;
    else if (usuario.prescritor) nome = usuario.prescritor.nome;

    return NextResponse.json({
      id: usuario.id,
      email: usuario.email,
      role: usuario.role,
      nome,
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar usuário' },
      { status: 500 }
    );
  }
}
