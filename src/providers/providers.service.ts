// src/providers/providers.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { v4 as uuidv4 } from 'uuid';
import { Provider } from './provider.entity';
import { Profile } from 'src/profiles/profile.entity';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
    constructor(
        @InjectRepository(Provider)
        private providersRepo: Repository<Provider>,
        @InjectRepository(Profile)
        private profilesRepo: Repository<Profile>,
        private dataSource: DataSource,
    ) { }

    async create(dto: CreateProviderDto): Promise<Provider> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const profileId = uuidv4();

            const profile = queryRunner.manager.create(Profile, {
                id: profileId,
                email: dto.email,
                phone_number: dto.phone_number,
                first_name: dto.first_name,
                last_name: dto.last_name,
                address: dto.address,
                role: 'provider',
            });

            await queryRunner.manager.save(profile);

            const provider = queryRunner.manager.create(Provider, {
                id: profileId,
                business_name: dto.business_name,
                abn: dto.abn,
                bio: dto.bio,
                service_radius_km: dto.service_radius_km ?? 5,
            });

            await queryRunner.manager.save(provider);

            await queryRunner.commitTransaction();
            return provider;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error.message);
        } finally {
            await queryRunner.release();
        }
    }
    async findAll() {
        return this.providersRepo.find({
            relations: ['profile'], // <-- Include linked Profile fields
        });
    }

    async findOne(id: string) {
        return this.providersRepo.findOne({
            where: { id },
            relations: ['profile'], // <-- Include linked Profile fields
        });
    }

    async update(id: string, dto: UpdateProviderDto): Promise<Provider> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const provider = await queryRunner.manager.findOne(Provider, { where: { id } });
            if (!provider) throw new NotFoundException('Provider not found');

            const profile = await queryRunner.manager.findOne(Profile, { where: { id } });
            if (!profile) throw new NotFoundException('Profile not found');

            // Update Profile fields
            queryRunner.manager.merge(Profile, profile, {
                email: dto.email ?? profile.email,
                phone_number: dto.phone_number ?? profile.phone_number,
                first_name: dto.first_name ?? profile.first_name,
                last_name: dto.last_name ?? profile.last_name,
                address: dto.address ?? profile.address,
            });

            await queryRunner.manager.save(profile);

            // Update Provider fields
            queryRunner.manager.merge(Provider, provider, {
                business_name: dto.business_name ?? provider.business_name,
                abn: dto.abn ?? provider.abn,
                bio: dto.bio ?? provider.bio,
                service_radius_km: dto.service_radius_km ?? provider.service_radius_km,
            });

            await queryRunner.manager.save(provider);

            await queryRunner.commitTransaction();
            return provider;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: string) {
        await this.providersRepo.delete(id);
        await this.profilesRepo.delete(id);
        return { message: 'Provider deleted successfully' };
    }
}
