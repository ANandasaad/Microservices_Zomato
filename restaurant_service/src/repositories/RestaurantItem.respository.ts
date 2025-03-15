import { PrismaClient } from "@prisma/client";
import { RestaurantItemDtos } from "../dtos/ItemDtos";
import { IRestaurantItemRepository } from "../interface/IRestaurantItem.respository";
import { NotFoundError } from "../utils/error";

export class RestaurantItemRepository implements IRestaurantItemRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createRestaurantItem(data: RestaurantItemDtos): Promise<any> {
    try {
      const { name, description, price, restaurantId, image, isVeg } = data;
      const restaurant = await this.prisma.restaurant.findUnique({
        where: {
          id: restaurantId,
        },
      });
      if (!restaurant) {
        throw new NotFoundError("Restaurant not found");
      }
      const restaurantItem = await this.prisma.restaurantItem.create({
        data: {
          name,
          description,
          price,
          image,
          isVeg,
          restaurantId,
        },
      });
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
