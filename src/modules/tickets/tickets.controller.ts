import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '../../config';
import {
  CreateTicketDto,
  TicketsPaginationDto,
  UpdateTicketPriorityDto,
  UpdateTicketStatusDto,
} from './dto';
import { sendToMicroservice } from '../../common';

@Controller('tickets')
export class TicketsController {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return sendToMicroservice<CreateTicketDto>(
      this.client,
      'ticket.create',
      createTicketDto,
    );
  }

  @Get()
  findMany(@Query() ticketPaginationDto: TicketsPaginationDto) {
    return sendToMicroservice<TicketsPaginationDto>(
      this.client,
      'ticket.find-many',
      ticketPaginationDto,
    );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return sendToMicroservice<{ id: string }>(this.client, 'ticket.find-one', {
      id,
    });
  }

  @Patch('update-status/:ticketId/:status')
  updateTicketStatus(@Param() updateTicketStatusDto: UpdateTicketStatusDto) {
    return sendToMicroservice<UpdateTicketStatusDto>(
      this.client,
      'ticket.update-status',
      updateTicketStatusDto,
    );
  }

  @Patch('update-priority/:ticketId/:priority')
  updateTicketPriority(@Param() updateTicketPriority: UpdateTicketPriorityDto) {
    return sendToMicroservice<UpdateTicketPriorityDto>(
      this.client,
      'ticket.update-priority',
      updateTicketPriority,
    );
  }
}
