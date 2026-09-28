import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly producer: Producer;
  private readonly topic = 'engine-temperature';

  constructor(
    @Inject('KAFKA')
    private readonly kafka: Kafka,
  ) {
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();

    const admin = this.kafka.admin();

    await admin.connect();

    await admin.createTopics({
        topics: [
        {
            topic: this.topic,
            numPartitions: 1,
            replicationFactor: 1,
        },
        ],
    });

    await admin.disconnect();

    console.log(`Topic: "${this.topic}"`);
    console.log('Kafka producer connected');
    }

  async onModuleDestroy() {
    await this.producer.disconnect();

    console.log('Kafka producer disconnected');
  }

  async publishTemperature(temperature: number) {
    await this.producer.send({
      topic: this.topic,
      messages: [
        {
          key: 'engine-temperature',
          value: String(temperature),
          headers: {
            TIMESTAMP: new Date().toISOString(),
          },
        },
      ],
    });

    console.log(`Added temperature: ${temperature}`);
  }
}
