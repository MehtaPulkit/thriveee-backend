import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async create(dto: CreateProviderServiceDto) {
    const records = dto.service_ids.map((service_id) =>
      this.providerServicesRepo.create({
        provider_id: dto.provider_id,
        service_id,
      }),
    );
    return this.providerServicesRepo.save(records);
  }

  async findAll() {
    return this.providerServicesRepo.find({
      relations: ['provider', 'service'],
      order: { created_at: 'DESC' },
    });
  }

  async findByProvider(provider_id: string) {
    return this.providerServicesRepo.find({
      where: { provider_id },
      relations: ['provider', 'service'],
    });
  }

  async update(dto: UpdateProviderServiceDto) {
    if (!dto.provider_id)
      throw new NotFoundException('Provider ID is required');

    // Step 1: Remove all existing mappings for this provider
    await this.providerServicesRepo.delete({ provider_id: dto.provider_id });

    // Step 2: Recreate new ones
    const newRecords = dto.service_ids?.map((service_id) =>
      this.providerServicesRepo.create({
        provider_id: dto.provider_id,
        service_id,
      }),
    );
    if (!newRecords || newRecords.length === 0) {
      return [];
    }
    return this.providerServicesRepo.save(newRecords);
  }

  async remove(provider_id: string) {
    await this.providerServicesRepo.delete({ provider_id });
    return { message: 'Deleted successfully' };
  }
}
