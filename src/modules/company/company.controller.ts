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
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update=company.dto';
import { EmployeeService } from '../emlpoyee/employee.service';
import { RoleService } from '../role/role.service';
import { AuthService } from 'src/authentication/auth.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private companyTypeService: CompanyTypeService,
    private roleService: RoleService,
    private firmInfoService: FirmInfoService,
    private firmClientService: FirmClientService,
    private authService: AuthService
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
  async create(@Body() body: CreateCompanyDto) {
    const { company_type_id } = body;

    const company_type = await this.companyTypeService.findOne(company_type_id);
    
    const companyInfo = { ...body, company_type };
    const company = await this.companyService.create(companyInfo);

    if (company_type.name === 'Client') {
      const firm = await this.companyService.findOne(body.firm_id);
      let firm_client = await this.firmClientService.create({
        firm,
        client: company,
      });

      return { message: 'Company created!', data: firm_client, statusCode: 201 };
    }

    let firm_info = await this.firmInfoService.create({
      workspace: workspaceName(company.name),
      company: company,
    });

    return { message: 'Company created!', data: firm_info, statusCode: 201 };
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateCompanyDto) {
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
