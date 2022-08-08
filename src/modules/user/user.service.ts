import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create({email, password, first_name, last_name}) {
    const user = await this.repo.create({ email, password, first_name, last_name });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne(id);
  }

  find(email: string) {
    if (!email) return null;
    return this.repo.find({ email })
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    return this.repo.remove(user);
  }
}