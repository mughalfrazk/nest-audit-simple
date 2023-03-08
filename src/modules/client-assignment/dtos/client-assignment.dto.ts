import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../user/dtos/user.dto';
import { CompanyDto } from '../../company/dtos/company.dto';
import { RoleDto } from '../../role/dtos/role.dto';
import { ActionDto } from '../../action/dtos/action.dto';

export class ClientAssignmentDto {
  @Expose()
  id: number;

  @Expose()
  company: CompanyDto;

  @Expose()
  user: UserDto;

  @Expose()
  action: ActionDto;
}
