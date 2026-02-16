import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceComponent } from '../service-components/service-component.entity';
import { ServiceMultiplier } from '../service-multipliers/service-multiplier.entity';
import { Service } from '../services/services.entity';
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

    async calculatePrice(
        serviceId: string,
        items: { componentId: string; quantity: number }[],
        appliedMultiplierIds: string[] = [],
    ) {
        const config = await this.getPricingConfig(serviceId);

        let subtotal = 0;
        const breakdown: Array<{
            type: string;
            componentId?: string;
            multiplierId?: string;
            name: string;
            unitPrice?: number;
            quantity?: number;
            total?: number;
            value?: number;
        }> = [];

        // 🔹 1️⃣ Calculate component subtotal
        for (const item of items) {
            const component = config.components.find(
                (c) => c.id === item.componentId,
            );

            if (!component) {
                throw new Error(`Invalid component: ${item.componentId}`);
            }

            const lineTotal = component.rate * item.quantity;

            subtotal += lineTotal;

            breakdown.push({
                type: 'component',
                componentId: component.id,
                name: component.name,
                unitPrice: component.rate,
                quantity: item.quantity,
                total: lineTotal,
            });
        }

        // 🔹 2️⃣ Apply multipliers
        let multiplierTotal = 0;

        const multipliersToApply = config.multipliers.filter((m) =>
            appliedMultiplierIds.includes(m.id),
        );

        for (const multiplier of multipliersToApply) {
            let value = 0;

            if (multiplier.type === 'percentage') {
                value = (subtotal * multiplier.value) / 100;
            } else if (multiplier.type === 'fixed') {
                value = multiplier.value;
            }

            multiplierTotal += value;

            breakdown.push({
                type: 'multiplier',
                multiplierId: multiplier.id,
                name: multiplier.name,
                value,
            });
        }

        const total = subtotal + multiplierTotal;

        return {
            subtotal,
            multiplierTotal,
            total,
            breakdown,
        };
    }

}

