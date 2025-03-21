import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/createUserDtos";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { ResendOtp } from "../dtos/resendOtp";
import { LoginWithEmailDtos } from "../dtos/LoginDtos";
import { NextFunction, Request, Response } from "express";

export interface IAuthService {
  registerUserByPhoneOrLogin(userData: CreateUserDto): Promise<User>;
  verifyPhoneOtp(userData: CreateUserDto): Promise<any>;
  GoogleSignup(userData: SocialSignupDtos): Promise<any>;
  SignUpWithEmail(userData: SignUpWithEmailDtos): Promise<any>;
  resendOtp(userData: ResendOtp): Promise<any>;
  loginWithEmail(userData: LoginWithEmailDtos): Promise<any>;
}

export type AuthMiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
