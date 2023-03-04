import { Controller, UseGuards, Body, Get, Post, Patch, Delete, Param, BadRequestException, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../authentication/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { FolderService } from "./folder.service";

@ApiTags('Folder')
@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Get('/:id')
  async index(@Param('id') id: number, @CurrentUser() user: User) {

  }

  @Get('/')
  async getByLevel(@Query("level_no") level_no: number = 0, @Query("client") client: number) {
    if (!client) throw new BadRequestException("Please define a valid client");
    return this.folderService.find({ level_no, client }, ['children']);
  }

  @Post('/')
  async create(@Body() body: CreateFolderDto, @CurrentUser() user: User) {
    const { name, client, parent } = body;

    let level_no = 0;
    let client_id = client
    if (!!parent) {
      const parentEntity = await this.folderService.findOne(parent, ['client'])
      if (!!parentEntity) {
        level_no = parentEntity.level_no + 1;
        client_id = parentEntity?.client?.id
        body['client'] = client_id;
      }
    }
    body['level_no'] = level_no;

    const checkFolder = await this.folderService.find({ level_no, name, client: client_id });
    console.log(checkFolder)
    if (!!checkFolder.length) throw new BadRequestException('Folder already exists')

    return this.folderService.create(body)
  }
}