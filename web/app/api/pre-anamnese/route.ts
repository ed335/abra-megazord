import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as jsonwebtoken from 'jsonwebtoken';

interface PreAnamneseRequest {
  perfil: 'PACIENTE_NOVO' | 'EM_TRATAMENTO' | 'CUIDADOR';
  objetivoPrincipal: string;
  gravidade: number;
  tratamentosPrevios: string[];
  comorbidades: string[];
  notas: string;
  preferenciaAcompanhamento: string;
  melhorHorario: string;
}

interface DiagnosticoResult {
  titulo: string;
  resumo: string;
  nivelUrgencia: 'baixa' | 'moderada' | 'alta';
  indicacoes: string[];
  contraindicacoes: string[];
  observacoes: string;
}

function getJWTSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET não configurado');
  }
  return secret;
}

function generateDiagnostico(data: PreAnamneseRequest, patologiaCID: string | null, jaUsaCannabis: boolean): DiagnosticoResult {
  const diagnostico: DiagnosticoResult = {
    titulo: '',
    resumo: '',
    nivelUrgencia: 'baixa',
    indicacoes: [],
    contraindicacoes: [],
    observacoes: ''
  };

  if (jaUsaCannabis) {
    diagnostico.titulo = 'Acompanhamento de Paciente em Tratamento';
    diagnostico.resumo = 'Você já utiliza cannabis medicinal. Recomendamos uma consulta para avaliar a eficácia do tratamento atual e possíveis ajustes.';
  } else if (data.perfil === 'CUIDADOR') {
    diagnostico.titulo = 'Orientação para Cuidador';
    diagnostico.resumo = 'Como cuidador, você terá acesso a orientações especializadas para apoiar o tratamento do paciente sob sua responsabilidade.';
  } else {
    diagnostico.titulo = 'Avaliação Inicial para Cannabis Medicinal';
    diagnostico.resumo = 'Baseado nas suas respostas, identificamos que você pode se beneficiar de uma avaliação médica especializada em cannabis medicinal.';
  }

  if (data.gravidade >= 4) {
    diagnostico.nivelUrgencia = 'alta';
    diagnostico.observacoes = 'Seus sintomas indicam alta intensidade. Recomendamos agendar uma consulta o mais breve possível.';
  } else if (data.gravidade >= 3) {
    diagnostico.nivelUrgencia = 'moderada';
    diagnostico.observacoes = 'Sintomas de intensidade moderada identificados. Uma consulta nas próximas semanas é aconselhável.';
  } else {
    diagnostico.nivelUrgencia = 'baixa';
    diagnostico.observacoes = 'Sintomas de baixa intensidade. Você pode agendar sua consulta conforme sua disponibilidade.';
  }

  if (patologiaCID) {
    const patologias: Record<string, string[]> = {
      'G40': ['Epilepsia - tratamento com CBD tem forte evidência científica', 'Possível redução de crises convulsivas'],
      'R52.1': ['Dor crônica - cannabis pode auxiliar no manejo da dor', 'Possível redução do uso de opioides'],
      'F41': ['Ansiedade - CBD demonstra potencial ansiolítico', 'Melhora na qualidade do sono como benefício secundário'],
      'M79.7': ['Fibromialgia - cannabis pode ajudar no controle da dor e sono', 'Melhora potencial na qualidade de vida'],
      'G35': ['Esclerose Múltipla - evidências para espasticidade', 'Possível melhora em dor neuropática'],
      'G20': ['Parkinson - potencial melhora em tremores e rigidez', 'CBD pode auxiliar em sintomas não-motores'],
      'F84.0': ['TEA - estudos mostram melhora em agitação e sono', 'CBD pode auxiliar em comportamentos repetitivos'],
      'F90': ['TDAH - pesquisas em andamento mostram potencial', 'Pode auxiliar na regulação do foco e ansiedade'],
      'G47.0': ['Insônia - THC e CBD podem melhorar qualidade do sono', 'Redução do tempo para adormecer'],
    };

    const cidCode = patologiaCID.split(' ')[0]?.replace(/[()]/g, '');
    if (cidCode && patologias[cidCode]) {
      diagnostico.indicacoes = patologias[cidCode];
    } else {
      diagnostico.indicacoes = ['Avaliação médica necessária para determinar indicações específicas'];
    }
  }

  if (data.comorbidades.includes('Gestação/planejamento')) {
    diagnostico.contraindicacoes.push('Cannabis é contraindicada durante gestação e amamentação');
    diagnostico.nivelUrgencia = 'alta';
  }
  if (data.comorbidades.includes('Histórico psiquiátrico')) {
    diagnostico.contraindicacoes.push('Avaliação psiquiátrica recomendada antes de iniciar tratamento');
  }

  return diagnostico;
}

