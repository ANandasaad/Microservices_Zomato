import { OtpType } from "@prisma/client";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class LoginWithEmailDtos {
  @IsEmail()
  email?: string;

  @IsString()
  otp?: string;

  @IsString()
  OtpType?: OtpType;
}

export class OtpDataDtos {
  @IsString()
  OtpType?: OtpType;

  @IsNumber()
  userId?: number;
}
