import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { UpdatePhoneOtpStatus } from "../dtos/verifyPhoneOtp";

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  updatePhoneOtpStatus(user: UpdatePhoneOtpStatus): Promise<string>;
}
