import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFirmInfoDto {
  @IsNumber()
  company_id: number;

  @IsString()
  workspace: string;
}
