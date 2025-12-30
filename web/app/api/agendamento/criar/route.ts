import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { getJWTSecret } from '@/lib/jwt';

async function enviarWhatsAppConfirmacao(
  whatsapp: string,
  nomePaciente: string,
  nomeMedico: string,
  dataHora: Date
) {
  const evolutionApiUrl = process.env.EVOLUTION_API_URL;
  const evolutionApiKey = process.env.EVOLUTION_API_KEY;
  const evolutionInstance = process.env.EVOLUTION_INSTANCE;

  if (!evolutionApiUrl || !evolutionApiKey || !evolutionInstance) {
    console.log('Evolution API não configurada, pulando envio de WhatsApp');
    return false;
  }

  try {
    const dataFormatada = dataHora.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const horaFormatada = dataHora.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const mensagem = `Olá ${nomePaciente}! 🌿

Sua consulta foi agendada com sucesso!

📅 *Data:* ${dataFormatada}
⏰ *Horário:* ${horaFormatada}
👨‍⚕️ *Médico:* ${nomeMedico}

Você receberá o link para a teleconsulta no dia da sua consulta.

Em caso de dúvidas, entre em contato conosco.

ABRACANM - Associação Brasileira de Cannabis Medicinal`;

    const whatsappFormatado = whatsapp.replace(/\D/g, '');

    const response = await fetch(`${evolutionApiUrl}/message/sendText/${evolutionInstance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': evolutionApiKey,
      },
      body: JSON.stringify({
        number: `55${whatsappFormatado}`,
        text: mensagem,
      }),
    });

    if (response.ok) {
      console.log('WhatsApp de confirmação enviado com sucesso');
      return true;
    } else {
      console.error('Erro ao enviar WhatsApp:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    let decoded: { sub: string };
    try {
      const jwtSecret = getJWTSecret();
      decoded = jwt.verify(token, jwtSecret) as { sub: string };
    } catch {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const { medicoId, data, horario, tipo, motivo } = await request.json();

    if (!medicoId || !data || !horario) {
      return NextResponse.json(
        { error: 'medicoId, data e horario são obrigatórios' },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.sub },
      include: { paciente: true },
    });

    if (!usuario?.paciente) {
      return NextResponse.json(
        { error: 'Paciente não encontrado' },
        { status: 404 }
      );
    }

    const medico = await prisma.prescritor.findUnique({
      where: { id: medicoId },
    });

    if (!medico) {
      return NextResponse.json(
        { error: 'Médico não encontrado' },
        { status: 404 }
      );
    }

    const [hora, minuto] = horario.split(':').map(Number);
    const dataHora = new Date(data);
    dataHora.setHours(hora, minuto, 0, 0);

    const conflito = await prisma.agendamento.findFirst({
      where: {
        prescritorId: medicoId,
        dataHora,
        status: {
          in: ['AGENDADO', 'CONFIRMADO', 'EM_ANDAMENTO'],
        },
      },
    });

    if (conflito) {
      return NextResponse.json(
        { error: 'Horário não está mais disponível' },
        { status: 409 }
      );
    }

    const salaId = `abracanm-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const agendamento = await prisma.agendamento.create({
      data: {
        pacienteId: usuario.paciente.id,
        prescritorId: medicoId,
        dataHora,
        duracao: medico.duracaoConsulta,
        tipo: tipo || 'PRIMEIRA_CONSULTA',
        status: 'AGENDADO',
        motivo,
        salaId,
      },
      include: {
        prescritor: {
          select: { nome: true, especialidade: true },
        },
        paciente: {
          select: { nome: true, whatsapp: true },
        },
      },
    });

    const whatsappEnviado = await enviarWhatsAppConfirmacao(
      agendamento.paciente.whatsapp,
      agendamento.paciente.nome,
      agendamento.prescritor?.nome || 'Médico ABRACANM',
      dataHora
    );

    if (whatsappEnviado) {
      await prisma.agendamento.update({
        where: { id: agendamento.id },
        data: { whatsappConfirmacaoEnviado: true },
      });
    }

    return NextResponse.json({
      success: true,
      agendamento: {
        id: agendamento.id,
        dataHora: agendamento.dataHora,
        medico: agendamento.prescritor?.nome,
        especialidade: agendamento.prescritor?.especialidade,
        status: agendamento.status,
        whatsappEnviado,
      },
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar agendamento' },
      { status: 500 }
    );
  }
}
