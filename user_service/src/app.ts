import express from "express";
import config from "./config/config";
import { errorHandler } from "./middlewares/errorHandler";
import { PrismaUserRepository } from "./repositories/PrismaUserRepository";
import { AuthService } from "./services/AuthService";
import { UserController } from "./controllers/UserController";
import { UserRoutes } from "./routes/userRoute";
import { UserProfileService } from "./services/UserProfileService";
import { UserProfileController } from "./controllers/UserProfileController";
import { PrismaUserProfileRepository } from "./repositories/PrismaUserProfileRepository";
import { UserProfileRoutes } from "./routes/userProfileRoute";

const PORT = config.port || 4000;

class App {
  public app: express.Application;

  private userRepository: PrismaUserRepository;
  private authService: AuthService;
  private userController: UserController;
  private userProfileController: UserProfileController;
  private userProfileService: UserProfileService;
  private userProfileRepository: PrismaUserProfileRepository;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.userRepository = new PrismaUserRepository();
    this.userProfileRepository = new PrismaUserProfileRepository();
    this.authService = new AuthService(this.userRepository);
    this.userProfileService = new UserProfileService(
      this.userProfileRepository
    );
    this.userController = new UserController(this.authService);
    this.userProfileController = new UserProfileController(
      this.userProfileService
    );
    this.initializeRoutes();
    this.initializeErrorHandler();
  }
  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    const userRoutes = UserRoutes(this.userController);
    const userProfileRoutes = UserProfileRoutes(this.userProfileController);

    this.app.use("/api/v1/user", userRoutes);
    this.app.use("/api/v1/user/profile", userProfileRoutes);
  }
  private initializeErrorHandler() {
    this.app.use(errorHandler);
  }

  public listen(PORT: number) {
    try {
      this.app
        .listen(PORT, () => {
          console.log(`Server is running on port ${PORT || 4000}`);
        })
        .on("error", (error) => {
          console.error("Server startup failed", error);
          process.exit(1);
        });
    } catch (error) {
      console.log("error");
      process.exit(1);
    }
  }
  public start() {
    this.listen(PORT as number);
  }
}

const app = new App();
app.start();
