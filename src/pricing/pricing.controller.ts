import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CalculatePriceDto } from './dto/calculate-price.dto';
import { PricingService } from './pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private pricingService: PricingService) {}

  @Get('services/:serviceId/config')
  getPricingConfig(@Param('serviceId') serviceId: string) {
    return this.pricingService.getPricingConfig(serviceId);
  }

  @Post('calculate')
  async calculate(@Body() dto: CalculatePriceDto) {
    return this.pricingService.calculatePrice(
      dto.serviceId,
      dto.items,
      dto.appliedMultipliers,
    );
  }
}
