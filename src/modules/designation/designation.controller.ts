import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { CompanyService } from '../company/company.service';
import { CreateDesignationDto } from './dtos/create-designation-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Designation')
@Controller('designation')
export class DesignationController {
  constructor(
    private designationService: DesignationService,
    private companyService: CompanyService,
  ) {}

  @Get('/:id')
  async index(@Param('id') id: number) {
    return await this.designationService.findOne(id);
  }

  @Get('/')
  async indexAll() {
    return await this.designationService.findBy();
  }

  @Post('/')
  async create(
    @Body() { name, description, company_id }: CreateDesignationDto,
  ) {
    const company = await this.companyService.findOne(company_id);
    return await this.designationService.create({ name, description, company });
  }
}
