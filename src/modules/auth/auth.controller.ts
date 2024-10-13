import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignInUserDto, SignUpUserDto } from './dto';
import { sendToMicroservice } from '../../common';
import { RABBITMQ_SERVICE } from '../../config';
// * Auth control
import { Token } from './decorators';
import { JwtRefreshGuard } from './guards';

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

  @Get('refresh-session')
  @UseGuards(JwtRefreshGuard)
  refresSession(@Token() token: string) {
    return sendToMicroservice(this.client, 'auth.refresh-session', token);
  }
}
