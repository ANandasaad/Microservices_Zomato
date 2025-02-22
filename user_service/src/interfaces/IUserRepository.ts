import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { UpdatePhoneOtpStatus } from "../dtos/verifyPhoneOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { ISocialSignup } from "./ISocialSignup";
import { ResendOtp, ResendType } from "../dtos/resendOtp";
import { LoginWithEmailDtos, OtpDataDtos } from "../dtos/LoginDtos";

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<any | null>;
  findOtpByEmailAndOtpType(data: ResendOtp): Promise<any | null>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: number): Promise<any | null>;
  delete(id: string): Promise<void>;
  updatePhoneOtpStatus(user: UpdatePhoneOtpStatus): Promise<string>;
  GoogleSignup(user: SocialSignupDtos): Promise<any>;
  SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any>;
  loginByPhone(user: any): Promise<any>;
  updateOtp(data: ResendType): Promise<any>;
  loginWithEmail(user: LoginWithEmailDtos): Promise<any>;
}
