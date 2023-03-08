import { Expose, Type } from 'class-transformer';
import { CompanyDto } from '../../company/dtos/company.dto';
import { RoleDto } from '../../role/dtos/role.dto';

export class ActionDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  identifier: string;

  @Expose()
  description: string;
}
