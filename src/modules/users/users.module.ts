import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { envs, RABBITMQ_USERS_MICROSERVICE } from '../../config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_USERS_MICROSERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: envs.usersMsRabbitMqQueue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
