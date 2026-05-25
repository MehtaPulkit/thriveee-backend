import {
  IsUUID,
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class CreateOrderDto {
  @IsUUID()
  customer_id: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  // Stripe Payment Intent ID for processing payments
  @IsOptional()
  @IsString()
  stripe_payment_intent_id?: string;
}
