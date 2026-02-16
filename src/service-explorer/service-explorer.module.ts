import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceExplorerService } from './service-explorer.service';
import { ServiceExplorerController } from './service-explorer.controller';
import { ProviderSuburb } from '../provider-suburbs/provider-suburb.entity';
import { ProviderService } from '../provider-services/provider-service.entity';
import { Service } from '../services/services.entity';
import { ServiceCategory } from '../service-categories/service-categories.entity';
import { ServiceSubcategory } from '../service-subcategories/service-subcategories.entity';
import { Suburb } from '../suburbs/suburb.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProviderSuburb,
      ProviderService,
      Service,
      ServiceCategory,
      ServiceSubcategory,
      Suburb
    ]),
  ],
  controllers: [ServiceExplorerController],
  providers: [ServiceExplorerService],
})
export class ServiceExplorerModule { }
