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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RABBITMQ_TICKETS_MICROSERVICE } from '../../config';
import {
  AssignTicketDto,
  CloseTicketDto,
  CreateTicketDto,
  FindEmployeeTicketsDto,
  GetTicketImageDto,
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
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

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

  @Auth(
    ValidRoles.employee,
    ValidRoles.supervisor,
    ValidRoles.admin,
    ValidRoles.super_user,
  )
  @Get()
  findMany(@Query() ticketPaginationDto: TicketsPaginationDto) {
    return sendToMicroservice<TicketsPaginationDto>(
      this.client,
      'ticket.find-many',
      ticketPaginationDto,
    );
  }

  @Auth()
  @Get('/types')
  findTypes() {
    return sendToMicroservice(this.client, 'ticket.find-types', {});
  }

  @Auth()
  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return sendToMicroservice<{ id: string }>(this.client, 'ticket.find-one', {
      id,
    });
  }

  @Auth(
    ValidRoles.employee,
    ValidRoles.supervisor,
    ValidRoles.admin,
    ValidRoles.super_user,
  )
  @Patch('update-status/:ticketId/:status')
  updateTicketStatus(@Param() updateTicketStatusDto: UpdateTicketStatusDto) {
    return sendToMicroservice<UpdateTicketStatusDto>(
      this.client,
      'ticket.update-status',
      updateTicketStatusDto,
    );
  }

  @Auth(
    ValidRoles.employee,
    ValidRoles.supervisor,
    ValidRoles.admin,
    ValidRoles.super_user,
  )
  @Patch('update-priority/:ticketId/:priority')
  updateTicketPriority(@Param() updateTicketPriority: UpdateTicketPriorityDto) {
    return sendToMicroservice<UpdateTicketPriorityDto>(
      this.client,
      'ticket.update-priority',
      updateTicketPriority,
    );
  }

  @Auth(ValidRoles.supervisor, ValidRoles.admin, ValidRoles.super_user)
  @Patch('assign/id/:ticketId/employee/:userId')
  assignTicket(@Param() assignTicketDto: AssignTicketDto) {
    return sendToMicroservice(this.client, 'ticket.assign', assignTicketDto);
  }

  @Auth(
    ValidRoles.employee,
    ValidRoles.supervisor,
    ValidRoles.admin,
    ValidRoles.super_user,
  )
  @Get('employee-tickets/:userId')
  findEmployeeTickets(@Param() findEmployeeTicketsDto: FindEmployeeTicketsDto) {
    return sendToMicroservice(
      this.client,
      'ticket.find-for-employee',
      findEmployeeTicketsDto,
    );
  }

  @Auth(ValidRoles.user)
  @Get('my-cases')
  findMyCases(@GetUser() user: User) {
    return sendToMicroservice(this.client, 'ticket.find-cases', {
      userId: user.id,
    });
  }

  @Auth(
    ValidRoles.employee,
    ValidRoles.supervisor,
    ValidRoles.admin,
    ValidRoles.super_user,
  )
  @Patch('close')
  closeTicket(@Body() closeTicketDto: CloseTicketDto) {
    return sendToMicroservice(this.client, 'ticket.close', closeTicketDto);
  }

  @Auth()
  @Get('img/:name')
  async getTicketImage(
    @Param() getTicketImageDto: GetTicketImageDto,
    @Res() res: Response,
  ) {
    try {
      const buffer = Buffer.from(
        await firstValueFrom(
          this.client.send('ticket.image', getTicketImageDto),
        ),
      );
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(buffer);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'Not found',
      });
    }
  }
}
