import { AddRestaurantDtos } from "../dtos/RestaurantDtos";
import { IPrismaRestaurantRepository } from "../interface/IPrismaResturantRepository";
import { IRestaurantService } from "../interface/IRestaurantService";

export class RestaurantService implements IRestaurantService {
  constructor(private restaurantRepository: IPrismaRestaurantRepository) {}

  async addRestaurant(restaurantData: AddRestaurantDtos): Promise<any> {
    try {
      const restaurant = await this.restaurantRepository.addRestaurant(
        restaurantData
      );
      return restaurant;
    } catch (error) {
      throw error;
    }
  }
}
