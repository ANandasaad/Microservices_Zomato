import express from "express";
import { RestaurantController } from "../controllers/RestaurantController";
import { validateDto } from "../middleware/validation";
import { AddRestaurantDtos } from "../dtos/RestaurantDtos";
import { adminAuth, customerAuth } from "../config/auth.config";
export const RestaurantRoutes = (
  restaurantController: RestaurantController
) => {
  const router = express.Router();
  router.post(
    "/",
    validateDto(AddRestaurantDtos),
    customerAuth,
    restaurantController.addRestaurant.bind(restaurantController)
  );

  router.get(
    "/",
    customerAuth,
    restaurantController.getRestaurants.bind(restaurantController)
  );

  return router;
};
