import { NextFunction, Request, Response } from "express";

export interface IUserController {
  registerByPhone(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  VerifyPhoneOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  GoogleSignup(req: Request, res: Response, next: NextFunction): Promise<void>;
  AppleSignup(req: Request, res: Response, next: NextFunction): Promise<void>;
  SignUpWithEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
