import { Controller, Post, Body } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('/')
  async create(@Body() body: CreateEmployeeDto) {

  }
}
