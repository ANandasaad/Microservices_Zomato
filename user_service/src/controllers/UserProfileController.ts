import { Request, Response, NextFunction } from "express";
import { IUserProfileController } from "../interfaces/IUserProfileController";
import { IUserProfileService } from "../interfaces/IUserProfileService";
import { UpdateCustomerProfileDtos } from "../dtos/UserProfileDtos";

export class UserProfileController implements IUserProfileController {
  constructor(private userProfileService: IUserProfileService) {}
  async updateCustomerProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: UpdateCustomerProfileDtos = req.body;

      const userId = req.user?.id;

      const response = await this.userProfileService.updateCustomerProfile(
        userData,
        userId as number
      );
      res.status(200).json({
        success: true,
        message: "Customer profile updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      const response = await this.userProfileService.getCustomerProfile(
        userId as number
      );
      res.status(200).json({
        success: true,
        message: "Customer profile was successfully retrieved",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
