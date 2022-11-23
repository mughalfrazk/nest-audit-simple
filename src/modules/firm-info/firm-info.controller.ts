import { Controller, UseGuards } from '@nestjs/common';
import { FirmInfoService } from './firm-info.service';
import { AuthGuard } from '../../authentication/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('firm-info')
export class FirmInfoController {
  constructor(private firmInfoService: FirmInfoService) {}
}
