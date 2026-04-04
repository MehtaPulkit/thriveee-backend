// dto/checkout.dto.ts

import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  CleaningType,
  PropertyCondition,
  PropertyType,
} from './create-booking.dto';

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

  @IsNumber()
  price: number;

  @IsNumber()
  totalPrice: number;
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
