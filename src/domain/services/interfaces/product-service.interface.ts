import { Observable } from 'rxjs';
import {
  ProductEntity,
  ProductEntityInterface,
} from '../../entities/product.entity';

export interface ProductServiceInterface {
  createProduct(product: ProductEntity): Observable<ProductEntityInterface>;

  findAll(): Observable<ProductEntityInterface[]>;

  findById(id: string): Observable<ProductEntityInterface>;

  update(
    id: string,
    product: Partial<ProductEntity>,
  ): Observable<ProductEntityInterface>;
}
