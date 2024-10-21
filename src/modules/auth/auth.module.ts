import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { envs, RABBITMQ_AUTH_MICROSERVICE } from '../../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_AUTH_MICROSERVICE,
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
  exports: [
    ClientsModule.register([
      {
        name: RABBITMQ_AUTH_MICROSERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queueOptions: { durable: false },
          queue: envs.authMsRabbitMqQueue,
        },
      },
    ]),
  ],
})
export class AuthModule {}
