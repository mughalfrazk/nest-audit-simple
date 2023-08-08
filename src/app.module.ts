import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
import { DocumentModule } from './modules/document/document.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './services/aws/s3.module';
import { AuthModule } from './authentication/auth.module';
import { ActionModule } from './modules/action/action.module';
import { ClientAssignmentModule } from './modules/client-assignment/client-assignment.module';
import { ModuleModule } from './modules/module/module.module';
import { RecordModule } from './modules/record/record.module';

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
    ConfigModule.forRoot(),
    S3Module,
    AuthModule,
    UserModule,
    RoleModule,
    ActionModule,
    CompanyModule,
    CompanyTypeModule,
    ClientAssignmentModule,
    ContactInformationTypeModule,
    DesignationModule,
    FolderModule,
    DocumentModule,
    ModuleModule,
    RecordModule
  ],
  providers: [AppService],
})
export class AppModule {}
