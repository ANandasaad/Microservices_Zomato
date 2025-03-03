import { AddRestaurantDtos } from "../dtos/RestaurantDtos";

export interface IPrismaRestaurantRepository {
  addRestaurant(restaurantData: AddRestaurantDtos): Promise<any>;
  getRestaurants(): Promise<any>;
  updateRestaurant(): Promise<any>;
}
