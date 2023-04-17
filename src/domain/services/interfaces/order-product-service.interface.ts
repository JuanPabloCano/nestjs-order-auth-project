import { Observable } from 'rxjs';
import {
  OrderProductEntity,
  OrderProductInterface,
} from '../../entities/order-product.entity';

export interface OrderProductServiceInterface {
  createOrderProduct(
    orderProduct: OrderProductEntity,
  ): Observable<OrderProductInterface>;
}
