import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import {
  ProductEntity,
  ProductEntityInterface,
} from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ThrowConflictException } from '../../infrastructure/exceptions/conflict.exception';
import { ProductData } from './product.data';

@Injectable()
export class ProductAdapter implements ProductRepository {
  constructor(
    @InjectRepository(ProductData)
    private readonly productRepository: Repository<ProductData>,
  ) {}

  public createProduct(
    product: ProductEntity,
  ): Observable<ProductEntityInterface> {
    return from(this.productRepository.save(product));
  }

  public findAllProducts(): Observable<ProductEntity[]> {
    return from(this.productRepository.find());
  }

  public findProductById(id: string): Observable<ProductEntity> {
    return from(this.productRepository.findOneBy({ id })).pipe(
      catchError(() => throwError(() => ThrowConflictException('Product', id))),
    );
  }

  public updateProduct(
    id: string,
    product: Partial<ProductEntity>,
  ): Observable<ProductEntity> {
    return from(this.productRepository.update(id, product)).pipe(
      switchMap(() => this.findProductById(id)),
    );
  }
}
