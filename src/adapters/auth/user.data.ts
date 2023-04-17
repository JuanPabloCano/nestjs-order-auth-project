import { Column, Entity } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { BaseData } from '../base/base.data';

@Entity('users')
export class UserData extends BaseData implements UserEntity {
  @Column()
  public fullName: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  public document: string;

  @Column()
  public email: string;

  @Column({
    type: 'int',
  })
  public age: number;

  @Column()
  public password: string;
}
