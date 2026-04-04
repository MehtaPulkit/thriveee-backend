import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from './service-categories.entity';
import { CreateServiceCategoryDto } from './dto/create-service-categories.dto';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private repo: Repository<ServiceCategory>,
  ) {}

  findAll() {
    return this.repo.find({
      where: { is_active: true },
      relations: ['children', 'subcategories'],
    });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['children', 'subcategories'],
    });
  }

  async create(dto: CreateServiceCategoryDto) {
    const category = this.repo.create(dto);
    return await this.repo.save(category);
  }

  async update(id: string, dto: Partial<CreateServiceCategoryDto>) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Category not found');
    }

    // Check for duplicate name if changed
    if (dto.name && dto.name !== existing.name) {
      const duplicate = await this.repo.findOne({ where: { name: dto.name } });
      if (duplicate) {
        throw new ConflictException(
          `A category with name "${dto.name}" already exists`,
        );
      }
    }

    // Check for duplicate slug if changed
    if (dto.slug && dto.slug !== existing.slug) {
      const duplicateSlug = await this.repo.findOne({
        where: { slug: dto.slug },
      });
      if (duplicateSlug) {
        throw new ConflictException(
          `A category with slug "${dto.slug}" already exists`,
        );
      }
    }

    Object.assign(existing, dto);
    return this.repo.save(existing);
  }

  async remove(id: string) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Category not found');
    return this.repo.remove(existing);
  }
}
