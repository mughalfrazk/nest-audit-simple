import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirmClient } from './firm-client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FirmClientService {
  constructor(
    @InjectRepository(FirmClient) private repo: Repository<FirmClient>,
  ) {}

  async findBy(options: any, relations: any[]) {
    return this.repo.find({ where: {...options}, relations })
  }

  async create(data: Partial<FirmClient>) {
    const { firm, client, bucket_folder } = data;

    const entity = this.repo.create({
      firm,
      client,
      bucket_folder
    });
    return this.repo.save(entity);
  }
}
