import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { IAuthService } from "../interfaces/IAuthService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BadRequestError } from "../utils/error";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(userData: CreateUserDto): Promise<User> {
    if (!userData.email) {
      throw new BadRequestError("Email is required");
    }
    const existingUser = await this.userRepository.findByPhone(userData.email);

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const user = await this.userRepository.createUser(userData);
    return user;
  }
}
