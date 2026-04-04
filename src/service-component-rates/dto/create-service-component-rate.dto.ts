import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceComponentRateDto {
  @IsUUID()
  component_id: string;

  @IsOptional()
  @IsNumber()
  per_unit_price?: number;

  @IsOptional()
  @IsNumber()
  flat_price?: number;
}
