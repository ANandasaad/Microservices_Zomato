import express from "express";
import { PrismaRestaurantRepository } from "./repositories/ResturantRespository";
import { RestaurantService } from "./services/RestaurantService";
import { RestaurantController } from "./controllers/RestaurantController";
import { errorHandler } from "./middleware/errorHandler";
import config from "./config/config";
import { RestaurantRoutes } from "./routes/RestaurantRoutes";
const PORT = config.port || 4002;

class App {
  public app: express.Application;
  private restaurantRepository: PrismaRestaurantRepository;
  private restaurantService: RestaurantService;
  private restaurantController: RestaurantController;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.restaurantRepository = new PrismaRestaurantRepository();
    this.restaurantService = new RestaurantService(this.restaurantRepository);
    this.restaurantController = new RestaurantController(
      this.restaurantService
    );
    this.initializeRoutes();
    this.initializeErrorHandler();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeRoutes() {
    const restaurantRoutes = RestaurantRoutes(this.restaurantController);
    this.app.use("/api/v1/restaurant/", restaurantRoutes);
  }
  private initializeErrorHandler() {
    this.app.use(errorHandler);
  }

  public listen(PORT: number) {
    try {
      this.app
        .listen(PORT, () => {
          console.log(`Server is running on port ${PORT || 4002}`);
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
