import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceSubcategoryDto } from './create-service-subcategories.dto';

export class UpdateServiceSubcategoryDto extends PartialType(CreateServiceSubcategoryDto) { }
