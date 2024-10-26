import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_REPORTS_MICROSERVICE } from '../../config';
import { sendToMicroservice } from 'src/common';

@Controller('reports')
export class ReportsController {
  constructor(
    @Inject(RABBITMQ_REPORTS_MICROSERVICE) private readonly client: ClientProxy,
  ) {}

  @Get('/gen')
  generateReport() {
    return sendToMicroservice(this.client, 'report.generate.employees', {});
  }
}
