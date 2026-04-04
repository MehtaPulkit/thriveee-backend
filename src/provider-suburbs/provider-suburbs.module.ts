import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderSuburb } from './provider-suburb.entity';
import { ProviderSuburbsService } from './provider-suburbs.service';
import { ProviderSuburbsController } from './provider-suburbs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderSuburb])],
  controllers: [ProviderSuburbsController],
  providers: [ProviderSuburbsService],
  exports: [ProviderSuburbsService],
})
export class ProviderSuburbsModule {}
