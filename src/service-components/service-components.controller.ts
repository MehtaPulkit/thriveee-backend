import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ServiceComponentsService } from './service-components.service';
import { CreateServiceComponentDto } from './dto/create-service-component.dto';
import { UpdateServiceComponentDto } from './dto/update-service-component.dto';

@Controller('service-components')
export class ServiceComponentsController {
  constructor(private readonly scService: ServiceComponentsService) {}

  // COMPONENTS
  @Post()
  createComponent(@Body() dto: CreateServiceComponentDto) {
    return this.scService.createComponent(dto);
  }

  @Get()
  findAllComponents() {
    return this.scService.findAllComponents();
  }

  @Get(':id')
  findOneComponent(@Param('id') id: string) {
    return this.scService.findOneComponent(id);
  }

  @Patch(':id')
  updateComponent(
    @Param('id') id: string,
    @Body() dto: UpdateServiceComponentDto,
  ) {
    return this.scService.updateComponent(id, dto);
  }

  @Delete(':id')
  removeComponent(@Param('id') id: string) {
    return this.scService.removeComponent(id);
  }
}
