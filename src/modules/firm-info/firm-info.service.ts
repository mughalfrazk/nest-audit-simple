import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirmInfo } from './firm-info.entity';
import { Company } from '../company/company.entity';

@Injectable()
export class FirmInfoService {
  constructor(@InjectRepository(FirmInfo) private repo: Repository<FirmInfo>) {}

  async create(firmInfo) {
    const { workspace, company } = firmInfo;

    const entity = await this.repo.create({
      workspace,
      company,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<FirmInfo> | null {
    if (!id) return null;
    return await this.repo.findOneBy({ id });
  }

  async find() {
    return await this.repo.find();
  }

  async findBy(company: Company) {
    if (!company) return null;
    return await this.repo.findBy({ company });
  }

  async update(id: number, attrs: Partial<FirmInfo>) {
    const { workspace } = attrs;

    this.repo.update(id, { workspace });
    return { message: 'Firm info updated successfully', statusCode: 200 };
  }

  async remove(id: number) {
    this.repo.update(id, { deleted_at: new Date() });
    return { message: 'Firm info deleted!', statusCode: 200 };
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
