import { IsBoolean, IsDateString, IsNumber, IsOptional } from "class-validator";

export class UpdateDocumentDto {
  @IsNumber()
  client: number;
  
  @IsBoolean()
  @IsOptional()
  reviewed: boolean

  @IsDateString()
  @IsOptional()
  audit_date: Date;
}