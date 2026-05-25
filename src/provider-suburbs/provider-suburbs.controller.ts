import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { ProviderSuburbsService } from './provider-suburbs.service';
import { CreateProviderSuburbDto } from './dto/create-provider-suburb.dto';
import { UpdateProviderSuburbDto } from './dto/update-provider-suburb.dto';

@Controller('provider-suburbs')
export class ProviderSuburbsController {
  constructor(private readonly service: ProviderSuburbsService) {}

  @Post()
  create(@Body() dto: CreateProviderSuburbDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('provider/:providerId')
  findByProvider(@Param('providerId') providerId: string) {
    return this.service.findByProvider(providerId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProviderSuburbDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
