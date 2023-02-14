import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FirmClient } from './firm-client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FirmClientService {
  constructor(
    @InjectRepository(FirmClient) private repo: Repository<FirmClient>,
  ) {}

  async create(data: Partial<FirmClient>) {
    const { firm, client } = data;

    const entity = this.repo.create({
      firm,
      client,
    });
    return this.repo.save(entity);
  }
}
