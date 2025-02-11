import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { UpdatePhoneOtpStatus } from "../dtos/verifyPhoneOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { ISocialSignup } from "./ISocialSignup";

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  updatePhoneOtpStatus(user: UpdatePhoneOtpStatus): Promise<string>;
  GoogleSignup(user: SocialSignupDtos): Promise<any>;
  SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any>;
  loginByPhone(user: any): Promise<any>;
}
