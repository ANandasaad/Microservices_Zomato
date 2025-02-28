import { AddressType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class AddAddressDtos {
  @IsEnum(AddressType, { message: "Address should be HOME , WORK OR OTHER" })
  type?: AddressType;

  @IsString()
  streetAddress?: String;

  @IsString()
  city?: String;

  @IsString()
  state?: String;

  @IsString()
  pinCode?: String;

  @IsOptional()
  @IsNumber()
  latitude?: Number;

  @IsOptional()
  @IsNumber()
  longitude?: Number;
}
