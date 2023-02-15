import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { UserModule } from '../user/user.module';
import { DesignationModule } from '../designation/designation.module';
import { RoleModule } from '../role/role.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    UserModule,
    DesignationModule,
    RoleModule,
    CompanyModule
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
