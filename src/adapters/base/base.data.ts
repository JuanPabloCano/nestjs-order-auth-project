import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseData {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly created_at: Date;
}
