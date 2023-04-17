import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class OpenApi {
  public static swaggerConfig(app: INestApplication) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Order, Authorization and Authentication Challenge')
      .setDescription('Reactive Nestjs API with RxJs and clean architecture')
      .setVersion('1.0')
      .build();
    return SwaggerModule.createDocument(app, config);
  }
}
