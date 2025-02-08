import { CreateUserDto } from "../dtos/createUserDtos";
import { IAuthService } from "../interfaces/IAuthService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async registerByPhone(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.authService.registerUserByPhone(userData);
      res.status(201).json({
        message: "User registered successfully",
        data: user,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async VerifyPhoneOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const message = await this.authService.verifyPhoneOtp(userData);
      res.status(200).json({
        message,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
