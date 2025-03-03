import { AuthMiddleware } from "../middleware/authenticate";
import { RoleService } from "../services/RoleService";

const roleService = new RoleService();
export const authMiddleware = new AuthMiddleware(roleService);

export const customerAuth = authMiddleware.createMiddleware(["CUSTOMER"]);
export const adminAuth = authMiddleware.createMiddleware(["ADMIN"]);
export const deliveryAuth = authMiddleware.createMiddleware([
  "DELIVERY_PARTNER",
]);
export const restaurantAuth = authMiddleware.createMiddleware([
  "RESTAURANT_OWNER",
]);
