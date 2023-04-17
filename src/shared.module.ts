import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './adapters/auth/auth.module';
import { AuthService } from './adapters/auth/auth.service';
import { UserData } from './adapters/auth/user.data';
import { OrderProductData } from './adapters/order/order-product.data';
import { OrderAdapter } from './adapters/order/order.adapter';
import { OrderData } from './adapters/order/order.data';
import { OrderModule } from './adapters/order/order.module';
import { ProductAdapter } from './adapters/product/product.adapter';
import { ProductData } from './adapters/product/product.data';
import { ProductModule } from './adapters/product/product.module';
import { StorageModule } from './adapters/storage/storage.module';
import { HealthCheckController } from './controllers/health-check/health-check.controller';
import { UserController } from './controllers/users/user.controller';
import { Repository_key } from './infrastructure/config/enums.config';

@Global()
@Module({
  imports: [
    TerminusModule,
    HttpModule,
    AuthModule,
    ProductModule,
    OrderModule,
    StorageModule,
    TypeOrmModule.forFeature([
      UserData,
      ProductData,
      OrderData,
      OrderProductData,
    ]),
  ],
  providers: [
    { provide: Repository_key.USER, useClass: AuthService },
    { provide: Repository_key.PRODUCT, useClass: ProductAdapter },
    { provide: Repository_key.ORDER, useClass: OrderAdapter },
  ],
  controllers: [HealthCheckController, UserController],
  exports: [
    Repository_key.USER,
    Repository_key.PRODUCT,
    Repository_key.ORDER,
    TypeOrmModule,
  ],
})
export class SharedModule {}
