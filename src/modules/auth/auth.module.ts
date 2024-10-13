import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
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
          queue: envs.authMsRabbitMqQueue,
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
