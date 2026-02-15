import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingItemDto } from './create-booking.dto';

export class UpdateBookingItemDto extends PartialType(CreateBookingItemDto) { }
