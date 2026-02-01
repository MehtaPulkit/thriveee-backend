import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query,
} from '@nestjs/common';

import { ServiceMultipliersService } from './service-multipliers.service';
import { CreateServiceMultiplierDto } from './dto/create-service-mutliplier.dto';
import { UpdateServiceMultiplierDto } from './dto/update-service-multiplier.dto';


@Controller('service-multipliers')
export class ServiceMultipliersController {
    constructor(private readonly service: ServiceMultipliersService) { }

    @Post()
    create(@Body() dto: CreateServiceMultiplierDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll(@Query('service_id') serviceId?: string) {
        return this.service.findAll(serviceId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateServiceMultiplierDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
