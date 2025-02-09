import { UserController } from "../controllers/UserController";
import express from "express";
import { validateDto } from "../middlewares/validation";
import { CreateUserDto } from "../dtos/createUserDtos";
import { VerifyPhoneOtp } from "../dtos/verifyPhoneOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";

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
  router.post(
    "/social-signup",
    validateDto(SocialSignupDtos),
    userController.GoogleSignup.bind(userController)
  );
  router.post(
    "/email-signup",
    validateDto(SignUpWithEmailDtos),
    userController.SignUpWithEmail.bind(userController)
  );
  return router;
};
