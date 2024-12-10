import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  //TODO: Could update this to fastify
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
