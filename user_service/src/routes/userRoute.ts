import { UserController } from "../controllers/UserController";
import express from "express";
import { validateDto } from "../middlewares/validation";
import { CreateUserDto } from "../dtos/createUserDtos";
import { VerifyPhoneOtp } from "../dtos/verifyPhoneOtp";

export const UserRoutes = (userController: UserController) => {
  const router = express.Router();
  router.post(
    "/register-phone",
    validateDto(CreateUserDto),
    userController.registerByPhone.bind(userController)
  );
  router.post(
    "/verify-otp",
    validateDto(VerifyPhoneOtp),
    userController.VerifyPhoneOtp.bind(userController)
  );
  return router;
};
