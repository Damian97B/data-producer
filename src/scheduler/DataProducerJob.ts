import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProducerService } from '../service/producer/producer.service.js';

@Injectable()
export class DataProducerJob {
  private readonly logger = new Logger(DataProducerJob.name);
  constructor(private readonly producerService: ProducerService) {}

  @Cron('*/5 * * * * *')
  async handlePublishFixedTemperature() {
    const temperature = 25.0;
    await this.producerService.publishTemperature(temperature);
    this.logger.debug('Called every 5 seconds');
  }
}
