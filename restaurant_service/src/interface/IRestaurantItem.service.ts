import { RestaurantItemDtos } from "../dtos/ItemDtos";

export interface IRestaurantItemService {
  createRestaurantItem(data: RestaurantItemDtos): Promise<any>;
  getRestaurantItems(): Promise<any>;
  getRestaurantItem(id: string): Promise<any>;
  updateRestaurantItem(id: string, data: any): Promise<any>;
  deleteRestaurantItem(id: string): Promise<any>;
}
