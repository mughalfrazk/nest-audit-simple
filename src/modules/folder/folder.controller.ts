import { Controller, Body, Get, Post, Param, BadRequestException, Query, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { GetAuthorizedUser } from '../../authentication/decorators/authorize-user.decorator';
import { User } from '../user/user.entity';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderService } from "./folder.service";
import { CompanyService } from '../company/company.service';
import { strings } from '../../services/constants/strings';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { AllFolderDataDto } from './dtos/all-folder-data.dto';

@ApiTags('Folder')
@Controller('folder')
@UseGuards(JwtAuthGuard)
export class FolderController {
  constructor(
    private folderService: FolderService,
    private companyService: CompanyService
  ) {}

  @Get('/:id')
  async index(@Param('id') id: number, @GetAuthorizedUser() user: User) {
    return this.folderService.findOne(id, ['children', 'documents'])
  }

  @Get('/')
  @Serialize(AllFolderDataDto)
  async getAllDataOrByLevel(@Query("level") level: number | string = 0, @Query("client") client: number) {
    if (!client) throw new BadRequestException("Please define a valid client");

    let relations = []
    if (level === "all") {
      relations = ['children.documents.uploaded_by', 'children.documents.reviewed_by', 'documents.uploaded_by', 'documents.reviewed_by']
    } else {
      relations = ['children', 'documents']
    }

    const data = await this.folderService.find({ level_no: 0, client: { id: client }}, relations)
    console.log(data)
    return data
  }

  @Post('/')
  async create(@Body() body: CreateFolderDto, @GetAuthorizedUser() user: User) {
    const { name, client, parent } = body;

    if (user.role.identifier === strings.roles.EMPLOYEE) {
      const client_permissions = user.client_assignments.filter(item => item.company.id === +body.client)
      if (!client_permissions.length) throw new UnauthorizedException()

      const assigned_role = client_permissions.filter(item => item.action.identifier === strings.actions.CREATE)
      if (!assigned_role.length) throw new UnauthorizedException()
    }

    const clientEntity = await this.companyService.findOne(client);
    if (clientEntity.company_type.name === 'Firm') throw new BadRequestException('Cannot add folder for selected company.')

    let level_no = 0;
    let client_id = client
    if (!!parent) {
      const parentEntity = await this.folderService.findOne(parent, ['client'])
      if (!!parentEntity) {
        if (parentEntity.level_no === 1) throw new BadRequestException('Only 2 level of directory hierarchy allowed.')
        level_no = parentEntity.level_no + 1;
        client_id = parentEntity?.client?.id
        body['client'] = client_id;
      }
    }
    body['level_no'] = level_no;

    const checkFolder = await this.folderService.find({ level_no, name, client: client_id });
    if (!!checkFolder.length) throw new BadRequestException('Folder already exists')

    return this.folderService.create(body)
  }
}