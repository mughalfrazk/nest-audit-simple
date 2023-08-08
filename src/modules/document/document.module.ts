import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3Module } from "../../services/aws/s3.module";
import { CompanyModule } from "../company/company.module";
import { FirmClientModule } from "../firm-client/firm-client.module";
import { DocumentController } from "./document.controller";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";
import { RecordModule } from "../record/record.module";
import { ActionModule } from "../action/action.module";
import { ModuleModule } from "../module/module.module";

@Module({
  imports: [TypeOrmModule.forFeature([Document]), CompanyModule, FirmClientModule, RecordModule, ActionModule, ModuleModule],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}