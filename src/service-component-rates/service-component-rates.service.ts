import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceComponentRate } from './service-component-rate.entity';
import { Repository } from 'typeorm';
import { CreateServiceComponentRateDto } from './dto/create-service-component-rate.dto';
import { ServiceComponent } from '../service-components/service-component.entity';
import { UpdateServiceComponentRateDto } from './dto/update-service-component-rate.dto';

@Injectable()
export class ServiceComponentRatesService {
  constructor(
    @InjectRepository(ServiceComponentRate)
    private ratesRepo: Repository<ServiceComponentRate>,
    @InjectRepository(ServiceComponent)
    private componentsRepo: Repository<ServiceComponent>,
  ) {}
  async createRate(dto: CreateServiceComponentRateDto) {
    const component = await this.componentsRepo.findOne({
      where: { id: dto.component_id },
    });

    if (!component) throw new NotFoundException('Component not found');

    const rate = this.ratesRepo.create({
      ...dto,
      component,
    });

    return this.ratesRepo.save(rate);
  }

  findAllRates() {
    return this.ratesRepo.find({
      relations: ['component'],
    });
  }

  async findOneRate(id: string) {
    const comp = await this.ratesRepo.findOne({
      where: { id },
    });

    if (!comp) throw new NotFoundException('Component Rate not found');
    return comp;
  }

  updateRate(id: string, dto: UpdateServiceComponentRateDto) {
    return this.ratesRepo.update(id, dto);
  }

  deleteRate(id: string) {
    return this.ratesRepo.delete(id);
  }
}
