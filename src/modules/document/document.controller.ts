import { UseGuards, Body, Controller, Post, Param, UploadedFiles, UseInterceptors, BadRequestException, UnauthorizedException, InternalServerErrorException, Get, Patch, Query } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { S3Service } from "../../services/aws/s3.service";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dtos/create-document.dto";
import { FirmClientService } from "../firm-client/firm-client.service";
import { JwtAuthGuard } from "../../authentication/guards/jwt-auth.guard";
import { GetAuthorizedUser } from "../../authentication/decorators/authorize-user.decorator";
import { strings } from "../../services/constants/strings";
import { UpdateDocumentDto } from "./dtos/update-document.dto";
import { RecordService } from "../record/record.service";
import { ActionService } from "../action/action.service";
import { ModuleService } from "../module/module.service";

@ApiTags('Document')
@Controller('document')
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(
    private documentService: DocumentService,
    private firmClientService: FirmClientService,
    private actionService: ActionService,
    private recordService: RecordService,
    private moduleService: ModuleService,
    private s3Service: S3Service
  ) { }

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'))
  async saveNewDocument(@GetAuthorizedUser() user, @Body() body: CreateDocumentDto, @UploadedFiles() files: Array<Express.Multer.File>) {
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

  @Patch('/:id')
  async updateDocuemnt(@GetAuthorizedUser() user, @Param('id') id: number, @Body() body: UpdateDocumentDto) {

    let updateBody;
    let checkDocument;

    if (user.role.identifier === strings.roles.EMPLOYEE) {
      const checkForSameFirm = await this.firmClientService.findBy({ client: { id: body.client }, firm: { id: user.company.id } }, [])
      if (!checkForSameFirm.length) throw new UnauthorizedException("You are not authorised for action")

      const client_permissions = user.client_assignments.filter(item => item.company.id === body.client)
      if (!client_permissions.length) throw new UnauthorizedException("You are not authorised for action")

      if (!!body.audit_date) {
        const checkForSameFirm = await this.firmClientService.findBy({ client: { id: body.client }, firm: { id: user.company.id } }, [])
        if (!checkForSameFirm.length) throw new UnauthorizedException("You are not authorised for action")

        const assigned_role = client_permissions.filter(item => item.action.identifier === strings.actions.UPDATE)
        if (!assigned_role.length) throw new UnauthorizedException("You are not authorised for action")

        updateBody = { audit_date: body.audit_date }
      } else if (!!body.reviewed) {
        const assigned_role = client_permissions.filter(item => item.action.identifier === strings.actions.REVIEW)
        if (!assigned_role.length) throw new UnauthorizedException("You are not authorised for action")

        updateBody = { reviewed_by: user.id }
      }
    } else if (user.role.identifier === strings.roles.ADMIN) {
      checkDocument = await this.documentService.find({ id }, ['client.clients.firm'])
      if (!checkDocument.length) throw new BadRequestException('Invalid Document');
      if (checkDocument[0].client.clients[0].firm.id !== user.company.id) throw new UnauthorizedException("You are not authorised for action");

      if (!!body.audit_date) {
        updateBody = { audit_date: body.audit_date }
      } else if (!!body.reviewed) {
        updateBody = { reviewed_by: user.id }
      }

    } else {
      if (!!body.audit_date) {
        updateBody = { audit_date: body.audit_date }
      } else if (!!body.reviewed) {
        updateBody = { reviewed_by: user.id }
      }
    }

    const actions = await this.actionService.findBy(null);
    const [module] = await this.moduleService.findBy('document');


    let recordBody = { action: null, created_by: user.id, recordable_type: module.id, recordable_id: +id, old_value: null, new_value: null }
    if (!!body.audit_date) {
      const [getOldValue] = await this.documentService.find({ id, client: { id: body.client } });
      if (!getOldValue) throw new UnauthorizedException("You are not authorised for action");

      recordBody.old_value = getOldValue[Object.getOwnPropertyNames(updateBody)[0]]
      recordBody.new_value = updateBody.audit_date
      const [action] = actions.filter(item => item.identifier === strings.actions.UPDATE)
      recordBody.action = action.id
    } else if (!!body.reviewed) {
      const [action] = actions.filter(item => item.identifier === strings.actions.REVIEW)
      recordBody.action = action.id
    }

    await this.recordService.create(recordBody);
    return this.documentService.update({ id, client: { id: body.client } }, updateBody)
  }

  @Get('/:id')
  async downloadDocument(@GetAuthorizedUser() user, @Param('id') id: number) {
    const [document] = await this.documentService.find({ id }, ['client.clients.firm']);
    const firmBucket = document.client.clients[0].firm.bucket_name;
    const documentKey = decodeURI(document.path.split(firmBucket)[1].substring(1));
    const s3Object = await this.s3Service.getFileFromS3(firmBucket, documentKey);
    s3Object['name'] = document.name;
    return s3Object 
  }
}