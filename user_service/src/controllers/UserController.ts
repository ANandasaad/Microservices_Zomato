import { CreateUserDto } from "../dtos/createUserDtos";
import { IAuthService } from "../interfaces/IAuthService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    const userData: CreateUserDto = req.body;
    const user = await this.authService.register(userData);
    res.status(201).json(user);
  }
}
