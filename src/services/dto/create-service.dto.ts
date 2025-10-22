import { IsString, IsOptional, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    base_price?: number;

    @IsOptional()
    @IsString()
    pricing_strategy?: string;

    @IsOptional()
    @IsBoolean()
    is_inspection_required?: boolean;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsUUID()
    category_id?: string;

    @IsOptional()
    @IsUUID()
    subcategory_id?: string;
}
