import { RestaurantItemController } from "../controllers/RestaurantItem.controller";
import express from "express";
import { validateDto } from "../middleware/validation";
import { RestaurantItemDtos } from "../dtos/ItemDtos";
import { customerAuth } from "../config/auth.config";
export const RestaurantItemRoutes = (
  restaurantItemController: RestaurantItemController
) => {
  const router = express.Router();
  router.post(
    "/",
    validateDto(RestaurantItemDtos),
    customerAuth,
    restaurantItemController.createRestaurantItem.bind(restaurantItemController)
  );

  return router;
};
