import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './services.service';
import { Suburb } from '../suburbs/suburb.entity';
import { Service } from './services.entity';
import { ServiceSubcategory } from 'src/service-subcategories/service-subcategories.entity';
import { ServiceCategory } from 'src/service-categories/service-categories.entity';
import { ServicesController } from './services.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceCategory, ServiceSubcategory, Suburb])],
  controllers: [ServicesController],
  providers: [Services],
  exports: [Services],
})
export class ServicesModule { }
