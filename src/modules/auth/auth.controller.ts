import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignInUserDto, SignUpUserDto } from './dto';
import { sendToMicroservice } from '../../common';
import { RABBITMQ_SERVICE } from '../../config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(RABBITMQ_SERVICE) private readonly client: ClientProxy) {}

  @Post('sign-up')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return sendToMicroservice(this.client, 'auth.sign-up', signUpUserDto);
  }

  @Post('sign-in')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return sendToMicroservice(this.client, 'auth.sign-in', signInUserDto);
  }
}
