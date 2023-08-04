import { Expose, Transform } from "class-transformer";

// Map FirmClient onto Client
export class ClientDto {
  @Expose()
  @Transform((value) => value.obj.client.id)
  id: number;

  @Expose()
  @Transform((value) => value.obj.client.name)
  name: string;

  @Expose()
  @Transform((value) => value.obj.client.abbreviation)
  abbreviation: string;

  @Expose()
  bucket_folder: string;

  @Expose()
  @Transform((value) => value.obj.client.created_at)
  created_at: Date;
}