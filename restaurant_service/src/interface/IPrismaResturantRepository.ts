import {
  AddRestaurantDtos,
  getRestaurantByIdDtos,
} from "../dtos/RestaurantDtos";

export interface IPrismaRestaurantRepository {
  addRestaurant(restaurantData: AddRestaurantDtos): Promise<any>;
  getRestaurants(): Promise<any>;
  updateRestaurant(): Promise<any>;
  getRestaurantById(id: getRestaurantByIdDtos): Promise<any>;
}
