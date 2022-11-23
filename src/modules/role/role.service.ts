import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role } from './role.entity';
import { roleSeeder } from './role.seeder';
import { toSnakeCase } from '../../services/utils/functions';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) {}

  async create(role) {
    const { name, description, identifier } = role;

    const entity = await this.repo.create({
      name,
      description,
      identifier,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<Role> | null {
    if (!id) return null;
    const role = await this.repo.findOneBy({ id });

    return role;
  }

  async find() {
    return await this.repo.find();
  }

  async findBy(name: string) {
    if (!name) return null;
    return await this.repo.findBy({ name });
  }

  async update(id: number, attrs: Partial<Role>) {
    const { name, description } = attrs;

    const body = { name, description };
    if (name) body['identifier'] = toSnakeCase(name);

    this.repo.update(id, body);
    return { message: 'Role updated successfully', statusCode: 200 };
  }

  async remove(id: number) {
    this.repo.update(id, { deleted_at: new Date() });
    return { message: 'Role deleted!', statusCode: 200 };
  }

  async seed() {
    roleSeeder.forEach(async (element) => {
      const role = await this.findBy(element.name);
      if (!role.length) this.repo.save(element);
    });

    console.log('Seeding done! Roles');
  }
}
