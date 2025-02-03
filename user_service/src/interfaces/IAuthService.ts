import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";

export interface IAuthService {
  register(userData: CreateUserDto): Promise<User>;
}
