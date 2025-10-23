import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderServiceDto } from './dto/create-provider-service.dto';
import { UpdateProviderServiceDto } from './dto/update-provider-service.dto';
import { ProviderService } from './provider-service.entity';

@Injectable()
export class ProviderServicesService {
    constructor(
        @InjectRepository(ProviderService)
        private readonly providerServicesRepo: Repository<ProviderService>,
    ) { }

    async create(dto: CreateProviderServiceDto) {
        const records = dto.service_ids.map((service_id) =>
            this.providerServicesRepo.create({ provider_id: dto.provider_id, service_id }),
        );
        return this.providerServicesRepo.save(records);
    }

    async findAll() {
        return this.providerServicesRepo.find({
            relations: ['provider', 'service'],
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: string) {
        return this.providerServicesRepo.findOne({
            where: { id },
            relations: ['provider', 'service'],
        });
    }

    async update(id: string, dto: UpdateProviderServiceDto) {
        const providerService = await this.findOne(id);
        if (!providerService) throw new Error('Provider service not found');
        Object.assign(providerService, dto);
        return this.providerServicesRepo.save(providerService);
    }

    async remove(id: string) {
        const providerService = await this.findOne(id);
        if (!providerService) throw new Error('Provider service not found');
        await this.providerServicesRepo.remove(providerService);
        return { message: 'Deleted successfully' };
    }
}
