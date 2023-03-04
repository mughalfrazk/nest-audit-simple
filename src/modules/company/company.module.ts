import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyTypeModule } from '../company-type/company-type.module';
import { FirmClientModule } from '../firm-client/firm-client.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../../authentication/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    CompanyTypeModule,
    FirmClientModule,
    UserModule,
    AuthModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
