// src/providers/providers.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Controller('providers')
export class ProvidersController {
    constructor(private readonly providersService: ProvidersService) { }

    @Post()
    create(@Body() dto: CreateProviderDto) {
        return this.providersService.create(dto);
    }

    @Get()
    findAll() {
        return this.providersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.providersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.providersService.remove(id);
    }
}
