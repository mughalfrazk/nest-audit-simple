import { UseGuards, Body, Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { S3Service } from "../../services/aws/s3.service";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dtos/create-document.dto";
import { CompanyService } from "../company/company.service";
import { AuthGuard } from "../../authentication/guards/auth.guard";
import { FirmClientService } from "../firm-client/firm-client.service";

@ApiTags('Document')
@Controller('document')
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(
    private documentService: DocumentService,
    private companyService: CompanyService,
    private firmClientService: FirmClientService,
    private s3Service: S3Service
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async saveNewDocument(@Body() body: CreateDocumentDto, @UploadedFile() file: Express.Multer.File) {
    const [firmClient] = await this.firmClientService.findBy({ client: { id: body.client } }, ['firm', 'client']);
    if (!firmClient) throw new BadRequestException('Invalid client selected.')

    const fileLocation = await this.s3Service.uploadNewFile(`${firmClient.firm.bucket_name}/${firmClient.bucket_folder}`, file.originalname, file.buffer)
    body['name'] = file.originalname
    body['path'] = fileLocation
    return this.documentService.create(body, file);
  }
}