import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderProductInterface } from '../../domain/entities/order-product.entity';
import { BaseData } from '../base/base.data';
import { OrderData } from './order.data';

@Entity('order_product')
export class OrderProductData
  extends BaseData
  implements OrderProductInterface
{
  @Column()
  public productId: string;

  @Column()
  public quantity: number;

  @Column()
  public price: number;

  @ManyToOne(() => OrderData, (order) => order.products)
  public order: OrderData;
}
