import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common';

export class FindEmployeesDto extends PaginationDto {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
