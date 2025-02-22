import { PrismaClient } from "@prisma/client";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { UpdateCustomerProfileDtos } from "../dtos/UserProfileDtos";
import { NotFoundError } from "../utils/error";

export class PrismaUserProfileRepository implements IUserProfileRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async updateCustomerProfile(
    user: UpdateCustomerProfileDtos,
    userId: number
  ): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      try {
        const { firstName, lastName, dateOfBirth, Gender, profileImage } = user;
        const userExits = await tx.user.findUnique({
          where: {
            id: userId,
          },
        });
        if (!userExits) {
          throw new NotFoundError("User not found");
        }
        const updateUser = await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            profileImage: profileImage,
          },
          include: {
            CustomerProfile: true,
          },
        });
        await tx.customerProfile.update({
          where: {
            userId: userId,
          },
          data: {
            Gender: Gender,
          },
        });
        return updateUser;
      } catch (error) {
        throw error;
      }
    });
  }
  async getCustomerProfile(userId: number): Promise<any> {
    try {
      const customerProfile = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dateOfBirth: true,
          phone: true,
          profileImage: true,
          role: true,
          CustomerProfile: {
            select: {
              id: true,
              Gender: true,
              dietaryPreferences: true,
              Address: true,
            },
          },
        },
      });

      if (!customerProfile) {
        throw new NotFoundError("CustomerProfile not found");
      }
      return customerProfile;
    } catch (error) {
      throw error;
    }
  }
}
