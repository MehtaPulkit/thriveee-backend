// update-provider-suburb.dto.ts
import { IsArray, ArrayNotEmpty, ArrayUnique, IsUUID } from 'class-validator';

export class UpdateProviderSuburbDto {
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsUUID('all', { each: true })
    suburb_ids: string[];
}