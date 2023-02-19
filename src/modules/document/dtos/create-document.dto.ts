import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  path: string;

  @IsDateString()
  audit_date: string;

  @IsNumber()
  folder: number;

  @IsNumber()
  client: number;

  @IsNumber()
  uploaded_by: number;

  @IsNumber()
  reviewed_by: number;
}