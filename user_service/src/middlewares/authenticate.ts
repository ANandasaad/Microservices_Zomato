import PRISMA from "@prisma/client";
import { AuthMiddlewareType } from "../interfaces/IAuthService";
import { IRoleService } from "../interfaces/IRoleService";
import { ITokenService } from "../interfaces/ITokenService";
import { NotFoundError, UnauthorizedError } from "../utils/error";
declare global {
  namespace Express {
    interface Request {
      user?: PRISMA.User;
    }
  }
}
export class AuthMiddleware {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly roleService: IRoleService
  ) {}

  createMiddleware(allowedRoles: string[] = []): AuthMiddlewareType {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          throw new UnauthorizedError("Auth header is required");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
          throw new NotFoundError("Auth token is not found");
        }

        const user = await this.tokenService.verify(token);
        if (allowedRoles.length > 0) {
          this.roleService.validateRole(user, allowedRoles);
        }
        req.user = user;
      } catch (error) {
        next(error);
      }
    };
  }
}
