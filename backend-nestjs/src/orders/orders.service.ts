import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { KafkaService } from '../common/kafka.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    private readonly kafka: KafkaService,
  ) { }

  async create(userId: number, amount: number) {
    const order = this.ordersRepo.create({ amount, user: { id: userId } as any });
    const saved = await this.ordersRepo.save(order);
    // emit kafka event for logs
    await this.kafka.send('orders_log', { order_id: saved.id, timestamp: new Date().toISOString() });
    return saved;
  }
  //to get data off orders
  async findForUser(userId: number) {
    return this.ordersRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
  }

  async findOne(orderId: string) {
    const order = await this.ordersRepo.findOne({ where: { id: orderId } });
    console.log(order,"ggg");
    if (!order) {
      throw new Error('Order not found');
    }
    return {status:'success',data:order};
  }
}
