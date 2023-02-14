import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '../../authentication/guards/auth.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
import { toSnakeCase } from '../../services/utils/functions';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@UseGuards(AuthGuard)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/')
  async index() {
    return await this.roleService.findBy();
  }

  @Get('/:id')
  async indexAll(@Param('id') id: number) {
    return await this.roleService.findOne(id);
  }

  @Post('/')
  async create(@Body() body: CreateRoleDto) {
    const user = await this.roleService.findBy(body.name);
    if (!!user.length) throw new BadRequestException('Role already exist.');

    const role = { ...body, identifier: toSnakeCase(body.name) };
    return await this.roleService.create(role);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    const role = await this.roleService.findOne(id);
    if (!role) throw new NotFoundException('Role not found.');

    return this.roleService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await this.roleService.findOne(id);
    if (!user) throw new NotFoundException('Role not found.');

    return this.roleService.remove(id);
  }
}
