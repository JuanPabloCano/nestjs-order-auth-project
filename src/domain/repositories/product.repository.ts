import { Observable } from 'rxjs';
import {
  ProductEntity,
  ProductEntityInterface,
} from '../entities/product.entity';

export interface ProductRepository {
  createProduct(product: ProductEntity): Observable<ProductEntityInterface>;
  updateProduct(
    id: string,
    product: Partial<ProductEntity>,
  ): Observable<ProductEntity>;
  findAllProducts(): Observable<ProductEntity[]>;
  findProductById(id: string): Observable<ProductEntity>;
}
