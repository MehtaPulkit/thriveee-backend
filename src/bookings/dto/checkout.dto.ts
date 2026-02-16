// dto/checkout.dto.ts

import {
    IsUUID,
    IsArray,
    IsOptional,
    IsString,
    IsDateString,
    ValidateNested,
    IsNumber,
    Min,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';


// =============================
// 1️⃣ Booking Item DTO
// =============================
export class CheckoutItemDto {
    @IsUUID()
    @IsNotEmpty()
    componentId: string;

    @IsNumber()
    @Min(1)
    quantity: number;
}


// =============================
// 2️⃣ Single Booking DTO
// =============================
export class CheckoutBookingDto {

    @IsUUID()
    @IsNotEmpty()
    serviceId: string;

    @IsUUID()
    @IsOptional()
    providerId?: string;

    @IsUUID()
    @IsOptional()
    addressId?: string;

    @IsDateString()
    scheduledDate: string;

    @IsString()
    @IsOptional()
    timeSlot?: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutItemDto)
    items: CheckoutItemDto[];

    // Optional multipliers like weekend, urgency, etc.
    @IsArray()
    @IsOptional()
    multiplierIds?: string[];
}


// =============================
// 3️⃣ Root Checkout DTO
// =============================
export class CheckoutDto {

    @IsUUID()
    @IsNotEmpty()
    customerId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CheckoutBookingDto)
    bookings: CheckoutBookingDto[];

    // Future-proofing 👇

    @IsString()
    @IsOptional()
    promoCode?: string;

    @IsString()
    @IsOptional()
    currency?: string; // default AUD

}
