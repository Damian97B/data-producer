import { Module } from '@nestjs/common';
import { GeneratorService } from '../../service/generator/generator.service.js';
import { ConfigurationController } from '../../controller/configuration/configuration.controller.js';

@Module({
  controllers: [ConfigurationController],
  providers: [GeneratorService],
  exports: [GeneratorService],
})
export class GeneratorModule {}
