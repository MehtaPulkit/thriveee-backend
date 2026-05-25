import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceMultiplierDto } from './create-service-multiplier.dto';

export class UpdateServiceMultiplierDto extends PartialType(
  CreateServiceMultiplierDto,
) {}
