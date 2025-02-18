import { UserController } from "../controllers/UserController";
import express from "express";
import { validateDto } from "../middlewares/validation";
import { CreateUserDto } from "../dtos/createUserDtos";
import { VerifyPhoneOtp } from "../dtos/verifyPhoneOtp";
import { SignUpWithEmailDtos, SocialSignupDtos } from "../dtos/signupDtos";
import { ResendOtp } from "../dtos/resendOtp";

export const UserRoutes = (userController: UserController) => {
  const router = express.Router();
  router.post(
    "/register-phone",
    validateDto(CreateUserDto),
    userController.registerByPhoneOrLogin.bind(userController)
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
  router.post(
    "/resend-otp",
    validateDto(ResendOtp),
    userController.ResendOtp.bind(userController)
  );
  return router;
};
