import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) {}

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

  // async seed() {
  //   roleSeeder.forEach(async (element) => {
  //     const role = await this.findBy(element.name);
  //     if (!role.length) this.repo.save(element);
  //   });
  //
  //   console.log('Seeding done! Roles');
  // }
}
