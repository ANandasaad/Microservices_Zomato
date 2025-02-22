import { UpdateCustomerProfileDtos } from "../dtos/UserProfileDtos";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { IUserProfileService } from "../interfaces/IUserProfileService";

export class UserProfileService implements IUserProfileService {
  constructor(private userProfileRepository: IUserProfileRepository) {}
  async updateCustomerProfile(
    user: UpdateCustomerProfileDtos,
    userId: number
  ): Promise<any> {
    try {
      const customerProfile =
        await this.userProfileRepository.updateCustomerProfile(
          user,
          userId as number
        );
      return customerProfile;
    } catch (error) {
      throw error;
    }
  }
  async getCustomerProfile(userId: number): Promise<any> {
    try {
      const customerProfile =
        await this.userProfileRepository.getCustomerProfile(userId);
      return customerProfile;
    } catch (error) {
      throw error;
    }
  }
}
