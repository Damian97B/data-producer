import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from '../../service/producer/producer.service.js';

@Controller('engine')
export class EngineController {
  constructor(
    private readonly producerService: ProducerService,
  ) {}

  @Post('temperatures/publish')
  async publishTemperature(
    @Body() body: { temperature: number },
  ) {
    await this.producerService.publishTemperature(body.temperature);

    return {
      success: true,
    };
  }
}
