import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, IsNull, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user) {
    const { first_name, last_name, employee_no, role, company, designation, email, password } = user;

    const entity = await this.repo.create({
      first_name,
      last_name,
      email,
      password,
      employee_no,
      role,
      company,
      designation
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<User> | null {
    if (!id) return null;
    const user = await this.repo.findOne({ where: { id, deleted_at: IsNull() }, relations: ['company', 'role', 'designation'] });

    if (user?.deleted_at) return null;
    return user;
  }

  findDetailedBy(email: string) {
    if (!email) return null;
    return this.repo.find({ where: { email, deleted_at: IsNull() }, relations: ['company', 'role', 'designation'] })
  }

  findBy(email: string) {
    if (!email) return null;
    return this.repo.findBy({ email, deleted_at: IsNull() });
  }

  async update(id: number, attrs: Partial<User>) {
    const { first_name, last_name } = attrs;
    return this.repo.update(id, { first_name, last_name });
  }

  async remove(id: number) {
    return this.repo.update(id, { deleted_at: new Date() });
  }
}