import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateServiceMultiplierDto {
    @IsUUID()
    service_id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsInt()
    value: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
