import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ProviderSuburbsService } from './provider-suburbs.service';
import { CreateProviderSuburbDto } from './dto/create-provider-suburb.dto';

@Controller('provider-suburbs')
export class ProviderSuburbsController {
    constructor(private readonly service: ProviderSuburbsService) { }

    @Post()
    create(@Body() dto: CreateProviderSuburbDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get()
    findOne(@Query('provider_id') providerId: string) {
        return this.service.findByProvider(providerId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
