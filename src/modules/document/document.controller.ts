import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { S3Service } from "../../services/aws/s3.service";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dtos/create-document.dto";
import { S3 } from "aws-sdk"

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(
    private documentService: DocumentService,
    private s3Service: S3Service
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async saveNewDocument(@Body() body: CreateDocumentDto, @UploadedFile() file: Express.Multer.File) {
    return this.documentService.create(body);
  }
}