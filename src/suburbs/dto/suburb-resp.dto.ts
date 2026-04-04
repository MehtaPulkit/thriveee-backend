// suburbs/dto/suburb-response.dto.ts
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SuburbResponseDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() lga_name?: string;
  @Expose() area_ha?: number;
}
