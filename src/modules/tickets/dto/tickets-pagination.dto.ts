import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common';
import { TicketPriority, TicketStatus } from '../enum';

export class TicketsPaginationDto extends PaginationDto {
  @IsEnum(TicketPriority, {
    message: `Valid priorities are: LOW | MEDIUM | HIGH`,
  })
  @IsOptional()
  priority?: TicketPriority;

  @IsEnum(TicketStatus, {
    message: `Valid statuses are: PENDING | IN_PROGRESS | REJECTED | SOLVED`,
  })
  @IsOptional()
  status?: TicketStatus;
}
