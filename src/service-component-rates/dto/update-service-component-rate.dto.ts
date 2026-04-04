import { PartialType } from '@nestjs/swagger';
import { CreateServiceComponentRateDto } from './create-service-component-rate.dto';

export class UpdateServiceComponentRateDto extends PartialType(
  CreateServiceComponentRateDto,
) {}
