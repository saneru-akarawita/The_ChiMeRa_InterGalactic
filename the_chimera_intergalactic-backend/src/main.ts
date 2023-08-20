import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '10mb' }));

  // enable body validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          messages: error.constraints
            ? (() => {
                // convert the constraints object to an array of messages
                const messages = Object.values(error.constraints);
                return messages;
              })()
            : ['Something went wrong'],
        }));
        return new BadRequestException({
          errorMessages: result,
          statusCode: 400,
          error: 'Bad Request',
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('The Chimera Intergalactic API')
    .setDescription('The Chimera Intergalactic API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
