import { AddressController } from "../controllers/AddressController";
import express from "express";
import { validateDto } from "../middlewares/validation";
import { AddAddressDtos } from "../dtos/addressDtos";
import { customerAuth } from "../config/auth.config";
export const AddressRoutes = (addressRouteController: AddressController) => {
  const router = express.Router();
  router.post(
    "/",
    validateDto(AddAddressDtos),
    customerAuth,
    addressRouteController.addAddress.bind(addressRouteController)
  );
  return router;
};
