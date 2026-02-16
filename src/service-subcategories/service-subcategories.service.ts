import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceSubcategory } from './service-subcategories.entity';
import { ServiceCategory } from '../service-categories/service-categories.entity';
import { UpdateServiceSubcategoryDto } from './dto/update-service-subcategories.dto';
import { CreateServiceSubcategoryDto } from './dto/create-service-subcategories.dto';

@Injectable()
export class ServiceSubcategoriesService {
    constructor(
        @InjectRepository(ServiceSubcategory)
        private readonly subRepo: Repository<ServiceSubcategory>,

        @InjectRepository(ServiceCategory)
        private readonly categoryRepo: Repository<ServiceCategory>,
    ) { }

    async findAll(categoryId?: string) {
        const where: any = { is_active: true };
        if (categoryId) {
            where.category = { id: categoryId };
        }

        return this.subRepo.find({
            where,
            relations: ['category', 'services'],
        });
    }

    async findOne(id: string) {
        const subcategory = await this.subRepo.findOne({
            where: { id },
            relations: ['category', 'services'],
        });
        if (!subcategory) throw new NotFoundException('Subcategory not found');
        return subcategory;
    }

    async create(dto: CreateServiceSubcategoryDto) {
        const category = await this.categoryRepo.findOne({ where: { id: dto.category_id } });
        if (!category) throw new NotFoundException('Category not found');

        const subcategory = this.subRepo.create({
            ...dto,
            category,
        });

        return this.subRepo.save(subcategory);
    }

    async update(id: string, dto: UpdateServiceSubcategoryDto) {
        const sub = await this.subRepo.findOne({ where: { id }, relations: ['category'] });
        if (!sub) throw new NotFoundException('Subcategory not found');

        if (dto.category_id) {
            const category = await this.categoryRepo.findOne({ where: { id: dto.category_id } });
            if (!category) throw new NotFoundException('Category not found');
            sub.category = category;
        }

        Object.assign(sub, dto);
        return this.subRepo.save(sub);
    }

    async remove(id: string) {
        const sub = await this.subRepo.findOne({ where: { id } });
        if (!sub) throw new NotFoundException('Subcategory not found');
        return this.subRepo.remove(sub);
    }
}
