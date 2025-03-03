import express from "express";
import { AuthController } from "../controllers/AuthController";
export const AuthVerify = (authController: AuthController) => {
  const router = express.Router();
  router.get("/verify", authController.Verify.bind(authController));
  return router;
};
