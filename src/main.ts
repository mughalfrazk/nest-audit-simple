import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cookieSession({
      keys: ['super-secret-key'],
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documents Example')
    .setDescription('The cats API Description')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Employee')
    .addTag('Role')
    .addTag('Company')
    .addTag('Designation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(5000);
}
bootstrap();
