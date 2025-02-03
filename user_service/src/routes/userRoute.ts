import { UserController } from "../controllers/UserController";
import express from "express";
import { validateDto } from "../middlewares/validation";
import { CreateUserDto } from "../dtos/createUserDtos";

export const UserRoutes = (userController: UserController) => {
  const router = express.Router();
  router.post(
    "/register",
    validateDto(CreateUserDto),
    userController.register.bind(userController)
  );
  return router;
};
