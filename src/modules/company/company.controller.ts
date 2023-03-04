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
import { workspaceName } from '../../services/utils/functions';
import { S3Service } from '../../services/aws/s3.service';
import { FirmClientService } from '../firm-client/firm-client.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update=company.dto';
import { UserService } from '../user/user.service';
import { AuthService } from '../../authentication/auth.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private companyService: CompanyService,
    private companyTypeService: CompanyTypeService,
    private firmClientService: FirmClientService,
    private userService: UserService,
    private authService: AuthService,
    private s3Service: S3Service
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
    const isFirm = company_type.name === 'Firm';

    const checkComapny = await this.companyService.findBy({ name });
    if (!!checkComapny.length) throw new BadRequestException('Company already exists')

    const checkAbbreviation = await this.companyService.findBy({ abbreviation });
    if (!!checkAbbreviation.length) throw new BadRequestException('Abbreviation not available')

    let firm;
    if (!isFirm) {
      // Check if the firm exist, if not error out.
      firm = await this.companyService.findOne(firm_id);
      if (!firm) throw new BadRequestException('Invalid firm selected.')
    } else {
      // Check if the email doesn't already exist, If it does error out.
      const user = await this.userService.findBy(email);
      if (!!user.length) throw new BadRequestException('Email already in use.')
    }

    // Create new company.
    let workspace = workspaceName(abbreviation);
    const companyInfo = { name, abbreviation, company_type, workspace: isFirm ? workspace : undefined, bucket_name: isFirm ? workspace : undefined };
    const company = await this.companyService.create(companyInfo);


    if (!isFirm) {
      // Create relation of client with firm.
      let pivotInfo = { firm, client: company, bucket_folder: company.abbreviation }
      let firmClient = await this.firmClientService.create(pivotInfo);
      await this.s3Service.createNewFolder(firm.bucket_name, company.abbreviation);

      return { message: 'Client created!', data: firmClient, statusCode: 201 };
    }
    
    // Create new s3 bucket for firm.
    await this.s3Service.createNewBucket(workspace);

    // Create admin user for firm.
    let employee_data = { first_name, last_name, email, password, company }
    const employee = await this.authService.createUserByRole(employee_data, 'Admin')

    return { message: 'Company created!', data: {company, employee}, statusCode: 201 };
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
