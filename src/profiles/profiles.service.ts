import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../customers/customer.entity';
import { Provider } from '../providers/provider.entity';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private readonly profilesRepository: Repository<Profile>,
    ) { }

    async create(createDto: CreateProfileDto): Promise<Profile> {
        return await this.profilesRepository.manager.transaction(async (manager) => {
            const profileId = uuidv4();
            const createDtoWithId = { ...createDto, id: profileId };

            const profile = manager.create(Profile, createDtoWithId);
            const savedProfile = await manager.save(Profile, profile);
            if (createDto.role === 'customer') {
                const customer = manager.create(Customer, { id: profileId });
                await manager.save(Customer, customer);
            } else if (createDto.role === 'provider') {
                const provider = manager.create(Provider, { id: profileId });
                await manager.save(Provider, provider);
            }

            return savedProfile;
        });
    }

    async findAll(): Promise<Profile[]> {
        return this.profilesRepository.find({ relations: ['provider', 'customer'] });
    }

    async findOne(id: string): Promise<Profile> {
        const profile = await this.profilesRepository.findOne({
            where: { id },
            relations: ['provider', 'customer'],
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
