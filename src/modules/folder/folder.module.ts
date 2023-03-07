import { Module } from '@nestjs/common'
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyModule } from '../company/company.module';
import { FolderController } from "./folder.controller";
import { Folder } from "./folder.entity";
import { FolderService } from "./folder.service";

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), CompanyModule],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService]
})
export class FolderModule {}