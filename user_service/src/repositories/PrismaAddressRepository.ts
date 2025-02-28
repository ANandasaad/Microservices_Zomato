import { AddressType, PrismaClient } from "@prisma/client";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { NextFunction, Request, Response } from "express";
import { AddAddressDtos } from "../dtos/addressDtos";
import { NotFoundError } from "../utils/error";

export class PrismaAddressRepository implements IAddressRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async addAddress(userAddress: AddAddressDtos, userId: number): Promise<any> {
    try {
      const { city, state, streetAddress, pinCode, latitude, longitude, type } =
        userAddress;

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          CustomerProfile: true,
        },
      });
      if (!user) {
        throw new NotFoundError("User not found");
      }
      const addAddress = await this.prisma.address.create({
        data: {
          customerProfileId: user.CustomerProfile?.id as number,
          type: type as AddressType,
          city: city as string,
          pinCode: pinCode as string,
          streetAddress: streetAddress as string,
          state: state as string,
        },
      });
      return addAddress;
    } catch (error) {
      throw error;
    }
  }
}
