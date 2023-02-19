import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDocumentDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  audit_date: string;

  @IsString()
  folder: string;

  @IsString()
  client: string;

  @IsString()
  uploaded_by: string;
}