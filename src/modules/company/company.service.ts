import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { companySeeder } from './company.seeder';
import { CompanyTypeService } from '../company-type/company-type.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private repo: Repository<Company>,
    private companyTypeService: CompanyTypeService
  ) {}

  async create(company) {
    const { name, abbreviation, company_type } = company;

    const entity = await this.repo.create({
      name,
      abbreviation,
      company_type,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<Company> | null {
    if (!id) return null;
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async findBy(name: string) {
    if (!name) return null;
    return await this.repo.find();
  }

  async update(id: number, attrs: Partial<Company>) {
    const { name, abbreviation } = attrs;

    this.repo.update(id, { name, abbreviation });
    return { message: 'Company updated successfully', statusCode: 200 };
  }

  async remove(id: number) {
    this.repo.update(id, { deleted_at: new Date() });
    return { message: 'Company deleted!', statusCode: 200 };
  }

  async seed() {
    try {
      let dataArray = [];

      for (let i = 0; i < companySeeder.length; i++) {
        const element = companySeeder[i];
        const entity = await this.findBy(element.name);
        if (!entity.length) {
          const [company_type] = await this.companyTypeService.findBy(element.company_type_name)
          if (!!company_type) {
            element['company_type'] = company_type;
            dataArray.push(element)
          }
        }
      }
      
      if (!!dataArray.length) await this.repo.save(dataArray);
      console.log('Seeding done! Company');
    } catch (error) {
      console.log("Seeding error! Company => ", error)
    }
  }
}
