import { Request, Response, NextFunction } from "express";
import { IRestaurantItemController } from "../interface/IRestaurantItem.controller";
import { IRestaurantItemService } from "../interface/IRestaurantItem.service";
import { RestaurantItemDtos } from "../dtos/ItemDtos";

export class RestaurantItemController implements IRestaurantItemController {
  constructor(private restaurantItemService: IRestaurantItemService) {}
  async createRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const restaurantData: RestaurantItemDtos = req.body;
      const response = await this.restaurantItemService.createRestaurantItem(
        restaurantData
      );
      res.status(201).json({
        status: true,
        message: "Restaurant item created",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async getRestaurantItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async updateRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async deleteRestaurantItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
