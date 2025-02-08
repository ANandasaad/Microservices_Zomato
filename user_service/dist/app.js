"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const errorHandler_1 = require("./middlewares/errorHandler");
const PrismaUserRepository_1 = require("./repositories/PrismaUserRepository");
const AuthService_1 = require("./services/AuthService");
const UserController_1 = require("./controllers/UserController");
const userRoute_1 = require("./routes/userRoute");
const PORT = config_1.default.port || 4000;
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddleware();
        this.userRepository = new PrismaUserRepository_1.PrismaUserRepository();
        this.authService = new AuthService_1.AuthService(this.userRepository);
        this.userController = new UserController_1.UserController(this.authService, this.userRepository);
        this.initializeRoutes();
        this.initializeErrorHandler();
    }
    initializeMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        const userRoutes = (0, userRoute_1.UserRoutes)(this.userController);
        this.app.use("/api/v1/user", userRoutes);
    }
    initializeErrorHandler() {
        this.app.use(errorHandler_1.errorHandler);
    }
    listen(PORT) {
        try {
            this.app
                .listen(PORT, () => {
                console.log(`Server is running on port ${PORT || 4000}`);
            })
                .on("error", (error) => {
                console.error("Server startup failed", error);
                process.exit(1);
            });
        }
        catch (error) {
            console.log("error");
            process.exit(1);
        }
    }
    start() {
        this.listen(PORT);
    }
}
const app = new App();
app.start();
