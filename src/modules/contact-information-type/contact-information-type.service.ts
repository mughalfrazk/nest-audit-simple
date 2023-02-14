import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { roleSeeder } from '../role/role.seeder';
import { ContactInformationType } from './contact-information-type.entity';
import { contactInformationTypeSeeder } from "./contact-information-type.seeder";

@Injectable()
export class ContactInformationTypeService {
  constructor(@InjectRepository(ContactInformationType) private repo: Repository<ContactInformationType>) {}

  async create(role) {
    const { name, description } = role;

    const entity = await this.repo.create({
      name,
      description,
    });
    return this.repo.save(entity);
  }

  async findOne(id: number): Promise<ContactInformationType> | null {
    if (!id) return null;
    const contactInfo = await this.repo.findOneBy({ id });

    return contactInfo;
  }

  async find() {
    return await this.repo.find();
  }

  async findBy(name: string) {
    if (!name) return null;
    return await this.repo.findBy({ name });
  }

  async update(id: number, attrs: Partial<ContactInformationType>) {
    const { name, description } = attrs;

    this.repo.update(id, { name, description });
    return {
      message: 'Contact Information Type successfully',
      statusCode: 200,
    };
  }

  async remove(id: number) {
    this.repo.update(id, { deleted_at: new Date() });
    return { message: 'Contact Information Type deleted!', statusCode: 200 };
  }

  async seed() {
    contactInformationTypeSeeder.forEach(async (element) => {
      const contactInfo = await this.findBy(element.name);
      if (!contactInfo.length) this.repo.save(element);
    });

    console.log('Seeding done! Contact Information Type');
  }
}
