import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtGuard } from '../../adapters/auth/jwt/jwt.guard';
import { OrderEntityInterface } from '../../domain/entities/order.entity';
import { OrderService } from '../../domain/services/order.service';
import { CreateOrderDto } from './create-order.dto';

@UseGuards(JwtGuard)
@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public createOrder(
    @Body()
    createOrderDto: CreateOrderDto,
  ): Observable<OrderEntityInterface> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  public findAllOrders(): Observable<OrderEntityInterface[]> {
    return from(this.orderService.getOrders());
  }
}
