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
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyTypeService } from '../company-type/company-type.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private companyTypeService: CompanyTypeService,
  ) {}

  @Get('/')
  async index() {
    return await this.companyService.find();
  }

  @Get('/:id')
  async indexAll(@Param('id') id: number) {
    return await this.companyService.findOne(id);
  }

  @Post('/')
  async create(@Body() body: any) {
    const { company_type_id } = body;
    const company_type = await this.companyTypeService.findOne(company_type_id);

    const company = { ...body, company_type };
    return await this.companyService.create(company);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    const info = await this.companyService.findOne(id);
    if (!info) throw new NotFoundException('Role not found.');

    return this.companyService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await this.companyService.findOne(id);
    if (!user) throw new NotFoundException('Role not found.');

    return this.companyService.remove(id);
  }
}
