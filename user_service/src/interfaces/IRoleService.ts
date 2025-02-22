import { User } from "@prisma/client";

export interface IRoleService {
  validateRole(user: User, allowedRoles: string[]): void;
}
