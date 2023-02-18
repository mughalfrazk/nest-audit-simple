import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';

@Injectable()
export class FolderService {
  constructor(@InjectRepository(Folder) private repo: Repository<Folder>) {}

  async findOne(id: number, relations): Promise<Folder> | null {
    if (!id) return null;
    return await this.repo.findOne({ where: { id }, relations });
  }

  async find(options: any = null, relations: string[] = []) {
    const { level_no = 0, name, client } = options;

    if (!options) return null;
    return this.repo.find({ where: { level_no, name, client: { id: client } }, relations });
  }

  async create(folder) {
    const { level_no, name, description, client, parent } = folder
    return this.repo.save({ level_no, name, description, client, parent });
  }
}