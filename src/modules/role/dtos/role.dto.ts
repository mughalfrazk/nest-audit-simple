import { Expose } from 'class-transformer';

export class RoleDto {
  @Expose()
  name: string;

  @Expose()
  identifier: string;

  @Expose()
  description: string;
}
