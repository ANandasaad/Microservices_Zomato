import { DietaryType } from "@prisma/client";
import { IsEmail, IsString } from "class-validator";

export class SocialSignupDtos {
  @IsString()
  idToken?: string;
}
export class SignUpWithEmailDtos {
  @IsEmail()
  email?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  dietaryPreferences?: DietaryType;
}
