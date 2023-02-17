import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { toSnakeCase } from '../../services/utils/functions';
import { CompanyService } from '../company/company.service';
import { Designation } from './designation.entity';
import { designationSeeder } from './designation.seeder';

@Injectable()
export class DesignationService {
  constructor(@InjectRepository(Designation) private repo: Repository<Designation>) {}

  async create({ name, description, company }): Promise<Designation> | null {
    const entity = await this.repo.create({
      name,
      description,
      company,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<Designation> | null {
    return this.repo.findOneBy({ id });
  }

  async findBy(name?: string) {
    if (!name) return this.repo.find();
    return this.repo.findBy({ name, deleted_at: IsNull() });
  }

  async update(id: number, attrs: Partial<Designation>) {
    const { name, description } = attrs;

    const body = { name, description };
    if (name) body['identifier'] = toSnakeCase(name);

    this.repo.update(id, body);
    return { message: 'Designation updated successfully', statusCode: 200 };
  }

  async remove(id: number) {
    this.repo.update(id, { deleted_at: new Date() });
    return { message: 'Designation deleted!', statusCode: 200 };
  }

  async seed() {
    // try {
    //   let dataArray = [];

    //   for (let i = 0; i < designationSeeder.length; i++) {
    //     const element = designationSeeder[i];
    //     const entity = await this.findBy(element.name);
    //     if (!entity.length) {
    //       const [company] = await this.companyService.findBy(element.company_name)
    //       if (!!company) {
    //         element['company'] = company
    //         dataArray.push(element)
    //       }
    //     }
    //   }
      
    //   if (!!dataArray.length) await this.repo.save(dataArray);
    //   console.log('Seeding done! Designation');
    // } catch (error) {
    //   console.log("Seeding error! Designation => ", error)
    // }  
  }
}
