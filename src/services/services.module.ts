import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { Suburb } from '../suburbs/suburb.entity';
import { Service } from './services.entity';
import { ServiceSubcategory } from 'src/service-subcategories/service-subcategories.entity';
import { ServiceCategory } from 'src/service-categories/service-categories.entity';
import { ServicesController } from './services.controller';
import { ProviderService } from 'src/provider-services/provider-service.entity';
import { ServiceComponent } from 'src/service-components/service-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceCategory, ServiceSubcategory, Suburb, ProviderService, ServiceComponent])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule { }
