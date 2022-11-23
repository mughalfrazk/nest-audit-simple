import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyType } from './company-type.entity';
import { CompanyTypeController } from './company-type.controller';
import { CompanyTypeService } from './company-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyType])],
  controllers: [CompanyTypeController],
  providers: [CompanyTypeService],
  exports: [CompanyTypeService],
})
export class CompanyTypeModule {}
