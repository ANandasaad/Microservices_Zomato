import { User } from "@prisma/client";
import { UpdateCustomerProfileDtos } from "../dtos/UserProfileDtos";

export interface IUserProfileService {
  updateCustomerProfile(
    user: UpdateCustomerProfileDtos,
    userId: number
  ): Promise<any>;
  getCustomerProfile(userId: number): Promise<any>;
}
