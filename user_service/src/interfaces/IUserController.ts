import { Request, Response } from "express";

export interface IUserController {
  register(req: Request, res: Response): Promise<void>;
  verifyPhoneOtp(req: Request, res: Response): Promise<void>;
}
