import { AuthMiddlewareType } from "../interface/IAuthMiddleware";
import { IRoleService } from "../interface/IRoleService";

export class AuthMiddleware {
  constructor(private readonly roleService: IRoleService) {}

  createMiddleware(allowedRoles: string[]): AuthMiddlewareType {
    return async (req, res, next) => {
      try {
        const userRoles =
          req.headers["x-user-roles"]?.toString().split(",") || [];
        console.log(userRoles, "userRoles");
        if (allowedRoles.length > 0) {
          this.roleService.validateRole(allowedRoles, userRoles);
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
