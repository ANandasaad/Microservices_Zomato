import { CreateUserDto } from "../dtos/createUserDtos";
import { LoginWithEmailDtos } from "../dtos/LoginDtos";
import { ResendOtp } from "../dtos/resendOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { IAuthService } from "../interfaces/IAuthService";
import { IUserController } from "../interfaces/IUserController";

import { NextFunction, Request, Response } from "express";

export class UserController implements IUserController {
  constructor(private authService: IAuthService) {}

  async registerByPhoneOrLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.authService.registerUserByPhoneOrLogin(userData);
      res.status(201).json({
        success: true,
        message:
          "User registered or login successfully, please verify your phone number",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async VerifyPhoneOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.authService.verifyPhoneOtp(userData);
      res.status(200).json({
        success: true,
        message: "Verified phone number successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async ResendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: ResendOtp = req.body;
      const response = await this.authService.resendOtp(userData);
      res.status(200).json({
        success: true,
        message: "Otp resend successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async GoogleSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: SocialSignupDtos = req.body;
      const user = await this.authService.GoogleSignup(userData);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async SignUpWithEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: SignUpWithEmailDtos = req.body;
      const response = await this.authService.SignUpWithEmail(userData);
      res.status(201).json({
        success: true,
        message:
          "User registered successfully, Please verify your email address",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  async AppleSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async LoginWithEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: LoginWithEmailDtos = req.body;
      const response = await this.authService.loginWithEmail(userData);
      res.status(200).json({
        success: true,
        message: "Login is successful",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
