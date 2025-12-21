import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'abracanm-secret-key-2024';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      nome,
      cpf,
      email,
      whatsapp,
      senha,
      password,
      consenteLGPD,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      documentoIdentidadeUrl,
      patologiaCID,
      jaUsaCannabis,
      documentosMedicosUrls,
    } = body;

    const senhaFinal = senha || password;
    
    if (!nome || !cpf || !email || !whatsapp || !senhaFinal) {
      return NextResponse.json(
        { message: 'Dados obrigatórios não informados' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(senhaFinal, 10);

    const usuario = await prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
        role: 'PACIENTE',
        paciente: {
          create: {
            nome,
            cpf,
            email,
            whatsapp,
            consenteLGPD: consenteLGPD || false,
            consentimentoEm: consenteLGPD ? new Date() : null,
            cep: cep || null,
            rua: rua || null,
            numero: numero || null,
            complemento: complemento || null,
            bairro: bairro || null,
            cidade: cidade || null,
            estado: estado || null,
            documentoIdentidadeUrl: documentoIdentidadeUrl || null,
            patologiaCID: patologiaCID || null,
            jaUsaCannabis: jaUsaCannabis || false,
            documentosMedicosUrls: documentosMedicosUrls || [],
          },
        },
      },
      include: {
        paciente: true,
      },
    });

    const token = jwt.sign(
      { 
        sub: usuario.id, 
        email: usuario.email, 
        role: usuario.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: 'Cadastro realizado com sucesso',
      user: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        nome: usuario.paciente?.nome,
      },
      access_token: token,
    });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Erro ao processar cadastro' },
      { status: 500 }
    );
  }
}
