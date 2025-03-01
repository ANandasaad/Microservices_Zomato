import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interfaces/IAuthController";
import { ITokenService } from "../interfaces/ITokenService";
import { NotFoundError, UnauthorizedError } from "../utils/error";

export class AuthController implements IAuthController {
  constructor(private readonly tokenService: ITokenService) {}

  async Verify(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedError("Auth header is required");
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new NotFoundError("Auth Token is not found");
      }
      const user = await this.tokenService.verify(token);

      if (!user) {
        res.status(403).json({
          success: false,
          message: "Authentication Failed",
        });
      }

      res
        .header("X-User-Id", user.id?.toString() ?? "")
        .header("X-User-Roles", user.role)
        .json({
          success: true,
        });
    } catch (error) {
      next(error);
    }
  }
}
