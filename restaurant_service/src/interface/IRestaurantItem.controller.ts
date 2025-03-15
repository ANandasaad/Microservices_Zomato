import { NextFunction, Request, Response } from "express";

export interface IRestaurantItemController {
  createRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getRestaurantItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updateRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
