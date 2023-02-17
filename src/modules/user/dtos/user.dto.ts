import { Expose, Type } from 'class-transformer';
import { CompanyDto } from 'src/modules/company/dtos/company.dto';
import { RoleDto } from 'src/modules/role/dtos/role.dto';

export class UserDto {
  @Expose()
  id: number;

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
