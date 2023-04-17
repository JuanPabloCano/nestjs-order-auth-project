export interface OrderProductInterface {
  id?: string;
  productId?: string;
  quantity?: number;
  price?: number;
}

export class OrderProductEntity implements OrderProductInterface {
  readonly id?: string;
  readonly productId?: string;
  readonly quantity?: number;
  price?: number;
}
