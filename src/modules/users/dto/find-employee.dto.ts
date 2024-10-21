import { IsUUID } from 'class-validator';

export class FindEmployeeDto {
  @IsUUID()
  userId: string;
}
