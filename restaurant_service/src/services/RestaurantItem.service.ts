import { RestaurantItemDtos } from "../dtos/ItemDtos";
import { IRestaurantItemRepository } from "../interface/IRestaurantItem.respository";
import { IRestaurantItemService } from "../interface/IRestaurantItem.service";

export class RestaurantItemService implements IRestaurantItemService {
  constructor(private restaurantRepository: IRestaurantItemRepository) {}

  async createRestaurantItem(data: RestaurantItemDtos): Promise<any> {
    try {
      const restaurantItem =
        await this.restaurantRepository.createRestaurantItem(data);
      return restaurantItem;
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantItem(id: string): Promise<any> {}

  async getRestaurantItems(): Promise<any> {}

  async updateRestaurantItem(id: string, data: any): Promise<any> {}

  async deleteRestaurantItem(id: string): Promise<any> {}
}
