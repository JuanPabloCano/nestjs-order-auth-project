import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as RX from 'rxjs';
import { Repository_key } from '../../infrastructure/config/enums.config';
import { InvalidStockException } from '../../infrastructure/exceptions/invalid-stock.exception';
import { OrderProductEntity } from '../entities/order-product.entity';
import {
  ProductEntity,
  ProductEntityInterface,
} from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { ProductServiceInterface } from './interfaces/product-service.interface';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @Inject(Repository_key.PRODUCT)
    private readonly productRepository: ProductRepository,
  ) {}

  public createProduct(
    product: ProductEntity,
  ): RX.Observable<ProductEntityInterface> {
    return RX.from(this.productRepository.createProduct(product));
  }

  public findAll(): RX.Observable<ProductEntityInterface[]> {
    return RX.from(this.productRepository.findAllProducts());
  }

  public findById(id: string): RX.Observable<ProductEntityInterface> {
    return RX.from(this.productRepository.findProductById(id));
  }

  public update(
    id: string,
    product: Partial<ProductEntity>,
  ): RX.Observable<ProductEntityInterface> {
    return RX.from(this.productRepository.updateProduct(id, product));
  }

  public updateStockQuantity(
    products: OrderProductEntity[],
  ): RX.Observable<ProductEntityInterface[]> {
    const observables = products.map((orderProduct) => {
      return this.findById(orderProduct.productId).pipe(
        RX.filter((productEntity) => productEntity.stock < 0),
        RX.throwIfEmpty(
          () =>
            new InvalidStockException(
              'There`s no stock for this product',
              HttpStatus.BAD_REQUEST,
            ),
        ),
        RX.mergeMap((productEntity) => {
          productEntity.stock -= orderProduct.quantity;
          return this.update(productEntity.id, productEntity);
        }),
      );
    });

    return RX.forkJoin(observables);
  }
}
