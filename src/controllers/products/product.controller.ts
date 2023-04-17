import * as CT from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { from, Observable } from 'rxjs';
import { JwtGuard } from '../../adapters/auth/jwt/jwt.guard';
import {
  ProductEntity,
  ProductEntityInterface,
} from '../../domain/entities/product.entity';
import { ProductService } from '../../domain/services/product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@ApiTags('Products')
@CT.Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @CT.UseGuards(JwtGuard)
  @CT.Post()
  public createProduct(
    @CT.Body() createProductDto: CreateProductDto,
  ): Observable<ProductEntityInterface> {
    return from(this.productService.createProduct(createProductDto));
  }

  @CT.Get()
  public getAllProducts(): Observable<ProductEntityInterface[]> {
    return from(this.productService.findAll());
  }

  @CT.UseGuards(JwtGuard)
  @CT.Patch(':id')
  public updateProduct(
    @CT.Param('id') id: string,
    @CT.Body() updateProductDto: UpdateProductDto,
  ): Observable<ProductEntity> {
    return from(this.productService.update(id, updateProductDto));
  }
}
