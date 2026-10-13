import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProducerService } from '../service/producer/producer.service.js';
import { GeneratorService } from '../service/generator/generator.service.js';

@Injectable()
export class DataProducerJob {
  private readonly logger = new Logger(DataProducerJob.name);
  constructor(
    private readonly producerService: ProducerService,
    private readonly generatorService: GeneratorService,
  ) {}

  @Cron('*/5 * * * * *')
  async handlePublishFixedTemperature() {
    const temperature = this.generatorService.generate();
    await this.producerService.publishTemperature(temperature);
    this.logger.debug('Called every 5 seconds');
  }
}
