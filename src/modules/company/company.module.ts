import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyTypeModule } from '../company-type/company-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), CompanyTypeModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
