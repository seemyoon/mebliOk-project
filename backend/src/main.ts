import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //temporary
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('MebliOK')
    .setDescription('MebliOK API')
    .setVersion('1.0')
    .addBearerAuth({
      bearerFormat: 'JWT',
      in: 'header',
      scheme: 'bearer',
      type: 'http',
    })
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  await app.listen(appConfig.port, () => {
    console.log(
      `Server is running on http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger is running  on http://${appConfig.host}:${appConfig.port}/docs`,
    );
    console.log(
      `Minio Object Store is running on http://${appConfig.host}:8001/browser`,
    );
  });
}

void bootstrap();
