import { OrderProductEntity } from './order-product.entity';

export interface OrderEntityInterface {
  id?: string;
  userId?: string;
  products?: OrderProductEntity[];
  total?: number;
}

export class OrderEntity implements OrderEntityInterface {
  readonly id?: string;
  readonly userId?: string;
  readonly products?: OrderProductEntity[];
  total?: number;

  public calculateTotalOrderPrice?(): void {
    this.total = this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }
}
