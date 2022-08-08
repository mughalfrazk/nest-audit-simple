import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.use(cookieSession({
    keys: ['super-secret-key']
  }))

  const config = new DocumentBuilder()
    .setTitle('Documents Example')
    .setDescription('The cats API Description')
    .setVersion('1.0')
    .addTag('Cats')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(5000);
}
bootstrap();
