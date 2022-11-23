import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, IsNull, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(user) {
    const { first_name, last_name, email, password } = user;

    const entity = await this.repo.create({
      first_name,
      last_name,
      email,
      password,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<User> | null {
    if (!id) return null;
    const user = await this.repo.findOneBy({ id });

    // if (user.is_deleted) return null;
    return user;
  }

  find(email: string) {
    if (!email) return null;
    // return this.repo.find({ email, is_deleted: IsNull() })
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const { first_name, last_name } = attrs;

    // Object.assign(user, { first_name, last_name });
    // user.first_name = first_name;
    // user.last_name = last_name;
    return this.repo.update(id, { first_name, last_name });
  }

  async remove(id: number) {
    // const user = await this.findOne(id);

    // user.is_deleted = new Date();
    return this.repo.update(id, { deleted_at: new Date() });
  }
}
