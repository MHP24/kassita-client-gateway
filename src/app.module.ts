import { Module } from '@nestjs/common';
import { TicketsModule } from './modules/tickets/tickets.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TicketsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
