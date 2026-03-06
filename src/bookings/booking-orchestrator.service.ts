import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BookingItem } from '../booking-items/booking-item.entity';
import { OrderStatus } from '../orders/order-status.enum';
import { Order } from '../orders/order.entity';
import { PricingService } from '../pricing/pricing.service';
import { BookingStatus } from './booking-status.enum';
import { Booking } from './bookings.entity';
import { CheckoutDto } from './dto/checkout.dto';

@Injectable()
export class BookingOrchestratorService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly pricingService: PricingService,
    ) { }

    async checkout(dto: CheckoutDto) {
        return this.dataSource.transaction(async (manager) => {

            // 1️⃣ Create Order FIRST
            const order = manager.create(Order, {
                customer_id: dto.customerId,
                status: OrderStatus.DRAFT,
                currency: 'AUD',
                total_amount: 0, // temporary
            });

            await manager.save(order);

            let orderTotal = 0;
            const createdBookings: Booking[] = [];

            // 2️⃣ Loop bookings
            for (const bookingInput of dto.bookings) {

                // Calculate price
                const pricing = await this.pricingService.calculatePrice(
                    bookingInput.serviceId,
                    bookingInput.items,
                );
                // Create booking
                const booking = manager.create(Booking, {
                    service_id: bookingInput.serviceId,
                    customer_id: dto.customerId,
                    order_id: order.id,
                    status: BookingStatus.DRAFT,
                    scheduled_date: bookingInput.scheduledDate,
                    final_price: pricing.total,
                    price_breakdown: pricing,
                    time_slot: bookingInput.timeSlot,
                    notes: bookingInput.notes,
                    address_id: bookingInput.addressId,
                    cleaning_type: bookingInput.cleaning_type,
                    property_type: bookingInput.property_type,
                    storeys: bookingInput.storeys,
                    property_condition: bookingInput.property_condition,
                });

                await manager.save(booking);

                // Create booking items
                const bookingItems = bookingInput.items.map(item =>
                    manager.create(BookingItem, {
                        booking_id: booking.id,
                        component_id: item.componentId,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.totalPrice,
                    }),
                );

                await manager.save(bookingItems);

                orderTotal += pricing.total;
                createdBookings.push(booking);
            }

            // 3️⃣ Update order total
            order.total_amount = orderTotal;
            await manager.save(order);

            return {
                order,
                bookings: createdBookings,
            };
        });
    }


}
