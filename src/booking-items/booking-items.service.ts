import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingItem } from './booking-item.entity';
import { CreateBookingItemDto } from './dto/create-booking.dto';
import { UpdateBookingItemDto } from './dto/update-booking.dto';

@Injectable()
export class BookingItemsService {
  constructor(
    @InjectRepository(BookingItem)
    private readonly repo: Repository<BookingItem>,
  ) {}

  async create(dto: CreateBookingItemDto): Promise<BookingItem> {
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  async findAll(): Promise<BookingItem[]> {
    return this.repo.find({
      relations: ['booking', 'component'],
    });
  }

  async findOne(id: string): Promise<BookingItem> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['booking', 'component'],
    });

    if (!item) throw new NotFoundException('Booking item not found');

    return item;
  }

  async update(id: string, dto: UpdateBookingItemDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: 'Booking item deleted' };
  }
}
