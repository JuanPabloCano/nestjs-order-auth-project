import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { OpenApi } from './infrastructure/config/OpenApi';
import { GlobalExceptionFilter } from './infrastructure/exceptions/global-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.connectMicroservice<MicroserviceOptions>(grpcClientConfig);

  const document = OpenApi.swaggerConfig(app);
  SwaggerModule.setup('/', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  //await app.startAllMicroservices();
  await app.listen(3000, () => {
    Logger.log(`Open server on http://localhost:3000`);
    Logger.log(`To health check visit http://localhost:3000/check`);
  });
}

bootstrap();
