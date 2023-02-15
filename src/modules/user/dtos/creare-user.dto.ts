import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
  
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}