import { IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  client: number;

  @IsNumber()
  @ValidateIf(obj => obj.level_no)  
  parent: number
}