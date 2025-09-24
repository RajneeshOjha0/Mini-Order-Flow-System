import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  async onModuleInit() {
    try {
      const kafka = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID || 'nestjs-app',
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        ssl: false,
        sasl: process.env.KAFKA_USERNAME
          ? {
              mechanism: 'plain',
              username: process.env.KAFKA_USERNAME,
              password: process.env.KAFKA_PASSWORD,
            }
          : undefined,
      });
      this.producer = kafka.producer();
      await this.producer.connect();
      console.log('Connected to Kafka');
    } catch (err) {
      console.warn('Kafka connect failed', err.message || err);
    }
  }

  async send(topic: string, message: any) {
    if (!this.producer) {
      console.warn('Kafka producer not available, skipping send');
      return;
    }
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (err) {
      console.error('Kafka send error', err);
    }
  }

  async onModuleDestroy() {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }
}
