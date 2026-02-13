import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceComponent } from 'src/service-components/service-component.entity';
import { ServiceMultiplier } from 'src/service-multipliers/service-multiplier.entity';
import { Service } from 'src/services/services.entity';
import { Repository } from 'typeorm';
import { mapComponents, mapMultipliers } from './pricing.mapper';

@Injectable()
export class PricingService {
    constructor(
        @InjectRepository(Service)
        private serviceRepo: Repository<Service>,

        @InjectRepository(ServiceComponent)
        private componentRepo: Repository<ServiceComponent>,

        @InjectRepository(ServiceMultiplier)
        private multiplierRepo: Repository<ServiceMultiplier>,
    ) { }

    async getPricingConfig(serviceId: string) {
        const service = await this.serviceRepo.findOne({
            where: { id: serviceId },
        });

        const components = await this.componentRepo.find({
            where: { service: { id: serviceId }, is_active: true },
            relations: ["rates"],
            order: {
                rates: { created_at: "DESC" }
            }
        });

        const multipliers = await this.multiplierRepo.find({
            where: { service: { id: serviceId }, is_active: true },
        });

        return {
            serviceId,
            version: service?.pricing_version ?? "v1",
            components: mapComponents(components),
            multipliers: mapMultipliers(multipliers),
        };
    }
}

