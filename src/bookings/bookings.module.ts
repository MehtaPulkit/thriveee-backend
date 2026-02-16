import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './bookings.entity';
import { Service } from '../services/services.entity';
import { Provider } from '../providers/provider.entity';
import { Order } from '../orders/order.entity';
import { BookingOrchestratorService } from './booking-orchestrator.service';
import { PricingModule } from '../pricing/pricing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Service, Provider, Order]), PricingModule],
  controllers: [BookingsController],
  providers: [BookingsService, BookingOrchestratorService],
  exports: [BookingsService, BookingOrchestratorService],
})
export class BookingsModule { }
