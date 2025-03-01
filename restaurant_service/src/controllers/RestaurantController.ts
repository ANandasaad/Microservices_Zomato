import { Request, Response, NextFunction } from "express";
import { IRestaurantController } from "../interface/IRestaurantController";
import { IRestaurantService } from "../interface/IRestaurantService";
import { AddRestaurantDtos } from "../dtos/RestaurantDtos";

export class RestaurantController implements IRestaurantController {
  constructor(private restaurantService: IRestaurantService) {}

  async addRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const restaurantData: AddRestaurantDtos = req.body;
      const response = await this.restaurantService.addRestaurant(
        restaurantData
      );

      res.status(201).json({
        success: true,
        message: "Added restaurant successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
