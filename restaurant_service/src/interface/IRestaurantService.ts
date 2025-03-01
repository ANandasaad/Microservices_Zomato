import { AddRestaurantDtos } from "../dtos/RestaurantDtos";

export interface IRestaurantService {
  addRestaurant(restaurantData: AddRestaurantDtos): Promise<any>;
}
