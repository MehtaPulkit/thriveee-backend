import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './bookings.entity';
import { Service } from 'src/services/services.entity';
import { Provider } from 'src/providers/provider.entity';
import { Order } from 'src/orders/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Service, Provider, Order])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule { }
