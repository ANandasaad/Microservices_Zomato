import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export class ResendOtp {
  @IsEmail()
  email?: string;

  @IsString()
  OtpType?: string;
}

export class ResendType {
  @IsNumber()
  id?: number;
  @IsString()
  otp?: string;

  @IsNumber()
  attemptCount?: number;

  @IsDate()
  lockUntil?: Date | null;
}
