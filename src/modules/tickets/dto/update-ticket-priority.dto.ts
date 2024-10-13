import { IsUUID, IsEnum } from 'class-validator';
import { TicketPriority } from '../enum';

export class UpdateTicketPriorityDto {
  @IsUUID()
  ticketId: string;

  @IsEnum(TicketPriority, {
    message: `Valid priorities are: LOW | MEDIUM | HIGH`,
  })
  priority: TicketPriority;
}
