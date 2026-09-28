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
          brokers: (process.env.KAFKA_BROKERS ?? 'localhost:29092').split(','),
        });
      },
    },
    ProducerService,
    DataProducerJob,
  ],
  exports: ['KAFKA', ProducerService],
})
export class KafkaModule {}
