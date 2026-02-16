import { Module } from '@nestjs/common';
import { BookingItemsService } from './booking-items.service';
import { BookingItemsController } from './booking-items.controller';
import { BookingItem } from './booking-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../bookings/bookings.entity';
import { ServiceComponent } from '../service-components/service-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingItem, Booking, ServiceComponent])],
  controllers: [BookingItemsController],
  providers: [BookingItemsService],
  exports: [BookingItemsService],
})
export class BookingItemsModule { }
