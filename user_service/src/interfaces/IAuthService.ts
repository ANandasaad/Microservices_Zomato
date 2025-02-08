import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";

export interface IAuthService {
  registerUserByPhone(userData: CreateUserDto): Promise<User>;
  verifyPhoneOtp(userData: CreateUserDto): Promise<string>;
}
