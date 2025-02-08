"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("../middlewares/validation");
const createUserDtos_1 = require("../dtos/createUserDtos");
const UserRoutes = (userController) => {
    const router = express_1.default.Router();
    router.post("/register-phone", (0, validation_1.validateDto)(createUserDtos_1.CreateUserDto), userController.registerByPhone.bind(userController));
    return router;
};
exports.UserRoutes = UserRoutes;
