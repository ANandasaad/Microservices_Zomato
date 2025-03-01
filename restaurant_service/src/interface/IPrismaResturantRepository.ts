import { AddRestaurantDtos } from "../dtos/RestaurantDtos";

export interface IPrismaRestaurantRepository {
  addRestaurant(restaurantData: AddRestaurantDtos): Promise<any>;
}
