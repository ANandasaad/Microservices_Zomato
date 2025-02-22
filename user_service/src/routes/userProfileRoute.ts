import { UserProfileController } from "../controllers/UserProfileController";
import express from "express";
import { validateDto } from "../middlewares/validation";
import { UpdateCustomerProfileDtos } from "../dtos/UserProfileDtos";
import { customerAuth } from "../config/auth.config";

export const UserProfileRoutes = (
  userProfileController: UserProfileController
) => {
  const router = express.Router();
  router.post(
    "/",
    validateDto(UpdateCustomerProfileDtos),
    customerAuth,
    userProfileController.updateCustomerProfile.bind(userProfileController)
  );
  router.get(
    "/",
    customerAuth,
    userProfileController.getCustomerProfile.bind(userProfileController)
  );
  return router;
};
