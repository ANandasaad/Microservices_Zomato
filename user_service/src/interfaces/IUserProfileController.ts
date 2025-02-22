import { NextFunction, Request, Response } from "express";

export interface IUserProfileController {
  updateCustomerProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getCustomerProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
