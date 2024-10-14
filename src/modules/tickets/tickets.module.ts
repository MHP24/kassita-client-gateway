import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TicketsController } from './tickets.controller';
import { envs, RABBITMQ_TICKETS_MICROSERVICE } from '../../config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_TICKETS_MICROSERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queueOptions: { durable: false },
          queue: envs.ticketsMsRabbitMqQueue,
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [TicketsController],
})
export class TicketsModule {}
