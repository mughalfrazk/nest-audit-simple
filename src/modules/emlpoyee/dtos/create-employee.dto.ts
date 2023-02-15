import { IsNumber } from "class-validator";

export class CreateEmployeeDto {
  @IsNumber()
  employee_no: number

  @IsNumber()
  user_id: number

  @IsNumber()
  company_id: number

  @IsNumber()
  designation: number

  @IsNumber()
  role_id: number
}