import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DocumentService } from "./document.service";

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}
}