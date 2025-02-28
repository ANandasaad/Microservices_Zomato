import { AddAddressDtos } from "../dtos/addressDtos";

export interface IAddressService {
  addAddress(address: AddAddressDtos, userId: number): Promise<any>;
}
