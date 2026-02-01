import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceComponentDto } from './create-service-component.dto';

export class UpdateServiceComponentDto extends PartialType(CreateServiceComponentDto) { }
