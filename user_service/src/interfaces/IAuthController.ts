import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  Verify(req: Request, res: Response, next: NextFunction): Promise<void>;
}
