import { Module } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { ProducerService } from '../service/producer/producer.service.js';

@Module({
  providers: [
    {
      provide: 'KAFKA',
      useFactory: () => {
        return new Kafka({
          clientId: 'data-producer',
          brokers: ['localhost:29092'],
        });
      },
    },
    ProducerService,
  ],
  exports: ['KAFKA', ProducerService],
})
export class KafkaModule {}
