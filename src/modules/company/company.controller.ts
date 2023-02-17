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
import { RoleService } from '../role/role.service';
import { AuthService } from 'src/authentication/auth.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private companyTypeService: CompanyTypeService,
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
    const { company_type_id, name, abbreviation, firm_id, first_name, last_name, email, password } = body;
    const company_type = await this.companyTypeService.findOne(company_type_id);
        
    const checkComapny = await this.companyService.findBy(body.name);
    if (!!checkComapny.length) throw new BadRequestException('Company already exists')

    let firm;
    if (company_type.name === 'Client') {
      const firm = await this.companyService.findOne(firm_id);
      if (!!firm) throw new BadRequestException('Invalid firm selected.')
    }

    const companyInfo = { name, abbreviation, company_type };
    const company = await this.companyService.create(companyInfo);

    if (company_type.name === 'Client') {
      let firmInfo = { firm, client: company }
      let firmClient = await this.firmClientService.create(firmInfo);

      return { message: 'Company created!', data: firmClient, statusCode: 201 };
    }

    let firmInfo = await this.firmInfoService.create({
      workspace: workspaceName(company.abbreviation),
      company: company,
    });

    let employee_data = {
      first_name,
      last_name,
      email,
      password,
      company
    }

    const employee = await this.authService.createUserByRole(employee_data, 'Admin')

    return { message: 'Company created!', data: {firmInfo, employee}, statusCode: 201 };
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
