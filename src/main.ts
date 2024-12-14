import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config({ path: `${process.cwd()}/.env` });

async function bootstrap() {
  const configService = new ConfigService();
  const logger = new Logger(AppModule.name);
  const port = configService.get<string>('PORT');

  //TODO: Could update this to fastify
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: configService.get<string>('ALLOW_ORIGIN') ?? '*' },
  });
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('TITLE'))
    .setDescription(configService.get<string>('DESCRIPTION'))
    .setVersion(configService.get<string>('VERSION'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api-docs', app, document);

  const PORT = port ?? '3000';
  await app.listen(PORT, () => {
    logger.log('wallet service running on port: ' + PORT);
  });
}
bootstrap();
