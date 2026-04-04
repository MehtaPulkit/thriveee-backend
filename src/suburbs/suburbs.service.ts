import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Suburb } from './suburb.entity';

@Injectable()
export class SuburbsService {
  constructor(
    @InjectRepository(Suburb)
    private suburbRepo: Repository<Suburb>,
  ) {}

  async findAll(): Promise<Suburb[]> {
    return this.suburbRepo.find({
      select: ['id', 'name', 'lga_name', 'area_ha'], // ✅ only these fields
    });
  }

  async searchByName(name: string): Promise<Suburb[]> {
    return this.suburbRepo.find({
      where: { name: ILike(`%${name}%`) },
      take: 20,
    });
  }

  async findOne(id: string): Promise<Suburb | null> {
    return this.suburbRepo.findOne({ where: { id } });
  }
}
