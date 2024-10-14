import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from './auth.decorator';
import { ValidRoles } from '../../../common';

export const RoleProtected = (...args: ValidRoles[]) =>
  SetMetadata(META_ROLES, args);
