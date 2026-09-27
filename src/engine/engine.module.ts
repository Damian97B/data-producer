import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module.js';
import { EngineController } from '../controller/engine/engine.controller.js';

@Module({
  imports: [KafkaModule],
  controllers: [EngineController],
})
export class EngineModule {}
