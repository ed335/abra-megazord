import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const allowedOrigins = (
    process.env.CORS_ORIGINS ||
    'http://localhost:3000,http://23.251.148.183:3000,http://23.251.148.183'
  )
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: false,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.API_PORT ? Number(process.env.API_PORT) : 3001;
  const host = process.env.API_HOST ?? '0.0.0.0';

  await app.listen(port, host);
  const logger = new Logger('Bootstrap');
  logger.log(`Backend running on http://${host}:${port}`);
}

bootstrap();
