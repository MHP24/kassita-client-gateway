import { IsArray, IsEnum } from 'class-validator';
import { ValidRoles } from './../../../common';

export class UpdateRolesDto {
  @IsArray()
  @IsEnum(ValidRoles, { each: true })
  roles: ValidRoles[];
}
