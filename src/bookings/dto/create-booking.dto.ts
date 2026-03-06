import {
    IsDateString,
    IsEnum,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';
import { BookingStatus } from '../booking-status.enum';

// Define the enums to match your database constraints
export enum CleaningType {
    STANDARD = 'standard_cleaning',
    DEEP = 'deep_cleaning',
    END_OF_LEASE = 'end_of_lease_cleaning',
    SPRING = 'spring_cleaning',
}

export enum PropertyType {
    HOUSE = 'house',
    APARTMENT = 'apartment',
    TOWNHOUSE = 'townhouse',
    GRANNY_FLAT = 'granny-flat',
}

export enum PropertyCondition {
    LIGHT = 'light',
    MEDIUM = 'medium',
    HEAVY = 'heavy',
}

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

    @IsOptional()
    @IsEnum(CleaningType)
    cleaning_type?: CleaningType;

    @IsOptional()
    @IsEnum(PropertyType)
    property_type?: PropertyType;

    @IsOptional()
    @IsNumber()
    @Min(1)
    storeys?: number;

    @IsOptional()
    @IsEnum(PropertyCondition)
    property_condition?: PropertyCondition;
}