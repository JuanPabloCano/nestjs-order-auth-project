import { Inject, Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { from, map, mergeMap, Observable } from 'rxjs';
import { Repository_key } from '../../infrastructure/config/enums.config';
import { OrderEntity, OrderEntityInterface } from '../entities/order.entity';
import { OrderRepository } from '../repositories/order.repository';
import { OrderServiceInterface } from './interfaces/order-service.interface';
import { ProductService } from './product.service';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject(Repository_key.ORDER)
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
  ) {}

  public createOrder(order: OrderEntity): Observable<OrderEntityInterface> {
    const newOrder = this.orderBuilder(order);
    const products = newOrder.products;

    const updateStockQuantity =
      this.productService.updateStockQuantity(products);

    newOrder.calculateTotalOrderPrice();

    return from(this.orderRepository.createOrder(newOrder)).pipe(
      mergeMap((createdOrder) =>
        updateStockQuantity.pipe(map(() => createdOrder)),
      ),
    );
  }

  public getOrders(): Observable<OrderEntityInterface[]> {
    return from(this.orderRepository.getOrders());
  }

  private orderBuilder(order: OrderEntity): OrderEntity {
    return Builder(OrderEntity)
      .id(order.id)
      .userId(order.userId)
      .products(order.products)
      .total(order.total)
      .build();
  }
}
