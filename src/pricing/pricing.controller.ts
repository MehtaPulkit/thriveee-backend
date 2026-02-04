import { Controller, Get, Param } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Controller("pricing")
export class PricingController {
    constructor(private readonly pricingService: PricingService) { }

    @Get("services/:serviceId/config")
    getPricingConfig(@Param("serviceId") serviceId: string) {
        return this.pricingService.getPricingConfig(serviceId);
    }
}
