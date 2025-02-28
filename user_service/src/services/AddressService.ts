import { AddAddressDtos } from "../dtos/addressDtos";
import { IAddressRepository } from "../interfaces/IAddressRepository";
import { IAddressService } from "../interfaces/IAddressService";

export class AddressService implements IAddressService {
  constructor(private addressRepository: IAddressRepository) {}

  async addAddress(addressData: AddAddressDtos, userId: number): Promise<any> {
    try {
      const address = await this.addressRepository.addAddress(
        addressData,
        userId
      );
      return address;
    } catch (error) {
      throw error;
    }
  }
}
