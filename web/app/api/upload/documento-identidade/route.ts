import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
export const dynamic = 'force-dynamic';

const UPLOADS_DIR = join(process.cwd(), '..', 'backend', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Arquivo de documento é obrigatório' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Arquivo muito grande. Máximo 10MB.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Tipo de arquivo não permitido. Use: JPG, PNG, GIF, WebP ou PDF' },
        { status: 400 }
      );
    }

    await mkdir(UPLOADS_DIR, { recursive: true });

    const ext = file.name.split('.').pop() || 'bin';
    const filename = `${uuidv4()}.${ext}`;
    const filepath = join(UPLOADS_DIR, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    return NextResponse.json({
      success: true,
      message: 'Documento de identidade enviado com sucesso',
      data: {
        filename,
        url: `/uploads/${filename}`,
        originalName: file.name,
        size: file.size,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar upload' },
      { status: 500 }
    );
  }
}
