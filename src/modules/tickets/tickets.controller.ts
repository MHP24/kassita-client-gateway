import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../../config';
import { firstValueFrom } from 'rxjs';

@Controller('tickets')
export class TicketsController {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createTicketDto: any) {
    return await firstValueFrom(
      this.client.send('create-ticket', { createTicketDto }),
    );
  }
}
