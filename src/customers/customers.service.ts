import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../profiles/profile.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Profile)
        private profilesRepo: Repository<Profile>,
        private dataSource: DataSource,

    ) { }
    async create(dto: CreateCustomerDto): Promise<Customer> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const profileId = uuidv4();

            // Create Profile
            const profile = queryRunner.manager.create(Profile, {
                id: profileId,
                email: dto.email,
                phone_number: dto.phone_number,
                first_name: dto.first_name, // assuming a single name field
                last_name: dto.last_name, // assuming a single name field
                role: 'customer', // set role as customer
            });
            await queryRunner.manager.save(profile);

            // Create Customer
            const customer = queryRunner.manager.create(Customer, {
                id: profileId,
                date_of_birth: dto.date_of_birth,
                gender: dto.gender,
                email_notifications_enabled: dto.email_notifications_enabled ?? true,
                sms_notifications_enabled: dto.sms_notifications_enabled ?? false,
                marketing_communications_enabled: dto.marketing_communications_enabled ?? false,
            });

            await queryRunner.manager.save(customer);

            await queryRunner.commitTransaction();
            return customer;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error.message);
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Update Profile fields if needed
            if (dto.email || dto.first_name || dto.phone_number || dto.last_name) {
                const profile = await queryRunner.manager.findOne(Profile, { where: { id } });
                if (!profile) throw new InternalServerErrorException('Profile not found');

                if (dto.email) profile.email = dto.email;
                if (dto.first_name) profile.first_name = dto.first_name;
                if (dto.last_name) profile.last_name = dto.last_name;
                if (dto.phone_number) profile.phone_number = dto.phone_number;

                await queryRunner.manager.save(profile);
            }

            // Update Customer
            const customer = await queryRunner.manager.findOne(Customer, { where: { id } });
            if (!customer) throw new InternalServerErrorException('Customer not found');

            if (dto.date_of_birth) customer.date_of_birth = dto.date_of_birth;
            if (dto.gender) customer.gender = dto.gender;
            if (dto.email_notifications_enabled !== undefined) customer.email_notifications_enabled = dto.email_notifications_enabled;
            if (dto.sms_notifications_enabled !== undefined) customer.sms_notifications_enabled = dto.sms_notifications_enabled;
            if (dto.marketing_communications_enabled !== undefined) customer.marketing_communications_enabled = dto.marketing_communications_enabled;

            await queryRunner.manager.save(customer);

            await queryRunner.commitTransaction();
            return customer;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(error.message);
        } finally {
            await queryRunner.release();
        }
    }

    findAll() {
        return this.customerRepository.find({ relations: ['profile'] });
    }

    findOne(id: string) {
        return this.customerRepository.findOne({ where: { id }, relations: ['profile'] });
    }

    async remove(id: string) {
        await this.customerRepository.delete(id);
        await this.profilesRepo.delete(id);
        return { message: 'Customer deleted successfully' };
    }
}
