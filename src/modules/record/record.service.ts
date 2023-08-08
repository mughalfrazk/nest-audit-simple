import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Record } from "./record.entity";
import { Repository } from "typeorm";

@Injectable()
export class RecordService {
  constructor(@InjectRepository(Record) private repo: Repository<Record>) { }

  async create(record) {
    const { action, created_by, recordable_type, recordable_id, old_value, new_value } = record
    console.log(record)
    return this.repo.save({
      action, created_by, recordable_type, recordable_id, old_value, new_value
    });
  }
}