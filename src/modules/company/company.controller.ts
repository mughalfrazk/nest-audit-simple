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
  UnprocessableEntityException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyTypeService } from '../company-type/company-type.service';
import { ApiTags } from '@nestjs/swagger';
import { FirmInfoService } from '../firm-info/firm-info.service';
import { workspaceName } from '../../services/utils/functions';
import { FirmClientService } from '../firm-client/firm-client.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private companyTypeService: CompanyTypeService,
    private firmInfoService: FirmInfoService,
    private firnClientService: FirmClientService,
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
    if (company_type.name === 'Client' && !body.firm)
      throw new UnprocessableEntityException('Invalid request.');

    const companyInfo = { ...body, company_type };
    const company = await this.companyService.create(companyInfo);

    let firm_info;
    let firm_client;
    if (company_type.name === 'Firm') {
      firm_info = await this.firmInfoService.create({
        workspace: workspaceName(company.name),
        company: company,
      });
    } else {
      const firm = await this.companyService.findOne(body.firm_id);
      firm_client = await this.firnClientService.create({
        firm,
        client: company,
      });
    }

    return { message: 'Company created!', data: firm_info, statusCode: 201 };
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: any) {
    const info = await this.companyService.findOne(id);
    if (!info) throw new NotFoundException('Company not found.');

    return this.companyService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const user = await this.companyService.findOne(id);
    if (!user) throw new NotFoundException('Company not found.');

    return this.companyService.remove(id);
  }
}
