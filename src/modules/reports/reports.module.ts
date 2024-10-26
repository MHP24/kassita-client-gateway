import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReportsController } from './reports.controller';
import { envs, RABBITMQ_REPORTS_MICROSERVICE } from '../../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_REPORTS_MICROSERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.rabbitMqUrl],
          queue: envs.reportsMsRabbitMqQueue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
