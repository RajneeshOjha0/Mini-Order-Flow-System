import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  onModuleInit() {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    this.client = new Redis(url);
    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });
    this.client.on('error', (err) => {
      console.error('Redis error', err);
    });
  }

  async set(key: string, value: string, ttlSeconds: number) {
    await this.client.set(key, value, 'EX', ttlSeconds);   //setting key-value and time 
  }

  async get(key: string) {     //geting accoring to key
    return this.client.get(key);
  }
 
  async del(key: string) {   //after otp veriifed remove it
    return this.client.del(key);
  }
}
