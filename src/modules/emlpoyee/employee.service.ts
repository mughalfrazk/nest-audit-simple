import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(Employee) private repo: Repository<Employee>) {}

  async create(employee) {
    const { employee_no, user, designation, role, firm } = employee;

    const entity = await this.repo.create({
      employee_no,
      user,
      designation,
      role,
      firm,
    });
    return this.repo.save(entity);
  }
}
