export interface ProductEntityInterface {
  id?: string;
  title: string;
  description?: string;
  stock: number;
  price: number;
}

export class ProductEntity implements ProductEntityInterface {
  readonly id?: string;
  readonly title: string;
  readonly description?: string;
  stock: number;
  readonly price: number;
}
