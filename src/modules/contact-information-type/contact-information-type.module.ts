import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInformationType } from './contact-information-type.entity';
import { ContactInformationTypeController } from './contact-information-type.controller';
import { ContactInformationTypeService } from './contact-information-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInformationType])],
  controllers: [ContactInformationTypeController],
  providers: [ContactInformationTypeService],
  exports: [ContactInformationTypeService],
})
export class ContactInformationTypeModule {}
