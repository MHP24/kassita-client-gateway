import { Module } from '@nestjs/common';
import { TicketsModule } from './modules/tickets/tickets.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [TicketsModule, AuthModule, UsersModule, ReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
