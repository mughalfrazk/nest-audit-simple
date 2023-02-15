import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Role } from './role.entity';
import { toSnakeCase } from '../../services/utils/functions';
import { roleSeeder } from './role.seeder';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) {}

  async create({ name, description, identifier }): Promise<Role> | null {
    const entity = await this.repo.create({
      name,
      description,
      identifier,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<Role> | null {
    return this.repo.findOneBy({ id, deleted_at: IsNull() });
  }

  async findBy(name?: string) {
    if (!name) return this.repo.find();
    return this.repo.findBy({ name, deleted_at: IsNull() });
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
    try {
      let dataArray = [];

      for (let i = 0; i < roleSeeder.length; i++) {
        const element = roleSeeder[i];
        const entity = await this.findBy(element.name);
        if (!entity.length) dataArray.push(element)
      }
      
      if (!!dataArray.length) await this.repo.save(dataArray);
      console.log('Seeding done! Roles');
    } catch (error) {
      console.log("Seeding error! Roles => ", error)
    }
  }
}
