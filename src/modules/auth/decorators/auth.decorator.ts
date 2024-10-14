import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard, UserRoleGuard } from '../guards';
import { ValidRoles } from '../../../common';

export const META_ROLES = 'user_roles';

export const Auth = (...args: ValidRoles[]) => {
  return applyDecorators(
    RoleProtected(...args),
    UseGuards(AuthGuard, UserRoleGuard),
  );
};
