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

  async find(where: any = null, relations: string[] = []) {
    if (!where) return null;
    return this.repo.find({ where, relations });
  }

  async create(folder) {
    const { level_no, name, description, client, parent } = folder
    return this.repo.save({ level_no, name, description, client, parent });
  }
}