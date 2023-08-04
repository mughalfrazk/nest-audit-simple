import { UseGuards, Body, Controller, Post, UploadedFiles, UseInterceptors, BadRequestException, UnauthorizedException, InternalServerErrorException, Get } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { S3Service } from "../../services/aws/s3.service";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dtos/create-document.dto";
import { CompanyService } from "../company/company.service";
import { FirmClientService } from "../firm-client/firm-client.service";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { GetAuthorizedUser } from "../../authentication/decorators/authorize-user.decorator";
import { strings } from "../../services/constants/strings";

@ApiTags('Document')
@Controller('document')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(
    private documentService: DocumentService,
    private firmClientService: FirmClientService,
    private s3Service: S3Service
  ) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  async saveNewDocument(@GetAuthorizedUser(strings.roles.EMPLOYEE) user, @Body() body: CreateDocumentDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files.length) throw new BadRequestException('File not found');

    const [firmClient] = await this.firmClientService.findBy({ client: { id: body.client }, firm: { id: user.company.id } }, ['firm', 'client']);
    if (!firmClient) throw new BadRequestException('Invalid client selected.')

    if (user.role.identifier === strings.roles.EMPLOYEE) {
      const client_permissions = user.client_assignments.filter(item => item.company.id === +body.client)
      if (!client_permissions.length) throw new UnauthorizedException()

      const assigned_role = client_permissions.filter(item => item.action.identifier === strings.actions.CREATE)
      if (!assigned_role.length) throw new UnauthorizedException()
    }

    body['uploaded_by'] = user.id;

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
     
        const existingFile = await this.documentService.find({ name: file.originalname, folder: { id: body.folder }, client: { id: body.client } })
        if (!!existingFile.length) throw new BadRequestException('File already exists')
    
        const fileLocation = await this.s3Service.uploadNewFile(`${firmClient.firm.bucket_name}/${firmClient.bucket_folder}`, file.originalname, file.buffer)
        body['name'] = file.originalname
        body['path'] = fileLocation
        await this.documentService.create(body);
      }
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException("Upload interrupted, something went wrong.")
    }

    return "Documents Upload Successfully"
  }
}