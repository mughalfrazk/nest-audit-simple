import { Expose } from 'class-transformer';
import { ShortUserDto } from '../../../modules/user/dtos/short-user.dto';

export class DocumentDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  path: string;

  @Expose()
  audit_date: Date;

  @Expose()
  uploaded_by: ShortUserDto;

  @Expose()
  reviewed_by: ShortUserDto;
}
