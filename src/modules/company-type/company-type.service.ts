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
    const type = await this.repo.findOneBy({ id });
    if (!!type.deleted_at) return null;
    return type;
  }

  async find() {
    return await this.repo.find();
  }

  async findBy(name: string) {
    if (!name) return null;
    return await this.repo.findBy({ name });
  }

  async seed() {
    try {
      let dataArray = [];

      for (let i = 0; i < companyTypeSeeder.length; i++) {
        const element = companyTypeSeeder[i];
        const entity = await this.findBy(element.name);
        if (!entity.length) dataArray.push(element)
      }
      
      if (!!dataArray.length) await this.repo.save(dataArray);
      console.log('Seeding done! Company Types');
    } catch (error) {
      console.log("Seeding error! Company Types => ", error)
    }
  }
}
