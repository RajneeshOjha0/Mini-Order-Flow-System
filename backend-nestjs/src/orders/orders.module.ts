import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { KafkaService } from '../common/kafka.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrdersService, KafkaService],
  controllers: [OrdersController],
})
export class OrdersModule {}
