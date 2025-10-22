import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from './service-categories.entity';
import { CreateServiceCategoryDto } from './dto/create-service-categories.dto';

@Injectable()
export class ServiceCategoriesService {
    constructor(
        @InjectRepository(ServiceCategory)
        private repo: Repository<ServiceCategory>,
    ) { }

    findAll() {
        return this.repo.find({ where: { is_active: true }, relations: ['children', 'subcategories'] });
    }

    findOne(id: string) {
        return this.repo.findOne({ where: { id }, relations: ['children', 'subcategories'] });
    }

    async create(dto: CreateServiceCategoryDto) {
        const category = this.repo.create(dto);
        return await this.repo.save(category);
    }

    async update(id: string, dto: Partial<CreateServiceCategoryDto>) {
        const existing = await this.repo.findOne({ where: { id } });
        if (!existing) throw new NotFoundException('Category not found');
        Object.assign(existing, dto);
        return this.repo.save(existing);
    }

    async remove(id: string) {
        const existing = await this.repo.findOne({ where: { id } });
        if (!existing) throw new NotFoundException('Category not found');
        return this.repo.remove(existing);
    }
}
