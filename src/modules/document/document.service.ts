import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Document } from "./document.entity";

@Injectable()
export class DocumentService {
  constructor(@InjectRepository(Document) private repo: Repository<Document>) {}

  async create(body) {
    const { name, description, path, audit_date, folder, client, uploaded_by, reviewed_by } = body;
    
    return body;
  }
}