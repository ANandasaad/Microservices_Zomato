import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from "class-validator";

export class RestaurantItemDtos {
  @IsNotEmpty({ message: "Please enter a name" })
  @IsString()
  name!: string;

  @IsNotEmpty({ message: "Please enter a description" })
  @IsString()
  description!: string;

  @IsUrl()
  image?: string;

  @IsNotEmpty({ message: "Please enter a price" })
  @IsNumber()
  price!: number;

  @IsNotEmpty({ message: " Restaurant id is required" })
  @IsNumber()
  restaurantId!: number;

  @IsBoolean()
  isVeg?: boolean;
}
