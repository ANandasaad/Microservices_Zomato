import { AddRestaurantDtos } from "../dtos/RestaurantDtos";

export interface IRestaurantService {
  addRestaurant(restaurantData: AddRestaurantDtos): Promise<any>;
  getRestaurants(): Promise<any>;
  updateRestaurant(): Promise<any>;
}
