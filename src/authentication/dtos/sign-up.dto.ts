import { IsEmail, IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class SignUpDto {
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

  @IsNumber()
  @IsOptional()
  employee_no: number;

  @IsNumber()
  role_id: number

  @IsNumber()
  @IsOptional()
  company_id: number

  @IsNumber()
  @IsOptional()
  designation_id: number
}