import { ValidRoles } from '../enums/valid-roles.enum';

export type User = {
  id: string;
  username: string;
  apartment?: string;
  email: string;
  roles: ValidRoles[];
};
