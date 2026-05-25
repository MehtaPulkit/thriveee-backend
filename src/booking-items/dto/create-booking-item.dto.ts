import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreateBookingItemDto {
  @IsUUID()
  booking_id: string;

  @IsUUID()
  component_id: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  total: number;
}
