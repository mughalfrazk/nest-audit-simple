import { IsDateString, IsOptional, IsString } from "class-validator";
import { IsFile } from "../../../validators/file-validator.decorator";

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
}