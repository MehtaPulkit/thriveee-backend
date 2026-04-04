import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceComponent } from '../service-components/service-component.entity';
import { ServiceMultiplier } from '../service-multipliers/service-multiplier.entity';
import { Service } from '../services/services.entity';
import { PricingEngine } from './pricing.engine';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,

    @InjectRepository(ServiceComponent)
    private componentRepo: Repository<ServiceComponent>,

    @InjectRepository(ServiceMultiplier)
    private multiplierRepo: Repository<ServiceMultiplier>,
  ) {}

  async getPricingConfig(serviceId: string) {
    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });

    const components = await this.componentRepo.find({
      where: { service: { id: serviceId }, is_active: true },
      relations: ['rates'],
      order: {
        rates: { created_at: 'DESC' },
      },
    });

    const multipliers = await this.multiplierRepo.find({
      where: { service: { id: serviceId }, is_active: true },
    });

    return {
      serviceId,
      version: service?.pricing_version ?? 'v1',
      components: components
        .filter((c) => c.is_active)
        .map((c) => ({
          id: c.id,
          code: c.code,
          label: c.label,
          name: c.name,
          type: c.type,
          section: c.section,
          displayOrder: c.display_order,
          perUnit: c.rates?.[0]?.per_unit_price ?? 0,
          flat: c.rates?.[0]?.flat_price ?? 0,
          isFlatRate: c.is_flat_rate,
        })),
      multipliers: multipliers
        .filter((m) => m.is_active)
        .map((m) => ({
          id: m.id,
          code: m.code,
          name: m.name,
          type: m.type,
          applies_to: m.applies_to,
          value: m.value,
          description: m.description,
        })),
    };
  }

  // async calculatePrice(
  //     serviceId: string,
  //     items: { componentId: string; quantity: number }[],
  //     appliedMultiplierIds: string[] = [],
  // ) {
  //     const config = await this.getPricingConfig(serviceId);

  //     let subtotal = 0;
  //     const breakdown: Array<{
  //         type: string;
  //         componentId?: string;
  //         multiplierId?: string;
  //         name: string;
  //         price?: number;
  //         quantity?: number;
  //         total?: number;
  //         value?: number;
  //     }> = [];

  //     // 🔹 1️⃣ Calculate component subtotal
  //     for (const item of items) {
  //         const component = Object.values(config.components).find(
  //             (c: any) => c.id === item.componentId,
  //         );
  //         if (!component) {
  //             throw new Error(`Invalid component: ${item.componentId}`);
  //         }
  //         const lineTotal = component.isFlatRate ? component.flat : component.perUnit * item.quantity;
  //         subtotal += lineTotal;

  //         breakdown.push({
  //             type: 'component',
  //             componentId: component.id,
  //             name: component.name,
  //             price: component.perUnit,
  //             quantity: item.quantity,
  //             total: lineTotal,
  //         });
  //     }

  //     // 🔹 2️⃣ Apply multipliers
  //     let multiplierTotal = 0;

  //     const multipliersToApply = Object.values(config.multipliers).filter((m) =>
  //         appliedMultiplierIds.includes(m.id),
  //     );

  //     for (const multiplier of multipliersToApply) {
  //         let value = 0;

  //         if (multiplier.type === 'percentage') {
  //             value = (subtotal * multiplier.value) / 100;
  //         } else if (multiplier.type === 'fixed') {
  //             value = multiplier.value;
  //         }

  //         multiplierTotal += value;

  //         breakdown.push({
  //             type: 'multiplier',
  //             multiplierId: multiplier.id,
  //             name: multiplier.name,
  //             value,
  //         });
  //     }

  //     const total = subtotal + multiplierTotal;

  //     return {
  //         subtotal,
  //         multiplierTotal,
  //         total,
  //         breakdown,
  //     };
  // }

  async calculatePrice(serviceId: string, items, appliedMultipliers) {
    const components = await this.componentRepo.find({
      where: { service: { id: serviceId }, is_active: true },
      relations: ['rates'],
    });

    const multipliers = await this.multiplierRepo.find({
      where: { service: { id: serviceId }, is_active: true },
    });

    const mappedComponents = components.map((c) => {
      const rate = c.rates?.[0];

      return {
        id: c.id,
        code: c.code,
        label: c.label,
        isFlatRate: c.is_flat_rate,
        perUnit: rate?.per_unit_price ?? 0,
        flat: rate?.flat_price ?? 0,
      };
    });

    const engine = new PricingEngine();

    return engine.calculate(
      mappedComponents,
      multipliers,
      items,
      appliedMultipliers,
    );
  }
}
