import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'abracanm-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { paciente: true, prescritor: true, admin: true },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const passwordValid = await bcrypt.compare(password, usuario.password);
    if (!passwordValid) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { sub: usuario.id, email: usuario.email, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    let nome = '';
    if (usuario.paciente) nome = usuario.paciente.nome;
    else if (usuario.prescritor) nome = usuario.prescritor.nome;

    return NextResponse.json({
      access_token: token,
      user: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        nome,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erro ao processar login' },
      { status: 500 }
    );
  }
}
