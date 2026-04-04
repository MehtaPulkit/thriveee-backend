import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceComponentRate } from '../service-component-rates/service-component-rate.entity';
import { ServiceComponent } from '../service-components/service-component.entity';
import { ServiceMultiplier } from '../service-multipliers/service-multiplier.entity';
import { Service } from '../services/services.entity';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Service,
      ServiceComponent,
      ServiceComponentRate,
      ServiceMultiplier,
    ]),
  ],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService],
})
export class PricingModule {}
