import express from "express";
import { PrismaRestaurantRepository } from "./repositories/ResturantRespository";
import { RestaurantService } from "./services/RestaurantService";
import { RestaurantController } from "./controllers/RestaurantController";
import { errorHandler } from "./middleware/errorHandler";
import config from "./config/config";
import { RestaurantRoutes } from "./routes/RestaurantRoutes";
import { RestaurantItemService } from "./services/RestaurantItem.service";
import { RestaurantItemController } from "./controllers/RestaurantItem.controller";
import { RestaurantItemRepository } from "./repositories/RestaurantItem.respository";
import { RestaurantItemRoutes } from "./routes/RestaurantItem.routes";
const PORT = config.port || 4002;

class App {
  public app: express.Application;
  private restaurantRepository: PrismaRestaurantRepository;
  private restaurantService: RestaurantService;
  private restaurantController: RestaurantController;
  private restaurantItemService: RestaurantItemService;
  private restaurantItemController: RestaurantItemController;
  private restaurantItemRepository: RestaurantItemRepository;

  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.restaurantRepository = new PrismaRestaurantRepository();
    this.restaurantItemRepository = new RestaurantItemRepository();
    this.restaurantService = new RestaurantService(this.restaurantRepository);
    this.restaurantItemService = new RestaurantItemService(
      this.restaurantItemRepository
    );
    this.restaurantItemController = new RestaurantItemController(
      this.restaurantItemService
    );
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
    const restaurantItemRoutes = RestaurantItemRoutes(
      this.restaurantItemController
    );

    this.app.use("/api/v1/restaurant/", restaurantRoutes);
    this.app.use("/api/v1/restaurant-item", restaurantItemRoutes);
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
