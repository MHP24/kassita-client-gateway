import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_USERS_MICROSERVICE } from '../../config';
import { sendToMicroservice, ValidRoles } from '../../common';
import { FindEmployeeDto, UpdateRolesDto } from './dto';
import { Auth } from '../auth/decorators';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(RABBITMQ_USERS_MICROSERVICE) private readonly client: ClientProxy,
  ) {}

  @Auth(ValidRoles.supervisor)
  @Get('employees')
  findEmployees() {
    return sendToMicroservice(this.client, 'users.find-employees', {});
  }

  @Auth(ValidRoles.supervisor)
  @Get('employee/id/:userId')
  findEmployee(@Param() findEmployeeDto: FindEmployeeDto) {
    return sendToMicroservice(
      this.client,
      'users.find-employee',
      findEmployeeDto,
    );
  }

  @Auth(ValidRoles.admin, ValidRoles.super_user)
  @Patch('roles/:userId')
  updateRoles(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    return sendToMicroservice(this.client, 'users.update-roles', {
      userId,
      ...updateRolesDto,
    });
  }
}
