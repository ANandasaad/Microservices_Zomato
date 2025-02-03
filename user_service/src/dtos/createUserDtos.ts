import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";
import { AuthProvider } from "@prisma/client";

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  provider?: AuthProvider = AuthProvider.PHONE;
}
