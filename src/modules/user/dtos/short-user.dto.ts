import { Expose } from 'class-transformer';

export class ShortUserDto {
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
}
