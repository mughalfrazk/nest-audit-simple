import { IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class UpdateCompanyDto {
  @IsString()
  name: string

  @IsString()
  abbreviation: string
}