import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import {
  OrderEntity,
  OrderEntityInterface,
} from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { OrderData } from './order.data';

@Injectable()
export class OrderAdapter implements OrderRepository {
  constructor(
    @InjectRepository(OrderData)
    private readonly orderRepository: Repository<OrderData>,
  ) {}

  public createOrder(order: OrderEntity): Observable<OrderEntityInterface> {
    return from(this.orderRepository.save(order));
  }

  public getOrders(): Observable<OrderEntityInterface[]> {
    return from(this.orderRepository.find({ relations: ['products'] }));
  }
}
