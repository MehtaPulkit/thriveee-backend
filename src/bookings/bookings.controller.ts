import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './bookings.entity';
import { CheckoutDto } from './dto/checkout.dto';
import { BookingOrchestratorService } from './booking-orchestrator.service';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService, private readonly bookingOrchestratorService: BookingOrchestratorService,) { }

    // CREATE
    @Post()
    create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingsService.create(createBookingDto);
    }

    // READ ALL
    @Get()
    findAll(): Promise<Booking[]> {
        return this.bookingsService.findAll();
    }

    // READ ONE
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Booking> {
        return this.bookingsService.findOne(id);
    }

    // UPDATE
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBookingDto: UpdateBookingDto,
    ): Promise<Booking> {
        return this.bookingsService.update(id, updateBookingDto);
    }

    // DELETE
    @Delete(':id')
    remove(@Param('id') id: string): Promise<{ message: string }> {
        return this.bookingsService.remove(id);
    }

    @Post('checkout')
    async checkout(@Body() dto: CheckoutDto) {
        return this.bookingOrchestratorService.checkout(dto);
    }


}
