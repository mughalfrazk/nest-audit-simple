import { Controller, UseGuards, Body, Get, Post, Patch, Delete, Param, BadRequestException, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/authentication/decorators/current-user.decorator';
import { AuthGuard } from 'src/authentication/guards/auth.guard';
import { User } from '../user/user.entity';
import { CreateFolderDto } from './dtos/create-folder.dto';
import { Folder } from './folder.entity';
import { FolderService } from "./folder.service";

@ApiTags('Folder')
@Controller('folder')
@UseGuards(AuthGuard)
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Get('/:id')
  async index(@Param('id') id: number, @CurrentUser() user: User) {

  }

  @Get('/')
  async getByLevel(@Query("level_no") level_no: number = 0, @Query("client") client: number) {
    // if (!client) throw new BadRequestException("Please define a valid client");
    return this.folderService.find({ level_no, client });
  }

  @Post('/')
  async create(@Body() body: CreateFolderDto, @CurrentUser() user: User) {
    const { name } = body;

    let level_no = 0;
    if (!!body?.parent) {
      const parentEntity = await this.folderService.findOne(body.parent)
      if (!!parentEntity) {
        level_no = parentEntity.level_no + 1;
      }
    }
    body['level_no'] = level_no;

    const checkFolder = await this.folderService.find({ level_no, name });
    if (!!checkFolder.length) throw new BadRequestException('Folder already exists')

    return this.folderService.create(body)
  }
}