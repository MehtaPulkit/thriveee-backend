import { Module } from '@nestjs/common';
import { ServiceMultipliersController } from './service-multipliers.controller';
import { ServiceMultipliersService } from './service-multipliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceMultiplier } from './service-multiplier.entity';
import { Service } from '../services/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceMultiplier, Service])],
  controllers: [ServiceMultipliersController],
  providers: [ServiceMultipliersService],
  exports: [ServiceMultipliersService],
})
export class ServiceMultipliersModule {}
