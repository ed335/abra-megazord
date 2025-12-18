import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getAssociados(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [associados, total] = await Promise.all([
      this.prisma.paciente.findMany({
        skip,
        take: limit,
        orderBy: { criadoEm: 'desc' },
        select: {
          id: true,
          nome: true,
          email: true,
          whatsapp: true,
          cidade: true,
          estado: true,
          jaUsaCannabis: true,
          patologiaCID: true,
          termoAjuizamento: true,
          consenteLGPD: true,
          criadoEm: true,
          usuario: {
            select: {
              ativo: true,
              emailVerificado: true,
            },
          },
        },
      }),
      this.prisma.paciente.count(),
    ]);

    return {
      data: associados,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAssociadoById(id: string) {
    return this.prisma.paciente.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            email: true,
            ativo: true,
            emailVerificado: true,
            criadoEm: true,
          },
        },
      },
    });
  }
}
