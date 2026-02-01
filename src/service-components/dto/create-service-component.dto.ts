import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateServiceComponentDto {
    @IsUUID()
    service_id: string;

    @IsString()
    key: string;

    @IsString()
    label: string;

    @IsEnum(['count', 'boolean'])
    type: 'count' | 'boolean';

    @IsOptional()
    is_active?: boolean;
}
