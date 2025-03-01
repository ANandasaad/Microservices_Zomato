import { PrismaClient } from "@prisma/client";
import { IPrismaRestaurantRepository } from "../interface/IPrismaResturantRepository";
import { AddRestaurantDtos } from "../dtos/RestaurantDtos";
import { BadRequestError } from "../utils/error";

export class PrismaRestaurantRepository implements IPrismaRestaurantRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async addRestaurant(restaurantData: AddRestaurantDtos): Promise<any> {
    try {
      const { name, description, address, city, country, image } =
        restaurantData;

      const restaurant = await this.prisma.restaurant.create({
        data: {
          name: name,
          address: address,
          city: city,
          country: country,
          description: description,
          image: image,
        },
      });

      if (!restaurant) {
        throw new BadRequestError("Something went wrong");
      }
      return restaurant;
    } catch (error) {
      throw error;
    }
  }
}
