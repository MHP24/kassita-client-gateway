import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../../config';
import { CreateTicketDto } from './dto';
import { sendToMicroservice } from '../../common';

@Controller('tickets')
export class TicketsController {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return sendToMicroservice<CreateTicketDto>(
      this.client,
      'create-ticket',
      createTicketDto,
    );
  }
}
