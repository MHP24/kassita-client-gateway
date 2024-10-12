import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';
import { TicketPriority, TicketStatus } from '../enum';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  images?: string[] = ['image1.jpg'];

  @IsEnum(TicketPriority, {
    message: `Valid options are: LOW | MEDIUM | HIGH`,
  })
  priority?: TicketPriority = TicketPriority.LOW;

  @IsEnum(TicketStatus, {
    message: `Valid options are: PENDING | IN_PROGRESS | REJECTED | SOLVED`,
  })
  status?: TicketStatus = TicketStatus.PENDING;

  @IsUUID()
  typeId: string;
}
