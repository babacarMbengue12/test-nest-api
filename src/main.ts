import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json } from 'express';
import { AppModule } from './app.module';

const SERVICE_PREFIX = process.env.SERVICE_PREFIX || 'api-gateway/api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.SERVICE_PREFIX || SERVICE_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Api gateway')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
      bearerFormat: 'JWT',
      scheme: 'bearer',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${SERVICE_PREFIX}/docs`, app, document);

  app.use(json({ limit: '50mb' }));
  await app.listen(process.env.PORT || 3000);
  Logger.log(`Service is running on: ${await app.getUrl()}`);
}
bootstrap();
