import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";

export interface IAuthService {
  registerUserByPhoneOrLogin(userData: CreateUserDto): Promise<User>;
  verifyPhoneOtp(userData: CreateUserDto): Promise<any>;

  GoogleSignup(userData: SocialSignupDtos): Promise<any>;
  SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any>;
}
