import { IsNumber } from "class-validator";

export class GetClientFoldersDto {
  @IsNumber()
  level_no: number

  @IsNumber()
  client: number
}