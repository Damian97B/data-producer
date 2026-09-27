import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller.js';
import { AppService } from './service/app.service.js';
import { UsersController } from './controller/users/users.controller.js';
import { KafkaModule } from './kafka/kafka.module.js';
import { ProducerService } from './service/producer/producer.service.js';
import { ConsumerService } from './service/consumer/consumer.service.js';
import { EngineController } from './controller/engine/engine.controller.js';
import { EngineModule } from './engine/engine.module.js';

@Module({
  imports: [KafkaModule, EngineModule],
  controllers: [AppController, UsersController, EngineController],
  providers: [AppService, ProducerService, ConsumerService],
})
export class AppModule {}
