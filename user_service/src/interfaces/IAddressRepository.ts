import { AddAddressDtos } from "../dtos/addressDtos";

export interface IAddressRepository {
  addAddress(userAddress: AddAddressDtos, userId: number): Promise<any>;
}
