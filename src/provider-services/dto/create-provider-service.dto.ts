import { IsUUID, IsOptional, IsBoolean, IsNumber, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateProviderServiceDto {
    @IsUUID()
    provider_id: string;

    @IsOptional()
    @IsNumber()
    price_override?: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsUUID('all', { each: true })
    service_ids: string[];
}
