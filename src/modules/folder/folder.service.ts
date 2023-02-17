import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService {
  constructor(@InjectRepository(Folder) private repo: Repository<Folder>) {}

  async findOne(id: number): Promise<Folder> | null {
    if (!id) return null;
    return await this.repo.findOneBy({ id });
  }

  async find(options: any = null) {
    if (!options) return this.repo.find({ where: { level_no: 0 }, relations: ['children'] });
    return await this.repo.findBy({ client: 1 })
  }

  async create(folder) {
    const { level_no, name, description, client, parent } = folder
    return this.repo.save({ level_no, name, description, client, parent });
  }
}