import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { S3Service } from "../../services/aws/s3.service";
import { DocumentController } from "./document.controller";
import { Document } from "./document.entity";
import { DocumentService } from "./document.service";

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [DocumentService, S3Service],
  exports: [DocumentService, S3Service]
})
export class DocumentModule {}