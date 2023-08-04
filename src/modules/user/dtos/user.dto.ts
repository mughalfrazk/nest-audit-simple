import { Expose, Transform, Type } from 'class-transformer';
import { CompanyDto } from '../../company/dtos/company.dto';
import { RoleDto } from '../../role/dtos/role.dto';
import { ClientAssignmentDto } from '../../client-assignment/dtos/client-assignment.dto';
import { IsArray } from 'class-validator';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  employee_no

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  // @Type(() => CompanyDto)
  company: CompanyDto;

  @Expose()
  role: RoleDto

  @Expose()
  client_assignments: ClientAssignmentDto;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
