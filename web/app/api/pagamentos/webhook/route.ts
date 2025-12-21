import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SyncpayWebhookPayload, isPaymentCompleted, isPaymentFailed } from '@/lib/syncpay';

// Verify webhook authenticity using Authorization header (Bearer token)
function verifyWebhookAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('Authorization');
  const expectedSecret = process.env.SYNCPAY_WEBHOOK_SECRET || process.env.SYNCPAY_CLIENT_SECRET;
  
  if (!expectedSecret) {
    console.warn('SYNCPAY_WEBHOOK_SECRET não configurado - aceitando webhooks sem verificação');
    return true;
  }

  if (!authHeader) {
    return false;
  }

  // Syncpay sends: Authorization: Bearer {TOKEN}
  const token = authHeader.replace('Bearer ', '');
  return token === expectedSecret;
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook authenticity
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

    // Find payment by Syncpay identifier
    const pagamento = await (prisma as any).pagamento.findUnique({
      where: { syncpayIdentifier: identifier },
      include: { assinatura: true, paciente: true }
    });

    if (!pagamento) {
      console.warn('Pagamento não encontrado para identifier:', identifier);
      return NextResponse.json({ received: true, message: 'Pagamento não encontrado' });
    }

    // Update payment status
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

      // If it's a subscription payment, activate it
      if (pagamento.assinaturaId) {
        const dataInicio = new Date();
        const dataFim = new Date();
        dataFim.setMonth(dataFim.getMonth() + 1); // 1 month subscription

        await (prisma as any).assinatura.update({
          where: { id: pagamento.assinaturaId },
          data: {
            status: 'ATIVA',
            dataInicio,
            dataFim,
            proximaCobranca: dataFim,
          }
        });
      }

      console.log('Pagamento confirmado:', pagamento.id);

    } else if (isPaymentFailed(status)) {
      await (prisma as any).pagamento.update({
        where: { id: pagamento.id },
        data: {
          status: 'FALHOU',
          webhookRecebido: true,
          webhookData: payload as object,
        }
      });

      console.log('Pagamento falhou:', pagamento.id);
    } else {
      // Just update webhook data for other statuses
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

// Also handle GET for webhook verification (some gateways check this)
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ABRACANM Webhooks' });
}
