import { NextFunction, Request, Response } from "express";

export interface IAddressController {
  addAddress(req: Request, res: Response, next: NextFunction): Promise<void>;
}
