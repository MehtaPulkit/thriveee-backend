import { IsString, IsOptional, IsBoolean, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCustomerAddressDto {
    @IsUUID()
    customer_id: string;

    @IsOptional()
    @IsString()
    label?: string;

    @IsString()
    @IsNotEmpty()
    address_line_1: string;

    @IsOptional()
    @IsString()
    address_line_2?: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    postcode: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsBoolean()
    is_default?: boolean;

    @IsOptional()
    latitude?: number;

    @IsOptional()
    longitude?: number;
}
