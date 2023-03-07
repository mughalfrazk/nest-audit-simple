import { Controller, Body, Get, Post, Param, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../authentication/guards/jwt-auth.guard';
import { GetAuthorizedUser } from '../../authentication/decorators/authorize-user.decorator';
import { User } from '../user/user.entity';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderService } from "./folder.service";
import { CompanyService } from '../company/company.service';

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

  }

  @Get('/')
  async getByLevel(@Query("level_no") level_no: number = 0, @Query("client") client: number) {
    if (!client) throw new BadRequestException("Please define a valid client");
    return this.folderService.find({ level_no, client }, ['children', 'documents']);
  }

  @Post('/')
  async create(@Body() body: CreateFolderDto, @GetAuthorizedUser() user: User) {
    const { name, client, parent } = body;

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