import { User } from "@prisma/client";
import { IRoleService } from "../interfaces/IRoleService";
import { UnauthorizedError } from "../utils/error";

export class RoleService implements IRoleService {
  validateRole(user: User, allowedRoles: string[]): void {
    if (!allowedRoles.includes(user.role)) {
      throw new UnauthorizedError(`Role ${user.role}  is unauthorized`);
    }
  }
}
