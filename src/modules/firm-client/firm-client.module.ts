import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirmClient } from './firm-client.entity';
import { FirmClientService } from './firm-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([FirmClient])],
  providers: [FirmClientService],
  exports: [FirmClientService],
})
export class FirmClientModule {}
