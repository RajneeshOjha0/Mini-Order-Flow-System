import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;                 //primary key id of users table

  @Column({ unique: true })
  mobile: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 1 })
  status: number;        // when we disable the user mark it to 0

  @OneToMany(() => Order, o => o.user)
  orders: Order[];
}
