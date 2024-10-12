import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TicketsController } from './tickets.controller';
import { envs, RABBITMQ_SERVICE } from '../../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queueOptions: { durable: false },
          queue: envs.ticketsMsRabbitMqQueue,
        },
      },
    ]),
  ],
  controllers: [TicketsController],
})
export class TicketsModule {}
