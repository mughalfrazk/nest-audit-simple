import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyType } from './company-type.entity';
import { companyTypeSeeder } from './company-type.seeder';

@Injectable()
export class CompanyTypeService {
  constructor(
    @InjectRepository(CompanyType) private repo: Repository<CompanyType>,
  ) {}

  async create(role) {
    const { name, description } = role;

    const entity = await this.repo.create({
      name,
      description,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<CompanyType> | null {
    if (!id) return null;
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async findBy(name: string) {
    if (!name) return null;
    return await this.repo.findBy({ name });
  }

  async seed() {
    companyTypeSeeder.forEach(async (element) => {
      const type = await this.findBy(element.name);
      if (!type.length) this.repo.save(element);
    });

    console.log('Seeding done! Company Type');
  }
}
