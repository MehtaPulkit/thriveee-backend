import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderSuburb } from './provider-suburb.entity';
import { CreateProviderSuburbDto } from './dto/create-provider-suburb.dto';
import { UpdateProviderSuburbDto } from './dto/update-provider-suburb.dto';

@Injectable()
export class ProviderSuburbsService {
  constructor(
    @InjectRepository(ProviderSuburb)
    private providerSuburbsRepo: Repository<ProviderSuburb>,
  ) {}

  async findAll(): Promise<ProviderSuburb[]> {
    return this.providerSuburbsRepo.find({ relations: ['provider', 'suburb'] });
  }

  async findByProvider(provider_id: string) {
    return this.providerSuburbsRepo.find({
      where: { provider_id },
      relations: ['provider', 'suburb'],
    });
  }

  async create(dto: CreateProviderSuburbDto) {
    const records = dto.suburb_ids.map((suburb_id) =>
      this.providerSuburbsRepo.create({
        provider_id: dto.provider_id,
        suburb_id,
      }),
    );
    return this.providerSuburbsRepo.save(records);
  }

  async update(provider_id: string, dto: UpdateProviderSuburbDto) {
    // Delete existing records
    await this.providerSuburbsRepo.delete({ provider_id });

    // Insert new suburbs
    const records = dto.suburb_ids?.map((suburb_id) =>
      this.providerSuburbsRepo.create({ provider_id, suburb_id }),
    );
    if (!records || records.length === 0) {
      return [];
    }
    return this.providerSuburbsRepo.save(records);
  }

  async remove(provider_id: string) {
    await this.providerSuburbsRepo.delete({ provider_id });
    return { message: 'Deleted successfully' };
  }
}
