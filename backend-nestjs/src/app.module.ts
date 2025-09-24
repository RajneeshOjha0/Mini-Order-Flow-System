import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { RedisService } from './common/redis.service';
import { KafkaService } from './common/kafka.service';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: typeormConfig }),
    AuthModule,    //auth module
    OrdersModule,    //order module
  ],
  providers: [RedisService, KafkaService],
  exports: [RedisService, KafkaService],
})
export class AppModule {}
