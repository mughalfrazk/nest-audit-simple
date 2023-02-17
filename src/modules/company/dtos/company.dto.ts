import { Expose } from "class-transformer";

export class CompanyDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  abbreviation: string;
}