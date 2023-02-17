import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Action } from './modules/action/action.entity';
import { Attachment } from './modules/attachment/attachment.entity';
import { City } from './modules/city/city.entity';
import { ClientAssignment } from './modules/client-assignment/client-assignment.entity';
import { CompanyType } from './modules/company-type/company-type.entity';
import { Company } from './modules/company/company.entity';
import { ContactInformationType } from './modules/contact-information-type/contact-information-type.entity';
import { ContactInformation } from './modules/contact-information/contact-information.entity';
import { Country } from './modules/country/country.entity';
import { Designation } from './modules/designation/designation.entity';
import { Document } from './modules/document/document.entity';
import { FirmClient } from './modules/firm-client/firm-client.entity';
import { FirmInfo } from './modules/firm-info/firm-info.entity';
import { Folder } from './modules/folder/folder.entity';
import { Module as EModule } from './modules/module/module.entity';
import { Permission } from './modules/permission/permission.entity';
import { Record } from './modules/record/record.entity';
import { RolePermission } from './modules/role-permission/role-permission.entity';
import { Role } from './modules/role/role.entity';
import { RoleModule } from './modules/role/role.module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { CompanyTypeModule } from './modules/company-type/company-type.module';
import { CompanyModule } from './modules/company/company.module';
import { ContactInformationTypeModule } from './modules/contact-information-type/contact-information-type.module';
import { DesignationModule } from "./modules/designation/designation.module";
import { FolderModule } from './modules/folder/folder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // database: 'db.sqlite',
      url: 'postgresql://postgres:faraz1412@localhost:5432/audit-simple',
      entities: [
        Action,
        City,
        ClientAssignment,
        Company,
        CompanyType,
        ContactInformation,
        ContactInformationType,
        Country,
        Designation,
        Document,
        FirmClient,
        FirmInfo,
        Folder,
        EModule,
        Permission,
        Record,
        Role,
        RolePermission,
        User,
        Attachment,
      ],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    RoleModule,
    CompanyModule,
    CompanyTypeModule,
    ContactInformationTypeModule,
    DesignationModule,
    FolderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
