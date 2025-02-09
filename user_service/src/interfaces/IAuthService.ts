import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";

export interface IAuthService {
  registerUserByPhone(userData: CreateUserDto): Promise<User>;
  verifyPhoneOtp(userData: CreateUserDto): Promise<string>;

  GoogleSignup(userData: SocialSignupDtos): Promise<any>;
  SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any>;
}
