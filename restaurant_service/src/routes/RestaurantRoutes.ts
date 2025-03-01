import express from "express";
import { RestaurantController } from "../controllers/RestaurantController";
import { validateDto } from "../middleware/validation";
import { AddRestaurantDtos } from "../dtos/RestaurantDtos";
export const RestaurantRoutes = (
  restaurantController: RestaurantController
) => {
  const router = express.Router();
  router.post(
    "/",
    validateDto(AddRestaurantDtos),
    restaurantController.addRestaurant.bind(restaurantController)
  );

  return router;
};
