import { IRoleService } from "../interface/IRoleService";
import { UnauthorizedError } from "../utils/error";

export class RoleService implements IRoleService {
  validateRole(allowedRoles: any, roles: any): void {
    // Implement the validation logic here

    const hasAllowedRole = allowedRoles.some((role: any) =>
      roles.includes(role)
    );
    if (!hasAllowedRole) {
      throw new UnauthorizedError("Role '" + roles + "' is not allowed ");
    }
  }
}
