import { Module } from '@nestjs/common';
import { ProductController } from '../../controllers/products/product.controller';
import { ProductService } from '../../domain/services/product.service';
import { ProductAdapter } from './product.adapter';

@Module({
  providers: [ProductAdapter, ProductService],
  controllers: [ProductController],
  exports: [ProductAdapter, ProductService],
})
export class ProductModule {}
