import { AuthMiddleware } from "../middlewares/authenticate";
import { JwtTokenService } from "../services/JwtTokenService";
import { RoleService } from "../services/RoleService";
import config from "./config";
const tokenService = new JwtTokenService(config.jwtSecret as string);
const roleService = new RoleService();
export const authMiddleware = new AuthMiddleware(tokenService, roleService);

export const customerAuth = authMiddleware.createMiddleware(["CUSTOMER"]);
export const adminAuth = authMiddleware.createMiddleware(["ADMIN"]);
export const deliveryAuth = authMiddleware.createMiddleware([
  "DELIVERY_PARTNER",
]);
export const restaurantAuth = authMiddleware.createMiddleware([
  "RESTAURANT_OWNER",
]);
