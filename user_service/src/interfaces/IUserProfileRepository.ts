import { UpdateCustomerProfileDtos } from "../dtos/UserProfileDtos";

export interface IUserProfileRepository {
  updateCustomerProfile(
    user: UpdateCustomerProfileDtos,
    userId: number
  ): Promise<any>;
  getCustomerProfile(userId: number): Promise<any>;
}
