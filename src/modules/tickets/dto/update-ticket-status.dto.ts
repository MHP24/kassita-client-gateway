import { IsEnum, IsUUID } from 'class-validator';
import { TicketStatus } from '../enum';

export class UpdateTicketStatusDto {
  @IsUUID()
  ticketId: string;

  @IsEnum(TicketStatus, {
    message: `Valid statuses are: PENDING | IN_PROGRESS | REJECTED | SOLVED`,
  })
  status: TicketStatus;
}
