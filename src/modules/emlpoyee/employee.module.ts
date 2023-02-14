import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), UserModule],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
