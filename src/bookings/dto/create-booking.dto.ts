import {
    IsUUID,
    IsOptional,
    IsEnum,
    IsDateString,
    IsNumber,
    IsString,
    IsObject,
} from 'class-validator';
import { BookingStatus } from '../booking-status.enum';

export class CreateBookingDto {
    @IsOptional()
    @IsUUID()
    customer_id?: string;

    @IsOptional()
    @IsUUID()
    service_id?: string;

    @IsOptional()
    @IsUUID()
    provider_id?: string;

    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @IsOptional()
    @IsUUID()
    address_id?: string;

    @IsOptional()
    @IsNumber()
    total_amount?: number;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsUUID()
    order_id?: string;

    @IsOptional()
    @IsDateString()
    scheduled_date?: string;

    @IsOptional()
    @IsString()
    time_slot?: string;

    @IsOptional()
    @IsObject()
    price_breakdown?: Record<string, any>;

    @IsOptional()
    @IsNumber()
    final_price?: number;
}
