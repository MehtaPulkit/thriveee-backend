import { PartialType } from '@nestjs/mapped-types';
import { CreateProviderSuburbDto } from './create-provider-suburb.dto';

export class UpdateProviderSuburbDto extends PartialType(CreateProviderSuburbDto) { }
