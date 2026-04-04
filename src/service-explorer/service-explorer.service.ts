import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ProviderSuburb } from '../provider-suburbs/provider-suburb.entity';
import { ProviderService } from '../provider-services/provider-service.entity';
import { Service } from '../services/services.entity';
import { Suburb } from '../suburbs/suburb.entity';

@Injectable()
export class ServiceExplorerService {
  constructor(
    @InjectRepository(ProviderSuburb)
    private readonly providerSuburbRepo: Repository<ProviderSuburb>,
    @InjectRepository(ProviderService)
    private readonly providerServiceRepo: Repository<ProviderService>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @InjectRepository(Suburb)
    private readonly suburbRepo: Repository<Suburb>,
  ) {}

  async getServicesBySuburb(suburbId: string) {
    // Step 1: Get all providers serving this suburb
    const providerSuburbs = await this.providerSuburbRepo.find({
      where: { suburb_id: suburbId },
    });
    const providerIds = providerSuburbs.map((ps) => ps.provider_id);

    if (!providerIds.length) return { categories: [] };

    // Step 2: Get all services linked to those providers
    const providerServices = await this.providerServiceRepo.find({
      where: { provider_id: In(providerIds) },
    });
    const serviceIds = [...new Set(providerServices.map((s) => s.service_id))];

    if (!serviceIds.length) return { categories: [] };

    // Step 3: Get services, including their categories & subcategories
    const services = await this.serviceRepo.find({
      where: { id: In(serviceIds), is_active: true },
      relations: ['category', 'subcategory'],
    });

    // Step 4: Structure the data hierarchically
    const categoryMap = new Map<string, any>();

    for (const svc of services) {
      if (!svc.category) continue;

      if (!categoryMap.has(svc.category.id)) {
        categoryMap.set(svc.category.id, {
          id: svc.category.id,
          name: svc.category.name,
          subcategories: new Map<string, any>(),
        });
      }

      const cat = categoryMap.get(svc.category.id);

      if (svc.subcategory) {
        if (!cat.subcategories.has(svc.subcategory.id)) {
          cat.subcategories.set(svc.subcategory.id, {
            id: svc.subcategory.id,
            name: svc.subcategory.name,
            services: [],
          });
        }

        cat.subcategories.get(svc.subcategory.id).services.push({
          id: svc.id,
          name: svc.name,
          description: svc.description,
          base_price: svc.base_price,
        });
      } else {
        // Services without subcategory
        if (!cat.subcategories.has('none')) {
          cat.subcategories.set('none', {
            id: null,
            name: 'General',
            services: [],
          });
        }

        cat.subcategories.get('none').services.push({
          id: svc.id,
          name: svc.name,
          description: svc.description,
          base_price: svc.base_price,
        });
      }
    }

    // Step 5: Format the result
    const categories = Array.from(categoryMap.values()).map((cat) => ({
      id: cat.id,
      name: cat.name,
      subcategories: Array.from(cat.subcategories.values()),
    }));

    return { categories };
  }

  async getServicesBySuburbName(suburbName: string) {
    // Step 0: Find suburb by name
    const suburb = await this.suburbRepo.findOne({
      where: { name: suburbName },
    });
    // Step 1: Get all providers serving this suburb
    const providerSuburbs = await this.providerSuburbRepo.find({
      where: { suburb_id: suburb?.id },
    });
    const providerIds = providerSuburbs.map((ps) => ps.provider_id);

    if (!providerIds.length) return { categories: [] };

    // Step 2: Get all services linked to those providers
    const providerServices = await this.providerServiceRepo.find({
      where: { provider_id: In(providerIds) },
    });
    const serviceIds = [...new Set(providerServices.map((s) => s.service_id))];

    if (!serviceIds.length) return { categories: [] };

    // Step 3: Get services, including their categories & subcategories
    const services = await this.serviceRepo.find({
      where: { id: In(serviceIds), is_active: true },
      relations: ['category', 'subcategory'],
    });

    // Step 4: Structure the data hierarchically
    const categoryMap = new Map<string, any>();

    for (const svc of services) {
      if (!svc.category) continue;

      if (!categoryMap.has(svc.category.id)) {
        categoryMap.set(svc.category.id, {
          id: svc.category.id,
          name: svc.category.name,
          subcategories: new Map<string, any>(),
        });
      }

      const cat = categoryMap.get(svc.category.id);

      if (svc.subcategory) {
        if (!cat.subcategories.has(svc.subcategory.id)) {
          cat.subcategories.set(svc.subcategory.id, {
            id: svc.subcategory.id,
            name: svc.subcategory.name,
            services: [],
          });
        }

        cat.subcategories.get(svc.subcategory.id).services.push({
          id: svc.id,
          name: svc.name,
          description: svc.description,
          base_price: svc.base_price,
        });
      } else {
        // Services without subcategory
        if (!cat.subcategories.has('none')) {
          cat.subcategories.set('none', {
            id: null,
            name: 'General',
            services: [],
          });
        }

        cat.subcategories.get('none').services.push({
          id: svc.id,
          name: svc.name,
          description: svc.description,
          base_price: svc.base_price,
        });
      }
    }

    // Step 5: Format the result
    const categories = Array.from(categoryMap.values()).map((cat) => ({
      id: cat.id,
      name: cat.name,
      subcategories: Array.from(cat.subcategories.values()),
    }));

    return { categories };
  }
}
