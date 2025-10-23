// create-provider-suburb.dto.ts
import { IsUUID, IsArray, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CreateProviderSuburbDto {
    @IsUUID()
    provider_id: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsUUID('all', { each: true })
    suburb_ids: string[];
}