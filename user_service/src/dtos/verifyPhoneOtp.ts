import { IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class VerifyPhoneOtp {
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  otp?: string;
}
export class UpdatePhoneOtpStatus {
  @IsNumber()
  userId?: number;

  @IsString()
  status?: string;
}
