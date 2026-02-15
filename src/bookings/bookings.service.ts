import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './bookings.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) { }

    // CREATE
    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const booking = this.bookingRepository.create(createBookingDto);
        return this.bookingRepository.save(booking);
    }

    // READ ALL
    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.find({
            relations: ['service', 'provider', 'order'],
            order: { created_at: 'DESC' },
        });
    }

    // READ ONE
    async findOne(id: string): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['service', 'provider', 'order'],
        });

        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        return booking;
    }

    // UPDATE
    async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        const booking = await this.findOne(id);

        Object.assign(booking, updateBookingDto);

        return this.bookingRepository.save(booking);
    }

    // DELETE (Hard Delete)
    async remove(id: string): Promise<{ message: string }> {
        const booking = await this.findOne(id);

        await this.bookingRepository.remove(booking);

        return { message: 'Booking deleted successfully' };
    }
}
