import { Column, Entity, OneToMany } from 'typeorm';
import { OrderProductEntity } from '../../domain/entities/order-product.entity';
import { OrderEntityInterface } from '../../domain/entities/order.entity';
import { BaseData } from '../base/base.data';
import { OrderProductData } from './order-product.data';

@Entity('order')
export class OrderData extends BaseData implements OrderEntityInterface {
  @Column()
  public userId: string;

  @OneToMany(() => OrderProductData, (item) => item.order, { cascade: true })
  public products: OrderProductEntity[];

  @Column()
  public total: number;
}
