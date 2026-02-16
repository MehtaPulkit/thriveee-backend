import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceMultiplier } from './service-multiplier.entity';
import { Service } from '../services/services.entity';
import { CreateServiceMultiplierDto } from './dto/create-service-mutliplier.dto';
import { UpdateServiceMultiplierDto } from './dto/update-service-multiplier.dto';

@Injectable()
export class ServiceMultipliersService {
    constructor(
        @InjectRepository(ServiceMultiplier)
        private readonly repo: Repository<ServiceMultiplier>,

        @InjectRepository(Service)
        private readonly servicesRepo: Repository<Service>,
    ) { }

    async create(dto: CreateServiceMultiplierDto) {
        const service = await this.servicesRepo.findOne({
            where: { id: dto.service_id },
        });

        if (!service) throw new NotFoundException('Service not found');

        const multiplier = this.repo.create({
            ...dto,
            service,
        });

        return this.repo.save(multiplier);
    }

    async findAll(serviceId?: string) {
        return this.repo.find({
            where: serviceId ? { service: { id: serviceId } } : {},
            relations: ['service'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: string) {
        const multiplier = await this.repo.findOne({
            where: { id },
            relations: ['service'],
        });

        if (!multiplier) throw new NotFoundException('Multiplier not found');

        return multiplier;
    }

    async update(id: string, dto: UpdateServiceMultiplierDto) {
        const multiplier = await this.repo.findOne({ where: { id } });

        if (!multiplier) throw new NotFoundException('Multiplier not found');

        if (dto.service_id) {
            const service = await this.servicesRepo.findOne({
                where: { id: dto.service_id },
            });
            if (!service) throw new NotFoundException('Service not found');
            multiplier.service = service;
        }

        Object.assign(multiplier, dto);

        return this.repo.save(multiplier);
    }

    async remove(id: string) {
        const result = await this.repo.delete(id);
        if (result.affected === 0)
            throw new NotFoundException('Multiplier not found');

        return { success: true };
    }
}
