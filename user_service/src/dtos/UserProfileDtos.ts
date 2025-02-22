import { GenderType } from "@prisma/client";
import {
  IsDate,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateCustomerProfileDtos {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsISO8601()
  dateOfBirth?: string;

  @IsEnum(GenderType, {
    message: `Gender must be a ${GenderType.MALE} or ${GenderType.FEMALE}`,
  })
  Gender?: GenderType;
}
