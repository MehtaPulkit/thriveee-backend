import { Module } from '@nestjs/common';
import { ServiceComponentRatesService } from './service-component-rates.service';
import { ServiceComponentRatesController } from './service-component-rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceComponent } from 'src/service-components/service-component.entity';
import { ServiceComponentRate } from './service-component-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceComponentRate, ServiceComponent])],
  controllers: [ServiceComponentRatesController],
  providers: [ServiceComponentRatesService],
  exports: [ServiceComponentRatesService]
})
export class ServiceComponentRatesModule { }
