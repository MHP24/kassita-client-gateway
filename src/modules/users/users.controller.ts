import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FindEmployeesDto } from './dto';
import { RABBITMQ_USERS_MICROSERVICE } from '../../config';
import { sendToMicroservice } from '../../common';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(RABBITMQ_USERS_MICROSERVICE) private readonly client: ClientProxy,
  ) {}

  @Get('employees')
  findEmployees(@Query() findEmployeesDto: FindEmployeesDto) {
    console.log({ findEmployeesDto });
    return sendToMicroservice<FindEmployeesDto>(
      this.client,
      'users.find-employees',
      findEmployeesDto,
    );
  }
}
