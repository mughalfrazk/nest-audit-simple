import { IsNumber, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";

export class CreateClientAssignmentDto {
  @IsNumber()
  client_id: number

  @IsNumber()
  user_id: number

  @IsNumber()
  action_id: number
}