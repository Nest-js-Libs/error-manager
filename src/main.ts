import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorManagerModule } from './lib/error-manager.module';

export const swaggerConfig = app => {
  const options = new DocumentBuilder()
    .setTitle('ERROR MANAGER')
    .setDescription('The ERROR MANAGER API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};


async function bootstrap() {
  const app = await NestFactory.create(ErrorManagerModule);
  swaggerConfig(app);
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();