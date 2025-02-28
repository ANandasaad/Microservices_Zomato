import { NextFunction, Request, Response } from "express";
import { AddAddressDtos } from "../dtos/addressDtos";
import { IAddressController } from "../interfaces/IAddressController";
import { IAddressService } from "../interfaces/IAddressService";

export class AddressController implements IAddressController {
  constructor(private addressService: IAddressService) {}

  async addAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const addressData: AddAddressDtos = req.body;

      const userId = Number(req.user?.id);

      const response = await this.addressService.addAddress(
        addressData,
        userId
      );
      res.status(201).json({
        success: true,
        message: "Add address successfully added",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
