import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const PORT = 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.use('/images', express.static(join(__dirname, "..", 'images')))
  await app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));
}
bootstrap();
