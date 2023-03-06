import { Expose, Type } from 'class-transformer';
import { CompanyDto } from '../../company/dtos/company.dto';
import { RoleDto } from '../../role/dtos/role.dto';

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
  created_at: Date;

  @Expose()
  updated_at: Date;
}
