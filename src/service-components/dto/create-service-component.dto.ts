import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceComponentDto {
    @IsUUID()
    service_id: string;

    @IsString()
    key: string;

    @IsString()
    label: string;

    @IsEnum(['count', 'boolean'])
    type: 'count' | 'boolean';

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @IsOptional()
    @IsString()
    section?: string;

    @IsBoolean()
    is_flat_rate?: boolean;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    code: string;
}
