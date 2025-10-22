// src/providers/dto/create-provider.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsNumber, IsUUID } from 'class-validator';

export class CreateProviderDto {
    // Profile info
    @IsString() @IsNotEmpty() first_name: string;
    @IsString() @IsNotEmpty() last_name: string;
    @IsEmail() email: string;
    @IsString() @IsNotEmpty() phone_number: string;
    @IsString() @IsOptional() address?: string;

    // Provider-specific
    @IsString() @IsNotEmpty() business_name: string;
    @IsString() @IsOptional() abn?: string;
    @IsString() @IsOptional() bio?: string;
    @IsNumber() @IsOptional() service_radius_km?: number;
}
