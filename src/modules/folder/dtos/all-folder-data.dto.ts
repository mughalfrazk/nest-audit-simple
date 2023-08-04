import { Expose } from "class-transformer";
import { DocumentDto } from "../../../modules/document/dtos/document.dto";

export class AllFolderDataDto {
  @Expose()
  id: number;

  @Expose()
  level_no: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  children: AllFolderDataDto;

  @Expose()
  documents: DocumentDto
}