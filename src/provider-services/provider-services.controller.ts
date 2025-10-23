import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { ProviderServicesService } from './provider-services.service';
import { CreateProviderServiceDto } from './dto/create-provider-service.dto';
import { UpdateProviderServiceDto } from './dto/update-provider-service.dto';

@Controller('provider-services')
export class ProviderServicesController {
    constructor(private readonly providerServicesService: ProviderServicesService) { }

    @Post()
    create(@Body() dto: CreateProviderServiceDto) {
        return this.providerServicesService.create(dto);
    }

    @Get()
    findAll() {
        return this.providerServicesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.providerServicesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProviderServiceDto) {
        return this.providerServicesService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.providerServicesService.remove(id);
    }
}
