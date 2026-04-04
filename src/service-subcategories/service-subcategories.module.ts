import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceSubcategoriesService } from './service-subcategories.service';
import { ServiceSubcategoriesController } from './service-subcategories.controller';
import { ServiceSubcategory } from './service-subcategories.entity';
import { ServiceCategory } from '../service-categories/service-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceSubcategory, ServiceCategory])],
  controllers: [ServiceSubcategoriesController],
  providers: [ServiceSubcategoriesService],
  exports: [ServiceSubcategoriesService],
})
export class ServiceSubcategoriesModule {}
