import { Module } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { ProducerService } from '../service/producer/producer.service.js';
import { DataProducerJob } from '../scheduler/DataProducerJob.js';

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
    DataProducerJob,
  ],
  exports: ['KAFKA', ProducerService],
})
export class KafkaModule {}
