import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, getPrismaClient } from '@/lib/admin-auth';

const prisma = getPrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = await verifyAdminToken(request);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Acesso não autorizado' },
        { status: 403 }
      );
    }

    const associado = await prisma.paciente.findUnique({
      where: { id: params.id },
      include: { usuario: true }
    });

    if (!associado) {
      return NextResponse.json(
        { error: 'Associado não encontrado' },
        { status: 404 }
      );
    }

    const novoStatus = !associado.usuario.ativo;

    await prisma.usuario.update({
      where: { id: associado.usuarioId },
      data: { ativo: novoStatus }
    });

    return NextResponse.json({ 
      success: true, 
      ativo: novoStatus,
      message: novoStatus ? 'Associado ativado com sucesso' : 'Associado desativado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar status:', error);
    return NextResponse.json(
      { error: 'Erro ao alterar status do associado' },
      { status: 500 }
    );
  }
}
