import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SyncpayWebhookPayload, isPaymentCompleted, isPaymentFailed } from '@/lib/syncpay';

function verifyWebhookAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization');
  const expectedSecret = process.env.SYNCPAY_WEBHOOK_SECRET || process.env.SYNCPAY_CLIENT_SECRET;
  
  if (!expectedSecret) {
    console.error('SYNCPAY_WEBHOOK_SECRET não configurado - rejeitando webhooks por segurança');
    return false;
  }

  if (!authHeader) {
    return false;
  }

  const token = authHeader.replace('Bearer ', '');
  return token === expectedSecret;
}

function calcularDuracaoPlano(tipoPlano: string): number {
  switch (tipoPlano) {
    case 'TRIMESTRAL':
      return 3;
    case 'SEMESTRAL':
      return 6;
    case 'ANUAL':
      return 12;
    case 'MENSAL':
    default:
      return 1;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyWebhookAuth(request)) {
      console.warn('Webhook rejeitado: autenticação inválida');
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const event = request.headers.get('event');
    const payload: SyncpayWebhookPayload = await request.json();

    console.log('Webhook recebido:', { event, identifier: payload.data?.id, status: payload.data?.status });

    if (!payload.data?.id) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
    }

    const identifier = payload.data.id;
    const status = payload.data.status;

    const pagamento = await (prisma as any).pagamento.findUnique({
      where: { syncpayIdentifier: identifier },
      include: { 
        assinatura: {
          include: {
            plano: true
          }
        }, 
        paciente: true 
      }
    });

    if (!pagamento) {
      console.warn('Pagamento não encontrado para identifier:', identifier);
      return NextResponse.json({ received: true, message: 'Pagamento não encontrado' });
    }

    if (pagamento.status === 'PAGO' && isPaymentCompleted(status)) {
      console.log('Webhook duplicado ignorado - pagamento já processado:', pagamento.id);
      return NextResponse.json({ received: true, status: 'already_processed' });
    }

    if (isPaymentCompleted(status)) {
      await (prisma as any).pagamento.update({
        where: { id: pagamento.id },
        data: {
          status: 'PAGO',
          pagoEm: new Date(),
          webhookRecebido: true,
          webhookData: payload as object,
        }
      });

      if (pagamento.assinaturaId && pagamento.assinatura) {
        const tipoPlano = pagamento.assinatura.plano?.tipo || 'MENSAL';
        const meses = calcularDuracaoPlano(tipoPlano);
        
        const dataInicio = new Date();
        const dataFim = new Date();
        dataFim.setMonth(dataFim.getMonth() + meses);

        await (prisma as any).assinatura.update({
          where: { id: pagamento.assinaturaId },
          data: {
            status: 'ATIVA',
            dataInicio,
            dataFim,
            proximaCobranca: dataFim,
          }
        });

        console.log(`Assinatura ${pagamento.assinaturaId} ativada por ${meses} mês(es)`);
      }

      console.log('Pagamento confirmado:', pagamento.id);

    } else if (isPaymentFailed(status)) {
      if (pagamento.status !== 'FALHOU') {
        await (prisma as any).pagamento.update({
          where: { id: pagamento.id },
          data: {
            status: 'FALHOU',
            webhookRecebido: true,
            webhookData: payload as object,
          }
        });
        console.log('Pagamento falhou:', pagamento.id);
      }
    } else {
      await (prisma as any).pagamento.update({
        where: { id: pagamento.id },
        data: {
          webhookRecebido: true,
          webhookData: payload as object,
        }
      });
    }

    return NextResponse.json({ received: true, status: 'processed' });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ABRACANM Webhooks' });
}
