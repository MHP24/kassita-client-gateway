import { Module } from '@nestjs/common';
import { TicketsModule } from './modules/tickets/tickets.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TicketsModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
