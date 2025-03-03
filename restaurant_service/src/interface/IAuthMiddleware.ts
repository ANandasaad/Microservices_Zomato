import { NextFunction, Request, Response } from "express";

export type AuthMiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
