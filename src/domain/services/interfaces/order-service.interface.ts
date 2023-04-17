import { Observable } from 'rxjs';
import { OrderEntity, OrderEntityInterface } from '../../entities/order.entity';

export interface OrderServiceInterface {
  createOrder(order: OrderEntity): Observable<OrderEntityInterface>;
  getOrders(): Observable<OrderEntityInterface[]>;
}