function generateRecomendacoes(data: PreAnamneseRequest, diagnostico: DiagnosticoResult): string[] {
  const recomendacoes: string[] = [];

  recomendacoes.push('Agende uma consulta com um médico prescritor da ABRACANM');

  if (data.tratamentosPrevios.length > 0 && !data.tratamentosPrevios.includes('Nenhum')) {
    recomendacoes.push('Leve seus laudos e receitas de tratamentos anteriores para a consulta');
  }

  if (diagnostico.nivelUrgencia === 'alta') {
    recomendacoes.push('Priorize o agendamento da consulta devido à intensidade dos sintomas');
  }

  if (data.perfil === 'CUIDADOR') {
    recomendacoes.push('Providencie documentação que comprove a tutela ou responsabilidade pelo paciente');
  }

  recomendacoes.push('Mantenha um diário de sintomas até a data da consulta');

  return recomendacoes;
}

function generateProximoPasso(preferencia: string): string {
  if (preferencia === 'Online') {
    return 'Agende sua teleconsulta com um médico prescritor especializado em cannabis medicinal';
  } else if (preferencia === 'Presencial') {
    return 'Encontre um médico prescritor parceiro da ABRACANM próximo à sua região';
  }
  return 'Escolha entre teleconsulta ou atendimento presencial e agende sua avaliação médica';
}

function calculateScorePrioridade(data: PreAnamneseRequest, diagnostico: DiagnosticoResult): number {
  let score = data.gravidade * 20;
  
  if (diagnostico.nivelUrgencia === 'alta') score += 30;
  else if (diagnostico.nivelUrgencia === 'moderada') score += 15;
  
  if (diagnostico.contraindicacoes.length > 0) score += 10;
  
  return Math.min(score, 100);
}

async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const jwtSecret = getJWTSecret();
    const decoded = jsonwebtoken.verify(token, jwtSecret) as { sub: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyToken(request);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para responder a pré-anamnese' },
        { status: 401 }
      );
    }

    const paciente = await prisma.paciente.findUnique({
      where: { usuarioId: decoded.sub }
    });

    if (!paciente) {
      return NextResponse.json(
        { error: 'Perfil de paciente não encontrado' },
        { status: 404 }
      );
    }

    const existingPreAnamnese = await prisma.preAnamnese.findUnique({
      where: { pacienteId: paciente.id }
    });

    if (existingPreAnamnese) {
      return NextResponse.json(
        { error: 'Você já respondeu a pré-anamnese. Acesse seu diagnóstico no dashboard.' },
        { status: 400 }
      );
    }

    const body: PreAnamneseRequest = await request.json();

    const diagnostico = generateDiagnostico(body, paciente.patologiaCID, paciente.jaUsaCannabis);
    const recomendacoes = generateRecomendacoes(body, diagnostico);
    const proximoPasso = generateProximoPasso(body.preferenciaAcompanhamento);
    const scorePrioridade = calculateScorePrioridade(body, diagnostico);

    await prisma.preAnamnese.create({
      data: {
        pacienteId: paciente.id,
        perfil: body.perfil,
        objetivoPrincipal: body.objetivoPrincipal,
        gravidade: body.gravidade,
        tratamentosPrevios: body.tratamentosPrevios,
        comorbidades: body.comorbidades,
        notas: body.notas,
        preferenciaAcompanhamento: body.preferenciaAcompanhamento,
        melhorHorario: body.melhorHorario,
        diagnostico: JSON.parse(JSON.stringify(diagnostico)),
        scorePrioridade: scorePrioridade,
        recomendacoes: recomendacoes,
        proximosPasso: proximoPasso
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Pré-anamnese salva com sucesso',
      diagnostico: {
        ...diagnostico,
        recomendacoes,
        proximoPasso,
        scorePrioridade
      }
    });

  } catch (error) {
    console.error('Erro na pré-anamnese:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pré-anamnese' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyToken(request);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const paciente = await prisma.paciente.findUnique({
      where: { usuarioId: decoded.sub }
    });

    if (!paciente) {
      return NextResponse.json(
        { error: 'Perfil de paciente não encontrado' },
        { status: 404 }
      );
    }

    const preAnamnese = await prisma.preAnamnese.findUnique({
      where: { pacienteId: paciente.id }
    });

    if (!preAnamnese) {
      return NextResponse.json({
        completed: false,
        message: 'Pré-anamnese ainda não respondida'
      });
    }

    return NextResponse.json({
      completed: true,
      preAnamnese: preAnamnese
    });

  } catch (error) {
    console.error('Erro ao buscar pré-anamnese:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pré-anamnese' },
      { status: 500 }
    );
  }
}
