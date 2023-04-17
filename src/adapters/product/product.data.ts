import { Column, Entity } from 'typeorm';
import { ProductEntityInterface } from '../../domain/entities/product.entity';
import { BaseData } from '../base/base.data';

@Entity('products')
export class ProductData extends BaseData implements ProductEntityInterface {
  @Column()
  title: string;

  @Column({
    default: 'Insert description',
  })
  description: string;

  @Column()
  stock: number;

  @Column()
  price: number;
}
