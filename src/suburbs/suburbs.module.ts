import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuburbsService } from './suburbs.service';
import { SuburbsController } from './suburbs.controller';
import { Suburb } from './suburb.entity';
import { ProviderSuburb } from '../provider-suburbs/provider-suburb.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Suburb, ProviderSuburb])],
  controllers: [SuburbsController],
  providers: [SuburbsService],
  exports: [SuburbsService],
})
export class SuburbsModule { }
