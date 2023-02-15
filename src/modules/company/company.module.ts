import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyTypeModule } from '../company-type/company-type.module';
import { FirmInfoModule } from '../firm-info/firm-info.module';
import { FirmClientModule } from '../firm-client/firm-client.module';
import { EmployeeModule } from '../emlpoyee/employee.module';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    CompanyTypeModule,
    FirmInfoModule,
    FirmClientModule,
    UserModule,
    RoleModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
