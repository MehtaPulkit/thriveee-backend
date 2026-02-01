import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateServiceComponentRateDto } from './dto/create-service-component-rate.dto';
import { UpdateServiceComponentRateDto } from './dto/update-service-component-rate.dto';
import { ServiceComponentRatesService } from './service-component-rates.service';

@Controller('service-component-rates')
export class ServiceComponentRatesController {
    constructor(private readonly scrService: ServiceComponentRatesService) { }
    @Post()
    createRate(@Body() dto: CreateServiceComponentRateDto) {
        return this.scrService.createRate(dto);
    }

    @Get()
    findAllRates() {
        return this.scrService.findAllRates();
    }

    @Get(':id')
    findOneComponent(@Param('id') id: string) {
        return this.scrService.findOneRate(id);
    }

    @Patch(':id')
    updateRate(@Param('id') id: string, @Body() dto: UpdateServiceComponentRateDto) {
        return this.scrService.updateRate(id, dto);
    }

    @Delete(':id')
    deleteRate(@Param('id') id: string) {
        return this.scrService.deleteRate(id);
    }
}
