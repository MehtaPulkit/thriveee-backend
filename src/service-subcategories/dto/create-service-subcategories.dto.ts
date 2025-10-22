import { IsString, IsOptional, IsUUID, IsBoolean, IsInt } from 'class-validator';

export class CreateServiceSubcategoryDto {
    @IsUUID()
    category_id: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    icon_url?: string;

    @IsOptional()
    @IsInt()
    display_order?: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}
