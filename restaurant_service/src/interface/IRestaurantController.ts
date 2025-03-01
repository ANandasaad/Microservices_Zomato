import { NextFunction, Request, Response } from "express";

export interface IRestaurantController {
  addRestaurant(req: Request, res: Response, next: NextFunction): Promise<void>;
}
