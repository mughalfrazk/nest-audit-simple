import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { IsNull, Repository } from 'typeorm';
import { employeeSeeder } from './employee.seeder';
import { CompanyService } from '../company/company.service';
import { DesignationService } from '../designation/designation.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private repo: Repository<Employee>,
    private userService: UserService,
    private companyService: CompanyService,
    private designationService: DesignationService,
    private roleService: RoleService
  ) {}

  async create(employee) {
    const { employee_no, user, designation, role, company } = employee;

    const entity = await this.repo.create({
      employee_no,
      user,
      designation,
      role,
      company,
    });
    return this.repo.save(entity);
  }

  async findBy(employee_no?: string) {
    if (!employee_no) return this.repo.find();
    return this.repo.findBy({ employee_no, deleted_at: IsNull() });
  }

  async seed() {
    try {
      let dataArray = [];

      for (let i = 0; i < employeeSeeder.length; i++) {
        const element = employeeSeeder[i];
        const entity = await this.findBy(String(element.employee_no));
        if (!entity.length) {
          const [user] = await this.userService.findBy(element.user_email)
          const [company] = await this.companyService.findBy(element.company_name)
          const [designation] = await this.designationService.findBy(element.designation_name)
          const [role] = await this.roleService.findBy(element.role_name)
          if (!!user && !!company && !!designation && !!role) {
            element['user'] = user;
            element['company'] = company;
            element['designation'] = designation;
            element['role'] = role;
            dataArray.push(element)
          }
        }
      }
      
      if (!!dataArray.length) await this.repo.save(dataArray);
      console.log('Seeding done! Employee');
    } catch (error) {
      console.log("Seeding error! Employee => ", error)
    }
  }
}
