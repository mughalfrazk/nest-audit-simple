import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toSnakeCase } from '../../services/utils/functions';
import { Designation } from './designation.entity';

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
    return this.repo.findBy({ name });
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
}
