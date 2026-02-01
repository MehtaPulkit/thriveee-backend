import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceMultiplierDto } from './create-service-mutliplier.dto';

export class UpdateServiceMultiplierDto extends PartialType(CreateServiceMultiplierDto) { }
