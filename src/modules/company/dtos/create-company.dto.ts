import { IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class CreateCompanyDto {
  @IsNumber()
  company_type_id: number;

  @IsString()
  name: string

  @IsString()
  abbreviation: string

  @IsNumber()
  @ValidateIf(obj => obj.company_type_id === 2)  
  firm_id: number

  @IsString()
  @IsOptional()
  first_name: string

  @IsString()
  @IsOptional()
  last_name: string

  @IsString()
  @ValidateIf(obj => obj.company_type_id === 1)
  email: string

  @IsString()
  @MinLength(8)
  @ValidateIf(obj => obj.company_type_id === 1)
  password: string
}