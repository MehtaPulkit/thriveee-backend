import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceCategory } from 'src/service-categories/service-categories.entity';
import { ServiceSubcategory } from 'src/service-subcategories/service-subcategories.entity';
import { Service } from './services.entity';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly serviceRepo: Repository<Service>,

        @InjectRepository(ServiceCategory)
        private readonly categoryRepo: Repository<ServiceCategory>,

        @InjectRepository(ServiceSubcategory)
        private readonly subcategoryRepo: Repository<ServiceSubcategory>,
    ) { }

    findAll() {
        return this.serviceRepo.find({
            where: { is_active: true },
            relations: ['category', 'subcategory'],
        });
    }

    findOne(id: string) {
        return this.serviceRepo.findOne({
            where: { id },
            relations: ['category', 'subcategory'],
        });
    }

    async create(dto: CreateServiceDto) {
        const service = this.serviceRepo.create({
            ...dto,
        });

        if (dto.category_id) {
            const category = await this.categoryRepo.findOne({ where: { id: dto.category_id } });
            if (!category) throw new NotFoundException('Category not found');
            service.category = category;
        }

        if (dto.subcategory_id) {
            const subcategory = await this.subcategoryRepo.findOne({ where: { id: dto.subcategory_id } });
            if (!subcategory) throw new NotFoundException('Subcategory not found');
            service.subcategory = subcategory;
        }

        return this.serviceRepo.save(service);
    }

    async update(id: string, dto: UpdateServiceDto) {
        const service = await this.serviceRepo.findOne({ where: { id } });
        if (!service) throw new NotFoundException('Service not found');

        if (dto.category_id) {
            const category = await this.categoryRepo.findOne({ where: { id: dto.category_id } });
            if (!category) throw new NotFoundException('Category not found');
            service.category = category;
        }

        if (dto.subcategory_id) {
            const subcategory = await this.subcategoryRepo.findOne({ where: { id: dto.subcategory_id } });
            if (!subcategory) throw new NotFoundException('Subcategory not found');
            service.subcategory = subcategory;
        }

        Object.assign(service, dto);
        return this.serviceRepo.save(service);
    }

    async remove(id: string) {
        const service = await this.serviceRepo.findOne({ where: { id } });
        if (!service) throw new NotFoundException('Service not found');
        return this.serviceRepo.remove(service);
    }
}
