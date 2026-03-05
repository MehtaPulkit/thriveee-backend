import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from '../customer-addresses/customer-address.entity';
import { Customer } from '../customers/customer.entity';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(CustomerAddress)
        private readonly addressRepository: Repository<CustomerAddress>,
    ) { }

    // ===============================
    // CREATE
    // ===============================
    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const { customer_id, address_id } = createBookingDto;

        // ✅ Validate customer
        let customer: Customer | null = null;
        if (customer_id) {
            customer = await this.customerRepository.findOne({
                where: { id: customer_id },
            });

            if (!customer) {
                throw new NotFoundException(
                    `Customer with id ${customer_id} not found`,
                );
            }
        }

        // ✅ Validate address
        if (address_id) {
            const address = await this.addressRepository.findOne({
                where: { id: address_id },
            });

            if (!address) {
                throw new NotFoundException(
                    `Address with id ${address_id} not found`,
                );
            }

            // ✅ Ensure address belongs to customer
            if (customer_id && address.customer_id !== customer_id) {
                throw new BadRequestException(
                    'Selected address does not belong to the selected customer',
                );
            }
        }

        const booking = this.bookingRepository.create(createBookingDto);
        return this.bookingRepository.save(booking);
    }

    // ===============================
    // READ ALL
    // ===============================
    async findAll(): Promise<Booking[]> {
        return this.bookingRepository.find({
            relations: [
                'service',
                'provider',
                'order',
                'customer',
                'address',
            ],
            order: { created_at: 'DESC' },
        });
    }

    // ===============================
    // READ ONE
    // ===============================
    async findOne(id: string): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: [
                'service',
                'provider',
                'order',
                'customer',
                'address',
            ],
        });

        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        return booking;
    }

    // ===============================
    // UPDATE
    // ===============================
    async update(
        id: string,
        updateBookingDto: UpdateBookingDto,
    ): Promise<Booking> {
        const booking = await this.findOne(id);

        // ✅ Validate status transition
        if (updateBookingDto.status) {
            this.validateStatusTransition(
                booking.status,
                updateBookingDto.status,
            );
        }

        // ✅ Validate customer change (if provided)
        if (updateBookingDto.customer_id) {
            const customer = await this.customerRepository.findOne({
                where: { id: updateBookingDto.customer_id },
            });

            if (!customer) {
                throw new NotFoundException(
                    `Customer with id ${updateBookingDto.customer_id} not found`,
                );
            }
        }

        // ✅ Validate address change (if provided)
        if (updateBookingDto.address_id) {
            const address = await this.addressRepository.findOne({
                where: { id: updateBookingDto.address_id },
            });

            if (!address) {
                throw new NotFoundException(
                    `Address with id ${updateBookingDto.address_id} not found`,
                );
            }

            const effectiveCustomerId =
                updateBookingDto.customer_id || booking.customer_id;

            if (
                effectiveCustomerId &&
                address.customer_id !== effectiveCustomerId
            ) {
                throw new BadRequestException(
                    'Selected address does not belong to the selected customer',
                );
            }
        }

        Object.assign(booking, updateBookingDto);

        return this.bookingRepository.save(booking);
    }

    // ===============================
    // DELETE
    // ===============================
    async remove(id: string): Promise<{ message: string }> {
        const booking = await this.findOne(id);

        await this.bookingRepository.remove(booking);

        return { message: 'Booking deleted successfully' };
    }
    async findByReference(ref: string) {
        let booking;

        // Check if the input is a number (BKN-10005 -> 10005)
        const numericId = parseInt(ref.replace(/\D/g, ''));

        if (!isNaN(numericId)) {
            booking = await this.bookingRepository.findOne({ where: { booking_number: numericId } });
        } else {
            booking = await this.bookingRepository.findOne({ where: { id: ref } });
        }

        if (!booking) throw new NotFoundException('Booking not found');
        return booking;
    }
    // ===============================
    // STATUS TRANSITIONS TODO: handle the correct flow of status changes and prevent invalid transitions
    // ===============================
    private validTransitions = {
        draft: ['assigned'],
        pending_confirmation: ['confirmed', 'cancelled'],
        confirmed: ['in_progress', 'cancelled'],
        in_progress: ['completed'],
        completed: [],
        cancelled: [],
    };

    private validateStatusTransition(
        current: string,
        next: string,
    ) {
        if (!this.validTransitions[current]?.includes(next)) {
            throw new BadRequestException(
                `Invalid booking status transition from ${current} to ${next}`,
            );
        }
    }
}
