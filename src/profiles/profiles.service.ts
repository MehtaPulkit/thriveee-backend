import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private readonly profilesRepository: Repository<Profile>,
    ) { }

    async create(createDto: CreateProfileDto): Promise<Profile> {
        const profile = this.profilesRepository.create(createDto);
        return this.profilesRepository.save(profile);
    }

    async findAll(): Promise<Profile[]> {
        return this.profilesRepository.find({ relations: ['provider'] });
    }

    async findOne(id: string): Promise<Profile> {
        const profile = await this.profilesRepository.findOne({
            where: { id },
            relations: ['provider'],
        });
        if (!profile) throw new NotFoundException(`Profile with ID ${id} not found`);
        return profile;
    }

    async update(id: string, updateDto: UpdateProfileDto): Promise<Profile> {
        const profile = await this.findOne(id);
        Object.assign(profile, updateDto);
        return this.profilesRepository.save(profile);
    }

    async remove(id: string): Promise<void> {
        const profile = await this.findOne(id);
        await this.profilesRepository.remove(profile);
    }
}
