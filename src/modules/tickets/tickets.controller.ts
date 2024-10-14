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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_TICKETS_MICROSERVICE } from '../../config';
import {
  CreateTicketDto,
  TicketsPaginationDto,
  UpdateTicketPriorityDto,
  UpdateTicketStatusDto,
} from './dto';
import {
  sendToMicroservice,
  UploadedFilesDto,
  User,
  ValidRoles,
} from '../../common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Auth, GetUser } from '../auth/decorators';

@Controller('tickets')
export class TicketsController {
  constructor(
    @Inject(RABBITMQ_TICKETS_MICROSERVICE) private readonly client: ClientProxy,
  ) {}

  @Auth(ValidRoles.user)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 3 }]))
  create(
    @Body() createTicketDto: CreateTicketDto,
    @UploadedFiles() uploadedFilesDto: UploadedFilesDto,
    @GetUser() user: User,
  ) {
    return sendToMicroservice(this.client, 'ticket.create', {
      ...createTicketDto,
      images:
        uploadedFilesDto?.files?.map(({ originalname, mimetype, buffer }) => ({
          originalname,
          mimetype,
          base64: buffer.toString('base64'),
        })) ?? [],
      user: {
        id: user.id,
        username: user.username,
        apartment: user.apartment,
        email: user.email,
      },
    });
  }

  @Get()
  findMany(@Query() ticketPaginationDto: TicketsPaginationDto) {
    return sendToMicroservice<TicketsPaginationDto>(
      this.client,
      'ticket.find-many',
      ticketPaginationDto,
    );
  }

  @Get('/types')
  findTypes() {
    return sendToMicroservice(this.client, 'ticket.find-types', {});
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
