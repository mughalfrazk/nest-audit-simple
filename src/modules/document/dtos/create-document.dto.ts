import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Company } from "src/modules/company/company.entity";
import { Folder } from "src/modules/folder/folder.entity";
import { User } from "src/modules/user/user.entity";

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  path: string;

  @IsDate()
  audit_date: Date;

  @IsNumber()
  folder: Folder;

  @IsNumber()
  client: Company;

  @IsNumber()
  uploaded_by: User;

  @IsNumber()
  reviewed_by: User;
}