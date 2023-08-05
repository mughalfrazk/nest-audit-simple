import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./document.entity";

@Injectable()
export class DocumentService {
  constructor(@InjectRepository(Document) private repo: Repository<Document>) {}

  async find(options, relations: string[] = []) {
    return this.repo.find({ where: { ...options }, relations })
  }

  async create(body) {
    const { name, description, path, audit_date, folder, client, uploaded_by } = body;
    return this.repo.save({ name, description, path, audit_date, folder, client, created_at: audit_date, uploaded_by });
  }

  async update(id, body) {
    return this.repo.update(id, body);
  }
}