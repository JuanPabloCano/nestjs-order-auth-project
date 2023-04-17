import { Module } from '@nestjs/common';
import { OrdersController } from '../../controllers/orders/orders.controller';
import { OrderService } from '../../domain/services/order.service';
import { ProductModule } from '../product/product.module';
import { OrderAdapter } from './order.adapter';

@Module({
  imports: [ProductModule],
  providers: [OrderAdapter, OrderService],
  controllers: [OrdersController],
  exports: [OrderService],
})
export class OrderModule {}
