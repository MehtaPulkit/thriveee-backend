import { IsArray, IsNumber, IsUUID } from 'class-validator';

export class PricingItemDto {
  @IsUUID()
  componentId: string;

  @IsNumber()
  quantity: number;
}

export class CalculatePriceDto {
  @IsUUID()
  serviceId: string;

  @IsArray()
  items: PricingItemDto[];

  @IsArray()
  appliedMultipliers: string[];
}
