import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceComponentDto } from './dto/create-service-component.dto';
import { UpdateServiceComponentDto } from './dto/update-service-component.dto';
import { ServiceComponent } from './service-component.entity';
import { Service } from '../services/services.entity';

@Injectable()
export class ServiceComponentsService {
    constructor(
        @InjectRepository(ServiceComponent)
        private componentsRepo: Repository<ServiceComponent>,

        @InjectRepository(Service)
        private servicesRepo: Repository<Service>,
    ) { }

    // ----------------------------------------------------------
    // COMPONENT CRUD
    // ----------------------------------------------------------
    async createComponent(dto: CreateServiceComponentDto) {
        const service = await this.servicesRepo.findOne({
            where: { id: dto.service_id },
        });

        if (!service) throw new NotFoundException('Service not found');

        const component = this.componentsRepo.create(dto);

        return this.componentsRepo.save(component);
    }

    findAllComponents() {
        return this.componentsRepo.find({
            where: { is_active: true },
            relations: ['rates', 'service'],
        });
    }

    async findOneComponent(id: string) {
        const comp = await this.componentsRepo.findOne({
            where: { id },
            relations: ['rates', 'service'],
        });

        if (!comp) throw new NotFoundException('Component not found');
        return comp;
    }

    async updateComponent(id: string, dto: UpdateServiceComponentDto) {
        const comp = await this.componentsRepo.findOne({ where: { id } });
        if (!comp) throw new NotFoundException('Component not found');

        Object.assign(comp, dto);
        return this.componentsRepo.save(comp);
    }

    async removeComponent(id: string) {
        const comp = await this.componentsRepo.findOne({ where: { id } });
        if (!comp) throw new NotFoundException('Component not found');

        comp.is_active = false;
        return this.componentsRepo.save(comp);
    }

}
